import React, { useState } from 'react';
import { Input, Modal, Carousel } from 'react-bootstrap';
import Button from 'components/Common/Button1'
import PropTypes from 'prop-types';
import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import 'style/components/Products/PopupQuickView.scss';
import { useNavigate } from 'react-router-dom';
import { useAddToCart } from 'hooks/useAddToCart';
import NotiAddCartSuccessPopup from 'components/ProductDetailComponents/NotiAddCartSuccessPopup';
import PopupNotiLogin from './PopupNotiLogin';
import { useAuthContext } from 'hooks/useAuthContext';
PopupQuickView.propTypes = {
  onHide: PropTypes.func.isRequired,
  productItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    prod_name: PropTypes.string.isRequired,
    prod_cost: PropTypes.shape({
      $numberDecimal: PropTypes.string.isRequired
    }).isRequired,
    prod_discount: PropTypes.shape({
      $numberDecimal: PropTypes.string.isRequired
    }).isRequired,
    prod_end_date_discount: PropTypes.string.isRequired,
    prod_num_sold: PropTypes.number.isRequired,
    prod_num_rating: PropTypes.number.isRequired,
    prod_star_rating: PropTypes.string.isRequired,
    prod_description: PropTypes.string.isRequired,
    cate_id: PropTypes.string.isRequired,
    prod_img: PropTypes.arrayOf(PropTypes.string).isRequired,
    prod_num_avai: PropTypes.number.isRequired,
    prod_color: PropTypes.string.isRequired,
    prod_size: PropTypes.string.isRequired,
  }).isRequired
};

function PopupQuickView(props) {
  const { getCartQuantity } = useAuthContext();
  const navigate = useNavigate()
  const productImages = props.productItem?.prod_img?.slice(0, 4);
  const defaultImage = productImages?.length > 0 ? productImages[0] : '';
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToCartNoLogin } = useAddToCart();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPopupNotiLogin, setShowPopupNotiLogin] = useState(false);
  const content = "Bạn cần đăng nhập để thực hiện thêm sản phẩm vào giỏ hàng!"

  const handleAddToCart = () => {
    if (!localStorage.getItem('user')) {
      // console.log("Bạn cần đăng nhập");
      // setShowPopupNotiLogin(true);
      addToCartNoLogin(props.productItem, quantity)
      setShowSuccessPopup(true);
    } else {
      addToCart(props.productItem, quantity);
      setShowSuccessPopup(true);
    }
    setTimeout(() => {
      getCartQuantity();
    }, 1000)
    setTimeout(() => {
      setShowSuccessPopup(false); // Ẩn popup sau 5 giây
    }, 3000);
  };
  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const handleImageHover = (image) => {
    setSelectedImage(image);
  };
  if (!props.productItem) {
    return null;
  }
  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      return newQuantity <= parseInt(props.productItem.prod_num_avai) ? newQuantity : prevQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity - 1;
      // Đảm bảo số lượng không nhỏ hơn 1
      return newQuantity >= 1 ? newQuantity : prevQuantity;
    });
  };

  const handleChange = (event) => {
    let value = parseInt(event.target.value);
    console.log(value)
    if (value > parseInt(props.productItem.prod_num_avai)) {
      value = parseInt(props.productItem.prod_num_avai);
    } else if (value < 0) {
      value = 1;
    }
    setQuantity(value);

  };

  const handleBlur = () => {
    if (quantity === 0 || isNaN(quantity)) {
      setQuantity(1);
    }
  };


  const formatPrice = (price) => {
    const priceNumber = parseFloat(price);
    let formattedPrice = priceNumber.toLocaleString('vi-VN', { maximumFractionDigits: 0 });
    return formattedPrice.trim();
  };
  const currentPrice = formatPrice(props.productItem.prod_cost.$numberDecimal - props.productItem.prod_discount.$numberDecimal * props.productItem.prod_cost.$numberDecimal)
  const discount = props.productItem.prod_discount.$numberDecimal * 100
  const BeforDiscountPrice = formatPrice(props.productItem.prod_cost.$numberDecimal)
  const handleViewDetail = () => {
    navigate(`/products/${props.productItem._id}`);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='quick__view__header' closeButton />
      <Modal.Body className="quick__view__body">
        <div className="quick__view__img">
          <div className="img__show__case">
            <img
              src={selectedImage}
              alt="Product"
              className={selectedImage === productImages[0] ? "selected" : ""}
            />
          </div>
          <div className="img__list">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product"
                onClick={() => selectImage(image)}
                onMouseEnter={() => handleImageHover(image)}
                className={image === selectedImage ? "selected" : ""}
              />
            ))}
          </div>
        </div>
        <Carousel interval={null} className="quick__view__slider">
          {productImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={image}
                alt="Product"
                className={selectedImage === image ? "selected" : ""}
                onClick={() => selectImage(image)}
                onMouseEnter={() => handleImageHover(image)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="quick__view__info">
          <div className="info__name headline-medium">{props.productItem.prod_name}</div>
          <div className="info__rate">
            <div className="info__rate__star title-medium">
              {props.productItem.prod_star_rating}
              {Array.from({ length: props.productItem.prod_star_rating }, (_, index) => (
                <FaStar key={index} />
              ))}
              {props.productItem.prod_star_rating % 1 !== 0 && (
                <FaStarHalfAlt />
              )}
            </div>
            <div className="info__rate__number">{props.productItem.prod_num_rating} đánh giá</div>
            <div className="info__number__sell">{props.productItem.prod_num_sold} đã bán</div>
          </div>
          <div className="info__price">
            {discount > 0 && <p className="info__price__cost body-large">{BeforDiscountPrice} đ</p>}
            <p className="info__price__cost__discount headline-small">{currentPrice} đ</p>
            {discount > 0 && <div className="info__percent__discount body-large">Giảm {discount}%</div>}
          </div>
          <div className="info__color body-large">
            <p className="info__color__title">Màu sắc:</p>
            <div className="info__color__value outline-text">{props.productItem.prod_color}</div>
          </div>
          <div className="info__size body-large">
            <p className="info__size__title">Kích thước:</p>
            <div className="info__size__value outline-text">{props.productItem.prod_size}</div>
          </div>
          <div className="info__quantity">
            <div className="info__quantity__title body-large bold">Số lượng: </div>
            <div className="info__quantity__product outline-text body-large">
              <div className="info__quantity__product-decrement outline-text" onClick={handleDecrement}>-</div>
              <input id="number__product__select" type="number" min="1" max={props.productItem.prod_num_avai} step="1"
                className="my-input" onChange={handleChange} onBlur={handleBlur}
                value={quantity.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: false })} />
              <div className="info__quantity__product-increment outline-text" onClick={handleIncrement}>+</div>
            </div>
            <p className="info__quantity__stock body-medium">{props.productItem.prod_num_avai} sản phẩm sẵn có</p>
          </div>
          <div className="info__button">
            <Button
              className="button__add__cart body-large"
              backgroundColor="#ffedec"
              labelColor="#9C4048"
              icon={MdOutlineAddShoppingCart}
              iconWidth="24px"
              iconHeight="24px"
              label="Thêm vào giỏ hàng"
              border="1px solid #9c4048"
              onClick={handleAddToCart
                //   () => {
                //   addToCart(props.productItem, quantity);
                // }
              } // Add success pop here (HAN)
            />
            <PopupNotiLogin content={content} show={showPopupNotiLogin} onHide={() => setShowPopupNotiLogin(false)} />
            <NotiAddCartSuccessPopup show={showSuccessPopup} onHide={() => setShowSuccessPopup(false)} />
            <Button
              className="button__detail__view"
              backgroundColor="#785B5B"
              labelColor="#F1EFE7"
              border="1px solid #857373"
              label="Xem chi tiết"
              onClick={handleViewDetail}
            />
          </div>
          <div class="info__context body-large">
            <div class="info__context__product">
              <div class="info__context__product__title">
                THÔNG TIN SẢN PHẨM
              </div>
              <ul class="info__context__product__body">
                <li>Đảm bảo hàng có chất lượng thương hiệu.</li>
                <li>Hàng luôn có sẵn ở TAA.</li>
                <li>Phong cách Unisex, phù hợp Nam/Nữ.</li>
              </ul>
            </div>
            <div class="info__context__detail">
              <div class="info__context__detail__title">
                THÔNG TIN THƯƠNG HIỆU
              </div>
              <ul class="info__context__detail__body">
                <li> Sản phẩm thuộc thương hiệu TAA - Three Accessories Appreciate đã được đăng kí bảo hộ năm 2023.</li>
                {/* <li>- TAA đã có cửa hàng tại HCM và 100.000 KH mua sắm mỗi năm.</li>
                <li>- Phương châm của TAA là luôn khách hàng lên hàng đầu, chứng tôi sẽ cố gắng thực hiện hóa mọi nhu cầu của bạn.</li> */}
              </ul>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PopupQuickView;
