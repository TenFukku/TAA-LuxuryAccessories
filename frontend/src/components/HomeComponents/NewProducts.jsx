import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from "components/Products/ProductItem";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'style/components/Home/NewProduct.scss'
import ButtonIcon from "components/Common/ButtonIcon";
function NewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products/hot");
        setProducts(response.data);
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
        <ButtonIcon
          label={<FaChevronLeft />}
          labelColor="#785b5b"
          borderRadius="100%"
        />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-next-arrow" onClick={onClick}>
        <ButtonIcon
          label={<FaChevronRight />}
          labelColor="#785b5b"
          borderRadius="100%"
        />
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

  return (
    <section className="preview_product_section">
      <h1 className="title_section">Hàng mới về</h1>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="product__list__hot">
            <ProductItem product={product} />
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default NewProducts;
