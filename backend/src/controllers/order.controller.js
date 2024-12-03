const Order = require("../models/orders.models");
const OrderDetail = require("../models/orderdetails.model");
const Products = require("../models/products.model");
const User = require("../models/users.model");

const getOrder = async (req, res) => {
    try {
        const order = await Order.find({});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderByID = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getOrderDetail = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.find({})
            .populate("prod_id", "prod_name")
            .populate(
                "order_id",
                "order_datetime order_total_cost user_id bank_id pay_id order_is_paying quantity order_status"
            );
        const orderWithUser = await User.populate(orderDetail, {
            path: "order_id.user_id",
            select: "user_name",
        });
        const filtered = orderWithUser.filter((item) => item.prod_id !== null);
        res.status(200).json(filtered);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
function payment(req, res) {
    var ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var tmnCode = "3E7WTKGK";
    var secretKey = "8ERU9IFYIIG25B69ARXYHY5XNQHC93WE";
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    // id: props.id,
    //         orderItems: props.orderItems,
    //         totalOrderAmount: props.totalOrderAmount,
    //         deliveryMethodSelected: props.deliveryMethodSelected,
    //         paymentMethodSelected: props.paymentMethodSelected,
    //         temporaryAmount: props.temporaryAmount,
    //         discountAmount: props.discountAmount,
    //         deliveryFee: props.deliveryFee,
    //         selectedPaymentInfo: props.selectedPaymentInfo,
    //         selectedAddressInfo: props.selectedAddressInfo,
    // var id = req.body.id;
    // var orderItems = req.body.orderItems;
    // var totalOrderAmount = req.body.totalOrderAmount;
    // var deliveryMethodSelected = req.body.deliveryMethodSelected;
    // var paymentMethodSelected = req.body.paymentMethodSelected;
    // var temporaryAmount = req.body.temporaryAmount;
    // var discountAmount = req.body.discountAmount;
    // var deliveryFee = req.body.deliveryFee;
    // var selectedPaymentInfo = req.body.selectedPaymentInfo;
    // var selectedAddressInfo = req.body.selectedAddressInfo;
    var returnUrl = `http://localhost:3000/order/payment`;

    // var date = new Date();

    // var createDate = dateFormat(date, 'yyyymmddHHmmss');
    // var orderId = dateFormat(date, 'HHmmss');
    // Tạo hàm định dạng số thành chuỗi với độ dài cố định
    function formatNumber(number, length) {
        return ("0".repeat(length) + number).slice(-length);
    }

    // Lấy ngày giờ hiện tại
    var date = new Date();

    // Tạo chuỗi ngày giờ theo định dạng 'yyyymmddHHMMss'
    var createDate =
        date.getFullYear() +
        formatNumber(date.getMonth() + 1, 2) +
        formatNumber(date.getDate(), 2) +
        formatNumber(date.getHours(), 2) +
        formatNumber(date.getMinutes(), 2) +
        formatNumber(date.getSeconds(), 2);

    // Tạo chuỗi orderId theo định dạng 'HHmmss'
    var orderId =
        formatNumber(date.getHours(), 2) +
        formatNumber(date.getMinutes(), 2) +
        formatNumber(date.getSeconds(), 2);
    // var orderId = 5

    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === "") {
        locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
    }
    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    // res.set("Content-Type", "text/html");
    res.status(200).json(vnpUrl);
}

function paymentReturn(req, res) {
    var vnp_Params = req.query;

    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = "3E7WTKGK";
    var secretKey = "8ERU9IFYIIG25B69ARXYHY5XNQHC93WE";

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        res.status(200).json({ code: vnp_Params["vnp_ResponseCode"], info: vnp_Params });
    } else {
        res.status(200).json({ code: "97", info: vnp_Params });
    }
}

function paymentIPN(req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = "8ERU9IFYIIG25B69ARXYHY5XNQHC93WE";
    var querystring = require("qs");

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
        var orderId = vnp_Params["vnp_TxnRef"];
        var rspCode = vnp_Params["vnp_ResponseCode"];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({ RspCode: "00", Message: "success" });
    } else {
        res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
    }
}

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            "+"
        );
    }
    return sorted;
}
const updateOrderStatus = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.findById(req.params.id);
        if (orderDetail) {
            const join = await orderDetail.populate('order_id', 'order_datetime order_total_cost user_id bank_id pay_id order_is_paying quantity order_status');
            const order = await Order.findById(join.order_id._id);
            order.order_status = req.body.order_status;
            order.order_is_paying = req.body.order_is_paying;
            const updatedOrder = await order.save();
            console.log(join);
            res.status(200).json(join);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getOrder,
    getOrderDetail,
    payment,
    paymentReturn,
    paymentIPN,
    getOrderByID,
    updateOrderStatus
};
