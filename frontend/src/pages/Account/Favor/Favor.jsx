import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductPagination from 'components/Products/ProductPagination';
import ProductItem from 'components/Products/ProductItem';

function Favor() {
  const defaultUser = JSON.parse(localStorage.getItem('user'));
  const defaultUserData = defaultUser[0]
  const id = defaultUserData._id;
  const [favors, setFavors] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/account/favors/${id}`);
      const nonNullData = response.data.filter(item => item !== null);
      setFavors(nonNullData);
      const total = Math.ceil(nonNullData.length / productsPerPage);
      setTotalPages(total); // Cập nhật tổng số trang
      if (activePage > total) {
        setActivePage(total); // Đặt lại trang hiện tại thành trang cuối cùng nếu nó lớn hơn tổng số trang
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [id, activePage]);

  const startIndex = (activePage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = favors.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div id='orders'>
      <article className="section__content visible article">
        <div className="section__info visible">
          <h2 className="headline-large">Sản phẩm yêu thích</h2>
          <p className="body-medium">Trang cung cấp thông tin về các sản phẩm đã yêu thích</p>
        </div>
      </article>

      <Row className="row-cols-1 row-cols-md-3 g-3">
        {currentProducts.map((favor) => (
          <Col key={favor._id} xxl={3}>
            <ProductItem product={favor} onFavoriteChange={fetchFavorites} />
          </Col>
        ))}
      </Row>

      <Row className="product__pagination">
        {totalPages > 1 && (
          <ProductPagination
            totalPages={totalPages}
            activePage={activePage}
            onPageChange={handlePageChange}
          />
        )}
      </Row>
    </div>
  );
}

export default Favor;
