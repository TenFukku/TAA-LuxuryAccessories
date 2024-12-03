import PopupQuickView from 'components/Products/PopupQuickView';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { IoHeartSharp } from 'react-icons/io5';
import { TbHeartPlus } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import 'style/components/Products/ProductItem.scss';
import PopupNotiLogin from './PopupNotiLogin';
import axios from 'axios';
import { useAuthContext } from 'hooks/useAuthContext';
import { useAddToCart } from 'hooks/useAddToCart';
import { useNavigate } from 'react-router-dom';
ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    prod_name: PropTypes.string.isRequired,
    prod_cost: PropTypes.shape({
      $numberDecimal: PropTypes.string.isRequired,
    }).isRequired,
    prod_discount: PropTypes.shape({
      $numberDecimal: PropTypes.string.isRequired,
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
  }).isRequired,
  onFavoriteChange: PropTypes.func,
};

function ProductItem({ product, onFavoriteChange }) {
  const navigate = useNavigate();
  const { getCartQuantity } = useAuthContext();
  const [isLiked, setIsLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupNotiLogin, setShowPopupNotiLogin] = useState(false);
  const[content, setContent]=useState('');
  const { addToCart, addToCartNoLogin } = useAddToCart();
  const addToCartAndRedirect = () => {
    // if (!localStorage.getItem('user')) {
    //   console.log('Bạn cần đăng nhập');
    //   setContent("Bạn cần đăng nhập để thực hiện mua ngay!");
    //   setShowPopupNotiLogin(true);
    // } else {
    //   (async () => {
    //     try {
    //       await addToCart(product, 1);
    //       console.log('Sản phẩm đã được thêm vào giỏ hàng');
    //       navigate("/cart");
    //       getCartQuantity();
    //     } catch (error) {
    //       console.error('Lỗi khi thêm vào giỏ hàng:', error);
    //     }
    //   })();
    // }
    const newData = {
      ...product,
      moneyCurrent: product.prod_cost.$numberDecimal * (1 - product.prod_discount.$numberDecimal),
      imageUrl: product.prod_img[0],
      productName: product.prod_name,
      number: 1
    };
    navigate('/order', {
      state: {
        data: [newData],
        temporary: product.prod_cost.$numberDecimal * (1 - product.prod_discount.$numberDecimal),
        total: (product.prod_cost.$numberDecimal * (1 - product.prod_discount.$numberDecimal)) - 5000,
        discount: 5000,
      },
    });
  };
  const goToNextPageTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const user_current = JSON.parse(localStorage.getItem('user'))[0];
        const user_id = user_current._id;

        const response = await axios.get(`http://localhost:8000/api/account/favors/${user_id}`);
        const favorites = response.data;
        setIsLiked(favorites.some((favorite) => favorite._id === product._id));
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

    fetchUserFavorites();
  }, [product._id]);

  const toggleLike = async () => {
    if (!localStorage.getItem('user')) {
      console.log('Bạn cần đăng nhập');
      setContent("Bạn cần đăng nhập để thực hiện thêm sản phẩm yêu thích!")
      setShowPopupNotiLogin(true);
    } else {
      try {
        const user_current = JSON.parse(localStorage.getItem('user'))[0];
        const user_id = user_current._id;

        if (isLiked) {
          await axios.delete('http://localhost:8000/api/account/del-favors', {
            data: {
              userId: user_id,
              productId: product._id,
            },
          });
        } else {
          await axios.post('http://localhost:8000/api/account/add-favors', {
            userId: user_id,
            productId: product._id,
          });
        }
        setIsLiked(!isLiked);
        if (onFavoriteChange) {
          onFavoriteChange();
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };

  const formatPrice = (price) => {
    const priceNumber = parseFloat(price);
    let formattedPrice = priceNumber.toLocaleString('vi-VN', { maximumFractionDigits: 0 });
    return formattedPrice.trim();
  };

  if (!product) {
    return null;
  }

  const currentPrice = formatPrice(
    product.prod_cost.$numberDecimal -
    product.prod_discount.$numberDecimal * product.prod_cost.$numberDecimal,
  );
  const discount = product.prod_discount.$numberDecimal * 100;
  const BeforDiscountPrice = formatPrice(product.prod_cost.$numberDecimal);

  return product.prod_num_avai > 0 ? (
    <div className="product__item body-large">
      <div className="product__item__img">
        <img className="img_front" src={product.prod_img[0]} alt="Ảnh sản phẩm"></img>
        <img className="img_after" src={product.prod_img[1]} alt="Ảnh sản phẩm"></img>
      </div>
      <div className="product__item__body">
        {isLiked ? (
          <IoHeartSharp className="icon-heart" onClick={toggleLike} />
        ) : (
          <TbHeartPlus className="icon-heart" onClick={toggleLike} />
        )}
        <NavLink
          to={`/products/${product._id}`}
          className="product__item__name on-error-container-text"
        >
          {product.prod_name}
        </NavLink>
        <div className="product__item__price">
          <div className="item__price__current">{currentPrice} đ</div>
          {discount > 0 ? (
            <div className="item__price__discount">{BeforDiscountPrice} đ</div>
          ) : (
            <div className="item__price__discount"></div>
          )}
        </div>
        {discount > 0 ? (
          <div className="product__item__discount">Giảm {discount} %</div>
        ) : (
          <div className="product__item__discount"></div>
        )}
        <div className="product__item__stock primary-text">Còn hàng</div>
      </div>
      <div className="product__item__section">
        <div className="product__item__view" onClick={() => setShowPopup(true)}>
          Xem nhanh
        </div>
        <PopupQuickView show={showPopup} onHide={() => setShowPopup(false)} productItem={product} />
        <div className="line--vertical"></div>
        <div onClick={addToCartAndRedirect}>
          Mua ngay
        </div>
      </div>
      <PopupNotiLogin
        content={content}
        show={showPopupNotiLogin}
        onHide={() => setShowPopupNotiLogin(false)}
      />
    </div>
  ) : (
    <div className="product__outstock product__item body-large">
      <div className="product__item__img">
        <img className="img_front" src={product.prod_img[0]} alt="Ảnh sản phẩm"></img>
        <img className="img_after" src={product.prod_img[1]} alt="Ảnh sản phẩm"></img>
      </div>
      <div className="product__item__body">
        <TbHeartPlus className="icon-heart" />
        <div className="product__item__name on-error-container-text">{product.prod_name}</div>
        <div className="product__item__price">
          <div className="item__price__current">{currentPrice} đ</div>
          <div className="item__price__discount">{BeforDiscountPrice} đ</div>
        </div>
        <div className="product__item__discount">Giảm {discount} %</div>
        <div className="product__item__stock title-large error-text">Hết hàng</div>
      </div>
    </div>
  );
}

export default ProductItem;
