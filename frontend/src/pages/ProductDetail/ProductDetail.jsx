import axios from 'axios';
import NotiAddCartSuccessPopup from 'components/ProductDetailComponents/NotiAddCartSuccessPopup';
import PopupNotiLogin from 'components/Products/PopupNotiLogin';
import ProductItem from 'components/Products/ProductItem';
import { useAddToCart } from 'hooks/useAddToCart';
import { useAuthContext } from 'hooks/useAuthContext';
import { IoMdArrowDropdown } from 'react-icons/io';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { GiRabbitHead } from 'react-icons/gi';
import { BiPhoneCall } from 'react-icons/bi';
import { IoMdBookmarks } from 'react-icons/io';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { IoHeartSharp } from 'react-icons/io5';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { TbHeartPlus } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import '../../style/pages/ProductDetail/ProductDetail.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ButtonIcon from 'components/Common/ButtonIcon';
// import banner1 from 'assets/image/banners/news__banner--large.jpg';
ProductDetail.propTypes = {
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
};

function ProductDetail(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { addToCart, addToCartNoLogin } = useAddToCart(); // HAN
  const [filteredData, setFilteredData] = useState([]);
  const { getCartQuantity } = useAuthContext();
  const [hotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products/hot');
        setHotProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-prev-arrow" onClick={onClick}>
        <ButtonIcon label={<FaChevronLeft />} labelColor="#785b5b" borderRadius="100%" />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-next-arrow" onClick={onClick}>
        <ButtonIcon label={<FaChevronRight />} labelColor="#785b5b" borderRadius="100%" />
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Số lượng sản phẩm hiển thị trên mỗi slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // Tốc độ chạy của slider
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products');
      setData(response.data);
      setFilteredData(response.data); // Khởi tạo filteredData ban đầu là data từ API
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const applyFilter = ({ sortBy, filterBy }) => {
    let updatedData = [...data];

    // Xử lý sắp xếp theo giá
    if (sortBy === '1') {
      if (filterBy && filterBy.includes('Bán chạy nhất')) {
        updatedData.sort((a, b) => b.prod_num_sold - a.prod_num_sold);
      }
      if (filterBy && filterBy.includes('Giảm giá')) {
        updatedData = updatedData.filter(
          (item) => parseFloat(item.prod_discount.$numberDecimal) > 0,
        );
        console.log('trong if truoc sort1');
        console.log(updatedData);
      }
      console.log('ngoai if truoc sort1');
      console.log(updatedData);
      updatedData.sort((a, b) => {
        const priceA =
          parseFloat(a.prod_cost.$numberDecimal) -
          parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
        const priceB =
          parseFloat(b.prod_cost.$numberDecimal) -
          parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
        return priceA - priceB;
      });
      console.log('sau sort1');
      console.log(updatedData);
    } else if (sortBy === '2') {
      if (filterBy && filterBy.includes('Bán chạy nhất')) {
        updatedData.sort((a, b) => b.prod_num_sold - a.prod_num_sold);
      }
      if (filterBy && filterBy.includes('Giảm giá')) {
        updatedData = updatedData.filter(
          (item) => parseFloat(item.prod_discount.$numberDecimal) > 0,
        );
        console.log('trong if truoc sort2');
        console.log(updatedData);
      }

      console.log('ngoai if truoc sort2');
      console.log(updatedData);
      updatedData.sort((a, b) => {
        const priceA =
          parseFloat(a.prod_cost.$numberDecimal) -
          parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
        const priceB =
          parseFloat(b.prod_cost.$numberDecimal) -
          parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
        return priceB - priceA;
      });
      console.log('sau sort12');
      console.log(updatedData);
    }

    // Xử lý bộ lọc theo sản phẩm bán chạy nhất
    if (filterBy && filterBy.includes('Bán chạy nhất')) {
      updatedData.sort((a, b) => b.prod_num_sold - a.prod_num_sold);
      if (sortBy === '1') {
        updatedData.sort((a, b) => {
          const priceA =
            parseFloat(a.prod_cost.$numberDecimal) -
            parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
          const priceB =
            parseFloat(b.prod_cost.$numberDecimal) -
            parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
          return priceA - priceB;
        });
      } else if (sortBy === '2') {
        updatedData.sort((a, b) => {
          const priceA =
            parseFloat(a.prod_cost.$numberDecimal) -
            parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
          const priceB =
            parseFloat(b.prod_cost.$numberDecimal) -
            parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
          return priceB - priceA;
        });
      }

      console.log(updatedData);
    }

    // Xử lý bộ lọc theo giảm giá
    if (filterBy && filterBy.includes('Giảm giá')) {
      updatedData = updatedData.filter((item) => parseFloat(item.prod_discount.$numberDecimal) > 0);
      console.log('hellsso');
      if (sortBy === '1') {
        updatedData.sort((a, b) => {
          const priceA =
            parseFloat(a.prod_cost.$numberDecimal) -
            parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
          const priceB =
            parseFloat(b.prod_cost.$numberDecimal) -
            parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
          return priceA - priceB;
        });
      } else if (sortBy === '2') {
        updatedData.sort((a, b) => {
          const priceA =
            parseFloat(a.prod_cost.$numberDecimal) -
            parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
          const priceB =
            parseFloat(b.prod_cost.$numberDecimal) -
            parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
          return priceB - priceA;
        });
      }
    }

    setFilteredData(updatedData);
  };

  const { productId } = useParams();
  console.log('log', productId);
  const [product, setProduct] = useState(null);
  const [productFetched, setProductFetched] = useState(false);
  // const thumbnailImages = product?.prod_img || [];
  const thumbnailImages = (product && product.prod_img) ? product.prod_img.slice(0, 5) : [];
  const [currentImg, setCurrentImg] = useState(thumbnailImages[0]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  //heart plus
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products/${productId}`);
        setProduct(response.data);
        setProductFetched(true);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user)
          return
          const userId = user[0]._id;
          const favoritesResponse = await axios.get(
            `http://localhost:8000/api/account/favors/${userId}`,
          );
          const favoriteProducts = favoritesResponse.data;
          const isFavorite = favoriteProducts.some(
            (favoriteProduct) => favoriteProduct._id === productId,
          );
          setIsFilled(isFavorite);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    Promise.all([fetchData(), fetchFavorites()]);
  }, [productId]);
  useEffect(() => {
    if (productFetched && thumbnailImages.length > 0) {
      setCurrentImg(thumbnailImages[0]);
    }
  }, [productFetched, thumbnailImages]);

  const handleThumbnailClick = (imgSrc) => {
    setCurrentImg(imgSrc);
    setSelectedThumbnail(imgSrc);
  };

  const handleThumbnailHover = (imgSrc) => {
    setSelectedThumbnail(imgSrc);
  };

  // Nút tăng giảm + - 1
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      return newQuantity <= parseInt(product?.prod_num_avai) ? newQuantity : prevQuantity;
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // filter Rank
  const [selectedOption, setSelectedOption] = useState('Tất cả');
  const options = ['Tất cả', '5 Sao(300)', '4 Sao(20)', '3 Sao(3)', '2 Sao(0)', '1 Sao(1)'];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  //filer Sort
  const [selectedOption1, setSelectedOption1] = useState('Mới nhất');
  const options1 = ['Mới nhất', 'Cũ nhất'];

  const handleOptionChangeSort = (option1) => {
    setSelectedOption1(option1);
  };

  // const handleClick = () => {
  //   setIsFilled(!isFilled);
  // };

  //like dislike
  const [likeType1, setLikeType1] = useState(null);
  const [likeCount1, setLikeCount1] = useState({ like: 2, dislike: 0 });

  const [likeType2, setLikeType2] = useState(null);
  const [likeCount2, setLikeCount2] = useState({ like: 7, dislike: 0 });

  const handleLikeDislikeClick1 = (type) => {
    if (likeType1 === type) {
      setLikeType1(null);
      setLikeCount1((prevCount) => ({
        ...prevCount,
        [type]: prevCount[type] - 1,
      }));
    } else {
      setLikeType1(type);
      setLikeCount1((prevCount) => ({
        ...prevCount,
        [type]: prevCount[type] + 1,
      }));
      if (likeType1 !== null) {
        setLikeCount1((prevCount) => ({
          ...prevCount,
          [likeType1]: prevCount[likeType1] - 1,
        }));
      }
    }
  };

  const handleLikeDislikeClick2 = (type) => {
    if (likeType2 === type) {
      setLikeType2(null);
      setLikeCount2((prevCount) => ({
        ...prevCount,
        [type]: prevCount[type] - 1,
      }));
    } else {
      setLikeType2(type);
      setLikeCount2((prevCount) => ({
        ...prevCount,
        [type]: prevCount[type] + 1,
      }));
      if (likeType2 !== null) {
        setLikeCount2((prevCount) => ({
          ...prevCount,
          [likeType2]: prevCount[likeType2] - 1,
        }));
      }
    }
  };

  //modal review popup
  const [showPopup, setShowPopup] = useState(false);
  const handleClick23 = () => {
    console.log(showPopup);
    setShowPopup(true);
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [content, setContent] = useState('');
  const [showPopupNotiLogin, setShowPopupNotiLogin] = useState(false);
  const toggleLike = async () => {
    if (!localStorage.getItem('user')) {
      console.log('Bạn cần đăng nhập');
      setContent('Bạn cần đăng nhập để thực hiện thêm sản phẩm yêu thích!');
      setShowPopupNotiLogin(true);
    } else {
      try {
        const user_current = JSON.parse(localStorage.getItem('user'))[0];
        const user_id = user_current._id;

        if (isFilled) {
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
        setIsFilled(!isFilled);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };
  // const handleAddToCart = () => {
  //   if (!localStorage.getItem('user')) {
  //     console.log('Bạn cần đăng nhập');
  //     setContent('Bạn cần đăng nhập để thực hiện thêm sản phẩm vào giỏ hàng!');
  //     setShowPopupNotiLogin(true);
  //   } else {
  //     addToCart(product, quantity);
  //   //     if (!localStorage.getItem('user')) {
  //   //   // console.log("Bạn cần đăng nhập");
  //   //   // setShowPopupNotiLogin(true);
  //   //   addToCartNoLogin(props.productItem, quantity)
  //   //   setShowSuccessPopup(true);
  //   // } else {
  //   //   addToCart(props.productItem, quantity);
  //   //   setShowSuccessPopup(true);
  //   // }

  //     setTimeout(() => {
  //       getCartQuantity();
  //     }, 1000);
  //     setModalShow(true);
  //     setTimeout(() => {
  //       setModalShow(false); // Ẩn popup sau 5 giây
  //     }, 3000);
  //   }
  // };

    const handleAddToCart = () => {
      if (!localStorage.getItem('user')) {
        // console.log("Bạn cần đăng nhập");
        // setShowPopupNotiLogin(true);
        addToCartNoLogin(product, quantity)
        setModalShow(true);
      } else {
        addToCart(product, quantity);
        setModalShow(true);
      }
      setTimeout(() => {
        getCartQuantity();
      }, 1000)
      setTimeout(() => {
        setModalShow(false); // Ẩn popup sau 5 giây
      }, 3000);
    };
  // const contentBuyNow = "Bạn cần đăng nhập để thực hiện mua ngay!";
  const addToCartAndRedirect = () => {
    // if (!localStorage.getItem('user')) {
    //   console.log('Bạn cần đăng nhập');
    //   setContent('Bạn cần đăng nhập để thực hiện mua ngay!');
    //   setShowPopupNotiLogin(true);
    // } else {
    //   (async () => {
    //     try {
    //       await addToCart(product, 1);
    //       console.log('Sản phẩm đã được thêm vào giỏ hàng');
    //       navigate('/cart');
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

  const handleChange = (event) => {
    let value = parseInt(event.target.value);
    console.log(value);
    if (value > parseInt(product?.prod_num_avai)) {
      value = parseInt(product?.prod_num_avai);
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

  const currentPrice = formatPrice(
    product?.prod_cost.$numberDecimal -
      product?.prod_cost.$numberDecimal * product?.prod_discount.$numberDecimal,
  );
  const discount = product?.prod_discount.$numberDecimal * 100;
  const BeforDiscountPrice = formatPrice(product?.prod_cost.$numberDecimal);
  return (
    <div className="productDetail">
      {/* <Button
        className="product__item__view btn_round_8px"
        label="Click Review Popup"
        type="button"
        onClick={handleClick23}
      />
      <ReviewPopup show={showPopup} onHide={() => setShowPopup(false)} /> */}

      <Container className="product__detail" fluid>
        <Row >
          {/* Thumbnails */}
          <Col xs={1} className="product__detail_col1">
            <div className="product__image_small">
              {thumbnailImages.map((imgSrc, index) => (
                <Image
                  key={index}
                  src={imgSrc}
                  className={`product__image_small__size ${
                    selectedThumbnail === imgSrc ? 'selected' : ''
                  }`}
                  alt="image small"
                  preview={false}
                  onClick={() => handleThumbnailClick(imgSrc)}
                  onMouseEnter={() => handleThumbnailHover(imgSrc)}
                  onMouseLeave={() => setSelectedThumbnail(null)}
                />
              ))}
            </div>
          </Col>

          {/* Frame 2 */}
          <Col xs={5} className="product__detail_col6" style={{ padding: '0px' }}>
            <Image
              className={`product__image_big ${selectedThumbnail ? 'selected' : ''}`}
              src={currentImg}
              alt="image product"
              preview={false}
            />
            {window.innerWidth <= 576 && (
              <Col className="product__detail__buttons">
                <GrFormPrevious className="btn__previous" />
                <GrFormNext className="btn__next" />
              </Col>
            )}
          </Col>

          {/* Frame 3 */}
          <Col xs={6} className="product__detail_col5">
            <div className="product__detail__col3">
              <div className="product__name__detail">
                <div className="product__name__detail__first">
                  <h1 className="product__name__detail__title">{product?.prod_name}</h1>
                  <div>
                    {isFilled ? (
                      <IoHeartSharp className="heart_plus" onClick={toggleLike} />
                    ) : (
                      <TbHeartPlus className="heart_plus" onClick={toggleLike} />
                    )}
                  </div>
                  <PopupNotiLogin
                    content={content}
                    show={showPopupNotiLogin}
                    onHide={() => setShowPopupNotiLogin(false)}
                  />
                </div>
                <div className="product__name__detail__review">
                  <div className="product__name__detail__review_first">
                    <span>{product?.prod_star_rating}</span>
                    {Array.from({ length: product?.prod_star_rating }, (_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>
                  <span>2 đánh giá</span>
                  <span>{product?.prod_num_sold} đã bán</span>
                </div>
                <div className="product__name__detail__price">
                  <span className="product__name__detail__price_first">{BeforDiscountPrice} đ</span>
                  <span className="product__name__detail__price_second">{currentPrice} đ</span>
                  <span className="product__name__detail__price_third">Giảm {discount} %</span>
                </div>
              </div>
              <div className="description__product__detail headline-small">
                <div className="description__product__detail-title">
                  <IoMdInformationCircleOutline className="description__product__detail-title__icon" />
                  <span>THÔNG TIN SẢN PHẨM</span>
                </div>
                <ul className="body-large">
                  <li>Đảm bảo hàng có chất lượng thương hiệu.</li>
                  <li>Hàng luôn có sẵn ở TAA.</li>
                  <li>Phong cách Unisex, phù hợp Nam/Nữ.</li>
                </ul>
              </div>
              <div className="ship__product__detail">
                <span className="ship__product__detail_title">Vận chuyển</span>
                <div className="ship__product__detail_description">
                  <GiRabbitHead className="ship__product__detail_description__icon" />
                  <div className="ship__product__detail_description__category">
                    <span>
                      <strong>Miễn phí vận chuyển</strong>
                    </span>
                    <span>Miễn phí vận chuyển cho mọi đơn hàng</span>
                  </div>
                </div>
              </div>
              <div className="color__product__detail">
                <span>Màu sắc: </span>
                <div className="btn_round_32px">{product?.prod_color}</div>
              </div>
              <div className="size__product__detail">
                <span>Kích cỡ: </span>
                <div className="btn_round_32px">{product?.prod_size}</div>
              </div>
              <div className="quantity__product__detail">
                <span className="quantity__product__detail_title">Số lượng: </span>
                <div className="quantity__product__detail_input ">
                  <div class="quantity__product-decrement outline-text" onClick={handleDecrement}>
                    -
                  </div>
                  <input
                    id="input__increment__decrement"
                    type="number"
                    min="1"
                    max={product?.prod_num_avai}
                    step="1"
                    className="my-input"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={quantity.toLocaleString('en-US', {
                      minimumIntegerDigits: 1,
                      useGrouping: false,
                    })}
                  />
                  <div class="quantity__product-increment outline-text" onClick={handleIncrement}>
                    +
                  </div>
                </div>
                <span className="quantity__product__detail_available">
                  {product?.prod_num_avai} sản phẩm sẵn có
                </span>
              </div>
              <div className="add__cart__buy__now">
                <button
                  className="btn_round_8px btn_clickable_lightcolor"
                  show={showPopup}
                  onClick={handleAddToCart}
                >
                  <MdOutlineAddShoppingCart />
                  Thêm vào giỏ hàng
                </button>
                <NotiAddCartSuccessPopup show={modalShow} onHide={() => setModalShow(false)} />
                <div
                  className="btn_round_8px btn_clickable_boldcolor buynow"
                  onClick={addToCartAndRedirect}
                >
                  Mua ngay
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="product__description">
          <span>THÔNG TIN THƯƠNG HIỆU</span>
          <ul>
            <li>
              Thương hiệu TAA - Three Accessories Appreciate đã được đăng kí bảo hộ năm 2023, chuyên
              sản xuất và nhập khẩu các mặt hàng phụ kiện thời trang như: Vòng cổ , Nhẫn , Hoa Tai ,
              Vòng Tay,... cùng những sản phẩm khác phục vụ cho niềm đam mê với phụ kiện của bạn.
              Điểm tạo nên sự khác biệt của chúng tôi đó chính là nguồn sản phẩm dồi dào, đáp ứng
              mọi yêu cầu về các phong cách khác nhau của mọi khách hàng với mức giá vô cùng phải
              chăng. Thiết kế may tinh tế, sắc sảo và thời trang, theo phong cách Ulzzang Hàn Quốc
              cá tính.
            </li>
            <li>
              TAA đã có cửa hàng tại HCM và 100.000 KH mua sắm mỗi năm. Phương châm của TAA là luôn
              khách hàng lên hàng đầu, chứng tôi sẽ cố gắng thực hiện hóa mọi nhu cầu của bạn.
            </li>
            <li>
              <div className="product__description__icon">
                <BiPhoneCall />{' '}
              </div>
              Liên hệ: 0948645540
            </li>
            <li>
              <div className="product__description__icon">
                <IoMdBookmarks />
              </div>
              Hỗ trợ đổi trả
            </li>
            <li>
              <div className="product__description__icon">
                <MdOutlinePeopleAlt />{' '}
              </div>
              Đăng ký thành viên để nhận được nhiều ưu đãi
            </li>
          </ul>
        </Row>

        <div className="prod__img-list">
          <img className="prod__img-item" loading="lazy" src={product?.prod_img[0]} fluid />
          <img className="prod__img-item" loading="lazy" src={product?.prod_img[1]} fluid />
          <img className="prod__img-item" loading="lazy" src={product?.prod_img[2]} fluid />
          <img className="prod__img-item" loading="lazy" src={product?.prod_img[3]} fluid />
        </div>

        <Row className="product__rating">
          <span className="product__rating__title">ĐÁNH GIÁ SẢN PHẨM</span>
          <div className="product__rating__star">
            <div className="product__rating__star_45">
              <span>{product?.prod_star_rating}</span>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <div className="product__rating__star__filter">
              <div className="product__rating__star__filter__rank">
                <span>Xếp hạng</span>
                <div className="custom-select">
                  <select
                    className="btn_round_8px btn__filter__rank "
                    value={selectedOption}
                    onChange={(e) => handleOptionChange(e.target.value)}
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown className="dropdown-icon" />
                </div>
              </div>

              <div className="product__rating__star__filter__soft">
                <span>Sắp xếp theo</span>
                <div className="custom-select">
                  <select
                    className="btn_round_8px btn__filter__soft"
                    value={selectedOption1}
                    onChange={(e) => handleOptionChangeSort(e.target.value)}
                  >
                    {options1.map((option1, index) => (
                      <option key={index} value={option1}>
                        {option1}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown className="dropdown-icon" />
                </div>
              </div>
            </div>
          </div>
          <hr className="hr-title"></hr>
          {/* component feedback comment */}
          <div className="rating__item">
            <div className="rating__item__avatar">
              <Image
                className="rating__item__img"
                src="https://res.cloudinary.com/dg40uppx3/image/upload/v1713435732/IMG_5365_bw6k0p.jpg"
                alt="image small"
                preview={false}
              />
            </div>
            <div className="rating__item__body">
              <div className="body__info">
                <div className="body__info__name">lamcam2003</div>
                <div className="body__info__star">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="body__info__date">
                  <span>24 - 03 - 29 20:27</span>
                  <div className="vertical"></div>
                  <span>Phân loại hàng: Freestyle</span>
                </div>
              </div>
              <div className="body__content">Sản phẩm xinh cực, cảm ơn shop ạ!!</div>
              <div className="body__imgs">
                <Image
                  src={product?.prod_img[1]}
                  className="body__img"
                  alt="image small"
                  preview={false}
                />
                <Image
                  src={product?.prod_img[2]}
                  alt="image small"
                  className="body__img"
                  preview={false}
                />
                <div className="img_small_blur">
                  <Image
                    src={product?.prod_img[3]}
                    alt="image small"
                    className="body__img"
                    preview={false}
                  />
                  <div className="overlay">
                    <p class="blur_text_img">+2</p>
                  </div>
                </div>
              </div>
              <div className="body__react">
                <div className="body__react__like">
                  {likeType1 === 'like' ? (
                    <BiSolidLike
                      className="btn_like_dislike"
                      onClick={() => handleLikeDislikeClick1('like')}
                    />
                  ) : (
                    <BiLike
                      className="btn_like_dislike"
                      onClick={() => handleLikeDislikeClick1('like')}
                    />
                  )}
                  <span>{likeCount1.like}</span>
                </div>
                <div className="body__react__dislike">
                  {likeType1 === 'dislike' ? (
                    <BiSolidDislike
                      className="btn_like_dislike"
                      onClick={() => handleLikeDislikeClick1('dislike')}
                    />
                  ) : (
                    <BiDislike
                      className="btn_like_dislike"
                      onClick={() => handleLikeDislikeClick1('dislike')}
                    />
                  )}
                  <span>{likeCount1.dislike}</span>
                </div>
              </div>
            </div>
          </div>
          {/* component feedback comment */}
          <div className="rating__item">
            <div className="rating__item__avatar">
              <Image
                className="rating__item__img"
                src="https://res.cloudinary.com/dg40uppx3/image/upload/v1713435719/z5356071420846_84f0e40470ade0098d9f2f21d4dc577c_b6r72e.jpg"
                alt="image small"
                preview={false}
              />
            </div>
            <div className="rating__item__body">
              <div className="body__info">
                <div className="body__info__name">xxnhi</div>
                <div className="body__info__star">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="body__info__date">
                  <span>24 - 03 - 29 20:27</span>
                  <div className="vertical"></div>
                  <span>Phân loại hàng: Freestyle</span>
                </div>
              </div>
              <div className="body__content">Chủ sốp dễ thương, tư vấn nhiệt tình, sp siu đẹp</div>
              <div className="body__imgs">
                <Image
                  src={product?.prod_img[0]}
                  className="body__img"
                  alt="image small"
                  preview={false}
                />
                <Image
                  src={product?.prod_img[2]}
                  alt="image small"
                  className="body__img"
                  preview={false}
                />
                <div className="img_small_blur">
                  <Image
                    src={product?.prod_img[5]}
                    alt="image small"
                    className="body__img"
                    preview={false}
                  />
                  <div className="overlay">
                    <p class="blur_text_img">+2</p>
                  </div>
                </div>
              </div>
              <div className="body__react">
                <div className="body__react__like">
                  {likeType2 === 'like' ? (
                    <BiSolidLike
                      className="btn_like_dislike"
                      onClick={() => handleLikeDislikeClick2('like')}
                    />
                  ) : (
                    <BiLike
                      className="btn_like_dislike"
                      onClick={() => handleLikeDislikeClick2('like')}
                    />
                  )}
                  <span>{likeCount2.like}</span>
                </div>
                <div className="body__react__dislike">
                  {likeType2 === 'dislike' ? (
                    <BiSolidDislike onClick={() => handleLikeDislikeClick2('dislike')} />
                  ) : (
                    <BiDislike onClick={() => handleLikeDislikeClick2('dislike')} />
                  )}
                  <span>{likeCount2.dislike}</span>
                </div>
              </div>
            </div>
          </div>
        </Row>

        <Row className="product__suggestion">
          <span className="product__suggestion__title">CÁC SẢN PHẨM ĐỀ XUẤT</span>
          <div className="product__suggestion__items">
            {/* {filteredData.slice(5, 9).map((product) => (
              <Col key={product._id} xxl={3}>
                <ProductItem product={product} />
              </Col>
            ))} */}
            <Slider {...settings}>
              {hotProducts.map((product) => (
                <div key={product._id} className="product__list__hot">
                  <ProductItem product={product} />
                </div>
              ))}
            </Slider>
          </div>
        </Row>
      </Container>
    </div>
  );
}
export default ProductDetail;
