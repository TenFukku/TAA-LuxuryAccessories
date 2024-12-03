const User = require("../models/users.model");
const BankCards = require("../models/bankcards.model");
const Locations = require("../models/locations.model");
const Orders = require("../models/orders.models");
const OrdersDetail = require("../models/orderdetails.model");
const Products = require("../models/products.model");
const Favors = require("../models/favorproducts.model");
const PayingMethod = require("../models/payingmethod.model")
const TransMethod = require("../models/transportmethods.model")
const Cart = require("../models/cart.model")

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const data = req.body;
        console.log("req.body: ", data);
        const checkUser = await User.findById(userId);
        if (!checkUser) {
            res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, data, {
            new: true,
        });
        console.log("Updated User: ", updatedUser);
        res.status(200).json({
            message: "Cập nhật thành công!",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng!", error);
        res.status(500).json({ message: error.message });
    }
};
const changePassword = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const { oldPassword, newPassword } = req.body;
        console.log("req.body.oldPassword: ", oldPassword);
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.user_pass);
        if (isMatch) {
            const updatedPassword = await User.findByIdAndUpdate(
                userId,
                { user_pass: await bcrypt.hash(newPassword, 10) },
                {
                    new: true,
                }
            );
            console.log("Updated Password: ", updatedPassword);
            res.status(200).json({
                message: "Cập nhật thành công!",
            });
        } else {
            res.status(400).json({
                error: true,
                message: "Mật khẩu không khớp!",
            });
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật mật khẩu!", error);
        res.status(500).json({ message: error.message });
    }
};
const deleteBank = async (req, res) => {
    try {
        const bankCardId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(bankCardId)) {
            return res
                .status(400)
                .json({ message: "ID tài khoản không hợp lệ" });
        }
        const userId = req.query.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const deleteBankCard = await BankCards.findByIdAndDelete(bankCardId);
        if (!deleteBankCard)
            res.status(404).json({ message: "Tài khoản không tồn tại" });
        const checkDefault = await User.findOne({
            bank_default_id: bankCardId,
        });
        if (checkDefault) {
            const bankCards = await BankCards.find({ user_id: userId });
            if (bankCards.length === 0)
                await User.findByIdAndUpdate(
                    userId,
                    { bank_default_id: null },
                    { new: true }
                );
            else {
                await User.findByIdAndUpdate(
                    userId,
                    { bank_default_id: bankCards[0]._id },
                    { new: true }
                );
                console.log(bankCards);
                await BankCards.findByIdAndUpdate(
                    bankCards[0]._id,
                    { is_default: true },
                    { new: true }
                );
            }
        }
        res.status(200).json({
            message: "Xóa thành công",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ message: "ID địa chỉ không hợp lệ" });
        }
        const userId = req.query.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const deleteLocation = await Locations.findByIdAndDelete(addressId);
        if (!deleteLocation)
            res.status(404).json({ message: "Địa chỉ không tồn tại" });
        const checkDefault = await User.findOne({
            local_default_id: addressId,
        });
        if (checkDefault) {
            const addresses = await Locations.find({ user_id: userId });
            if (addresses.length === 0)
                await User.findByIdAndUpdate(
                    userId,
                    { local_default_id: null },
                    { new: true }
                );
            else {
                await User.findByIdAndUpdate(
                    userId,
                    { local_default_id: addresses[0]._id },
                    { new: true }
                );
                await Locations.findByIdAndUpdate(
                    addresses[0]._id,
                    { is_default: true },
                    { new: true }
                );
            }
        }
        res.status(200).json({
            message: "Xóa thành công",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getBankCards = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const bankCards = await BankCards.find({ user_id: userId });
        if (!bankCards) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(bankCards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAddresses = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const addresses = await Locations.find({ user_id: userId });
        if (!addresses) {
            return res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const addBank = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const { bank_pers_cccd, bank_pers_name, bank_name, bank_number } =
            req.body;
        const newBankCard = new BankCards({
            _id: new mongoose.Types.ObjectId(),
            bank_name: bank_name,
            bank_number: bank_number,
            bank_pers_name: bank_pers_name,
            user_id: userId,
            is_default: false,
            bank_pers_cccd: bank_pers_cccd,
        });
        const existDefault = await BankCards.findOne({
            user_id: userId,
            is_default: true,
        });
        if (!existDefault) {
            newBankCard.is_default = true;
            await User.findByIdAndUpdate(
                userId,
                { bank_default_id: newBankCard._id },
                { new: true }
            );
        }
        await newBankCard.save();
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const { loca_pers_name, loca_pers_phone, loca_address, loca_detail } =
            req.body;
        const newAddress = new Locations({
            _id: new mongoose.Types.ObjectId(),
            loca_pers_name: loca_pers_name,
            loca_pers_phone: loca_pers_phone,
            loca_address: loca_address,
            loca_detail: loca_detail,
            user_id: userId,
        });
        const existDefault = await Locations.findOne({
            user_id: userId,
            is_default: true,
        });
        if (!existDefault) {
            newAddress.is_default = true;
            await User.findByIdAndUpdate(
                userId,
                { local_default_id: newAddress._id },
                { new: true }
            );
        }
        await newAddress.save();
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const setAddressDefault = async (req, res) => {
    try {
        const addressId = req.params.id;
        const userId = req.body.id;
        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ message: "ID địa chỉ không hợp lệ" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { local_default_id: addressId },
            { new: true }
        );
        if (!updateUser)
            return res.status(404).json({ message: "Not found user" });
        await Locations.findOneAndUpdate(
            { user_id: userId, is_default: true },
            { is_default: false },
            { new: true }
        );
        const updateDefault = await Locations.findByIdAndUpdate(
            addressId,
            { is_default: true },
            { new: true }
        );
        if (!updateDefault)
            return res
                .status(404)
                .json({ message: "Set default not success!" });
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const setBankCardDefault = async (req, res) => {
    try {
        const bankCardId = req.params.id;
        const userId = req.body.id;
        if (!mongoose.Types.ObjectId.isValid(bankCardId)) {
            return res
                .status(400)
                .json({ message: "ID tài khoản thanh toán không hợp lệ" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { bank_default_id: bankCardId },
            { new: true }
        );
        if (!updateUser)
            return res.status(404).json({ message: "Not found user" });
        await BankCards.findOneAndUpdate(
            { user_id: userId, is_default: true },
            { is_default: false },
            { new: true }
        );
        const updateDefault = await BankCards.findByIdAndUpdate(
            bankCardId,
            { is_default: true },
            { new: true }
        );
        if (!updateDefault)
            return res
                .status(404)
                .json({ message: "Set default not success!" });
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const editAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ message: "ID địa chỉ không hợp lệ" });
        }
        const updatedAddress = req.body;
        await Locations.findByIdAndUpdate(addressId, updatedAddress, {
            new: true,
        });
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOrders = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }

        // Tìm các đơn hàng của người dùng
        const orders = await Orders.find({ user_id: userId });

        // Mảng để lưu các đơn hàng cùng với thông tin sản phẩm
        let ordersWithProducts = [];

        // Duyệt qua từng đơn hàng để lấy thông tin sản phẩm
        for (const order of orders) {
                        // Kiểm tra nếu ngày hiện tại lớn hơn order_datetime 3 ngày, thì cập nhật order_status thành 1
            const orderDate = new Date(order.order_datetime);
                        const currentDate = new Date();
                        const diffInDays = Math.floor((currentDate - orderDate) / (1000 * 60 * 60 * 24));
            
                        if (diffInDays > 2 && order.order_status !== 1) {
                            await Orders.findByIdAndUpdate(order._id, { order_status: 1 });
            }

            // Tìm chi tiết đơn hàng
            const orderDetails = await OrdersDetail.find({
                order_id: order._id,
            });

            // Mảng để lưu thông tin chi tiết đơn hàng cùng với thông tin sản phẩm
            let orderDetailsWithProducts = [];

            // Duyệt qua từng chi tiết đơn hàng để lấy thông tin sản phẩm
            for (const orderDetail of orderDetails) {
                // Tìm thông tin sản phẩm
                const product = await Products.findById(orderDetail.prod_id);

                // Thêm thông tin sản phẩm vào mảng
                orderDetailsWithProducts.push({
                    orderDetail,
                    product,
                });
            }


            // Thêm thông tin đơn hàng và các sản phẩm tương ứng vào mảng chính
            ordersWithProducts.push({
                order,
                orderDetails: orderDetailsWithProducts,
            });
        }

        // Trả về kết quả
        return res.status(200).json(ordersWithProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getFavors = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const favors = await Favors.find({ user_id: userId }).populate(
            "prod_id"
        );
        if (!favors) {
            return res.status(404).json({ message: "Not found" });
        }
        // Chỉ trả về thông tin sản phẩm
        const products = favors.map((favor) => favor.prod_id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ message: "ID người dùng không hợp lệ" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Not found user" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFavoriteProduct = async (userId, productId) => {
    try {
        const removed = await Favors.deleteOne({
            user_id: userId,
            prod_id: productId,
        });
        return removed;
    } catch (error) {
        throw error;
    }
};

const addFavoriteProduct = async (userId, productId) => {
    try {
        // Kiểm tra xem đã tồn tại sản phẩm yêu thích với cặp user_id và prod_id đã cho chưa
        const existingFavorite = await Favors.findOne({
            user_id: userId,
            prod_id: productId,
        });

        // Nếu đã tồn tại, không thêm nữa và trả về kết quả
        if (existingFavorite) {
            return existingFavorite;
        }

        // Nếu chưa tồn tại, thêm sản phẩm yêu thích mới vào cơ sở dữ liệu
        const favorProduct = new Favors({
            user_id: userId,
            prod_id: productId,
        });
        const savedProduct = await favorProduct.save();
        return savedProduct;
    } catch (error) {
        throw error;
    }
};

const addFavors = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const savedProduct = await addFavoriteProduct(userId, productId);
        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const delFavors = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const removed = await removeFavoriteProduct(userId, productId);
        res.json({ removed });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const addOrder = async (req, res) => {
    try {
        console.log(req.body);
        const {
            user_id,
            orderDetails,
            order_total_cost,
            bank_id,
            pay_id_option,
            tran_id_option,
            loca_id,
            status
      } = req.body;
    //   if (!mongoose.Types.ObjectId.isValid(user_id)) {
    //     return res
    //         .status(400)
    //         .json({ message: "ID người dùng không hợp lệ" });
    // }
    const newOrder = await createOrder(order_total_cost, user_id, bank_id, pay_id_option, tran_id_option, loca_id, orderDetails, status);
    console.log('Thêm đơn hàng thành công:', newOrder);

    const orderdetails = await createOrderdetails(newOrder._id, orderDetails);
    console.log('Thêm chi tiết đơn hàng thành công:', orderdetails);

        // Xóa các sản phẩm từ giỏ hàng của người dùng
        if (user_id) {
            for (const detail of orderDetails) {
                await removeFromCart(user_id, detail._id);
            }
        }
    res.status(200).json({ message: "Thêm đơn hàng và chi tiết đơn hàng thành công" });
    } catch (error) {
      console.error('Thêm đơn hàng và chi tiết đơn hàng không thành công');
        res.status(500).json({ error: error.message });
    }
};
async function createOrderdetails(orderId, orderItems) {
  try {
      const orderdetailsPromises = orderItems.map(async (item) => {
          const orderdetail = new OrdersDetail({
              order_id: orderId,
              prod_id: item._id, 
              price: item.moneyCurrent, 
              quantity: item.number 
          });
        console.log('Đã tạo chi tiết đơn hàng:', item._id)
          return await orderdetail.save();
      });

      const orderdetails = await Promise.all(orderdetailsPromises);
      return orderdetails;
  } catch (error) {
    console.error('Thêm chi tiết đơn hàng không thành công');
    throw error; // Ném lỗi để xử lý ở phần gọi hàm
  }
}
async function createOrder(order_total_cost, user_id, bank_id, pay_id_option, tran_id_option, loca_id, orderItems, status) {
  try {
        const newOrder = new Orders({
          _id: new mongoose.Types.ObjectId(),
          order_datetime: new Date(),
          order_total_cost: order_total_cost,
          user_id: user_id?user_id:null,
          bank_id:null,
          pay_id: pay_id_option===0?'65f41349bd7a1382211874b0':'65f41375bd7a1382211874b1',
          tran_id: tran_id_option===0?'65f3ed65a8f986b1aca692a0':'65f3ebe2a8f986b1aca6929f',
          loca_id:loca_id,
        order_is_paying: status,
          quantity: orderItems.length,
          order_status: 0,
        });
        await newOrder.save();
        console.log('Đã tạo đơn hàng:', newOrder._id);
        return newOrder;
  } catch (error) {
        console.error('Thêm đơn hàng không thành công')
        throw error; // Ném lỗi để xử lý ở phần gọi hàm
  }
}
async function removeFromCart(user_id,prod_id) {
  try {
    const cartItem = await Cart.findOneAndDelete({ user_id: user_id, prod_id: prod_id })
    if (!cartItem) {
      console.log("Không tìm thấy sản phẩm")
      return
    }
    console.log('Xóa thành công')
  } catch (error) {
        console.error('Xóa sản phẩm khỏi giỏ không thành công')
        throw error; // Ném lỗi để xử lý ở phần gọi hàm
  }
}
module.exports = {
    updateUser,
    changePassword,
    getBankCards,
    getAddresses,
    deleteBank,
    deleteAddress,
    addBank,
    addAddress,
    setAddressDefault,
    setBankCardDefault,
    editAddress,
    getOrders,
    getFavors,
    getUser,
    addFavors,
    delFavors,
    addOrder,
};
