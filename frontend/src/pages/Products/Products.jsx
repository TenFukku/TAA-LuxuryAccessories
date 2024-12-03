import axios from 'axios';
import ProductFilter from 'components/Products/ProductFilter';
import ProductItem from 'components/Products/ProductItem';
import ProductMenu from 'components/Products/ProductMenu';
import ProductPagination from 'components/Products/ProductPagination';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'style/pages/Products/Product.scss';
import { HiOutlineLightBulb } from "react-icons/hi";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cate_type_name, cate_name } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const productsPerPage = 12;
  const [showMenu, setShowMenu] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldReload, setShouldReload] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPagesProducts, setTotalPagesProducts] = useState(0);
  const [totalPagesSearchResults, setTotalPagesSearchResults] = useState(0);

  const handleCategoryClick = (category, subCategory) => {
    // Thực hiện xử lý với thông tin sản phẩm đã click
    console.log(`Sản phẩm đã click: ${category} - ${subCategory}`);
    // Chuyển hướng đến route tương ứng với category và subcategory (nếu có)
    if (subCategory) {
      navigate(`/products/category/${category}/${subCategory}`);
    } else if (category) {
      navigate(`/products/category/${category}`);
    }
    else {
      navigate("/products");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.pathname === '/search') {
          setShowMenu(false);
          const params = new URLSearchParams(location.search);
          const keyword = params.get('keyword');
          const response = await axios.get(`http://localhost:8000/search?keyword=${keyword}`);
          setData(response.data.products);
          setSearchResults(response.data.products.length)
          const totalPages = Math.ceil(response.data.products.length / productsPerPage);
          setTotalPagesSearchResults(totalPages); // Cập nhật tổng số trang dựa trên số lượng sản phẩm tìm thấy
          setFilteredData(response.data.products.slice(0, productsPerPage));
          setActivePage(1); // Đặt trang hiện tại về trang 1
        } else {
          setShowMenu(true);
          let url = 'http://localhost:8000/products';
          if (cate_type_name) {
            url += `/category/${cate_type_name}`;
            if (cate_name) {
              url += `/${cate_name}`;
            }
          }
          const response = await axios.get(url);
          setData(response.data);
          // Set filteredData to only the first page of products in the category
          const totalPages = Math.ceil(response.data.length / productsPerPage);
          setTotalPagesProducts(totalPages); // Cập nhật tổng số trang dựa trên số lượng sản phẩm trong danh mục
          setFilteredData(response.data.slice(0, productsPerPage));
          setActivePage(1); // Đặt trang hiện tại về trang 1
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.pathname, location.search, cate_type_name, cate_name]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('keyword');
    if (keyword !== null && keyword !== searchQuery) {
      setSearchQuery(keyword);
      const prevSearchParams = new URLSearchParams(prevLocation.search);
      const prevKeyword = prevSearchParams.get('keyword');
      if (keyword !== prevKeyword) {
        setShouldReload(true);
      }
    }
    if (prevLocation.pathname === '/search' && location.pathname === '/products') {
      window.location.reload();
    }
    // Cập nhật prevLocation sau khi sử dụng location
    setPrevLocation(location);
  }, [location.search, searchQuery, prevLocation]);

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);


  const handlePageChange = (page) => {
    setActivePage(page);
    const startIdx = (page - 1) * productsPerPage;
    const endIdx = startIdx + productsPerPage;
    setFilteredData(data.slice(startIdx, endIdx));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const applyFilter = ({ sortBy, filterBy }) => {
    let updatedData = [...data];

    // Xử lý sắp xếp theo giá
    if (sortBy === '1') {
      if (filterBy && filterBy.includes('Bán chạy nhất')) { updatedData.sort((a, b) => b.prod_num_sold - a.prod_num_sold); }
      if (filterBy && filterBy.includes('Giảm giá')) {
        updatedData = updatedData.filter(item => parseFloat(item.prod_discount.$numberDecimal) > 0);
        console.log("trong if truoc sort1")
        console.log(updatedData)

      }
      console.log("ngoai if truoc sort1")
      console.log(updatedData)
      updatedData.sort((a, b) => {
        const priceA = parseFloat(a.prod_cost.$numberDecimal) - parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
        const priceB = parseFloat(b.prod_cost.$numberDecimal) - parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
        return priceA - priceB;
      });
      console.log("sau sort1")
      console.log(updatedData)
    } else if (sortBy === '2') {
      if (filterBy && filterBy.includes('Bán chạy nhất')) { updatedData.sort((a, b) => b.prod_num_sold - a.prod_num_sold); }
      if (filterBy && filterBy.includes('Giảm giá')) {
        updatedData = updatedData.filter(item => parseFloat(item.prod_discount.$numberDecimal) > 0);
        console.log("trong if truoc sort2")
        console.log(updatedData)
      }

      console.log("ngoai if truoc sort2")
      console.log(updatedData)
      updatedData.sort((a, b) => {
        const priceA = parseFloat(a.prod_cost.$numberDecimal) - parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
        const priceB = parseFloat(b.prod_cost.$numberDecimal) - parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
        return priceB - priceA;
      });
      console.log("sau sort12")
      console.log(updatedData)
    }

    // Xử lý bộ lọc theo sản phẩm bán chạy nhất
    if (filterBy && filterBy.includes('Bán chạy nhất')) {
      updatedData.sort((a, b) => b.prod_num_sold - a.prod_num_sold);
      if (sortBy === '1') {
        updatedData.sort((a, b) => {
          const priceA = parseFloat(a.prod_cost.$numberDecimal) - parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
          const priceB = parseFloat(b.prod_cost.$numberDecimal) - parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
          return priceA - priceB;
        });
      } else if (sortBy === '2') {
        updatedData.sort((a, b) => {
          const priceA = parseFloat(a.prod_cost.$numberDecimal) - parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
          const priceB = parseFloat(b.prod_cost.$numberDecimal) - parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
          return priceB - priceA;
        });
      }

      console.log(updatedData)
    }

    // Xử lý bộ lọc theo giảm giá
    if (filterBy && filterBy.includes('Giảm giá')) {
      updatedData = updatedData.filter(item => parseFloat(item.prod_discount.$numberDecimal) > 0);
      console.log("hellsso")
      if (sortBy === '1') {
        updatedData.sort((a, b) => {
          const priceA = parseFloat(a.prod_cost.$numberDecimal) - parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
          const priceB = parseFloat(b.prod_cost.$numberDecimal) - parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
          return priceA - priceB;
        });
      } else if (sortBy === '2') {
        updatedData.sort((a, b) => {
          const priceA = parseFloat(a.prod_cost.$numberDecimal) - parseFloat(a.prod_discount.$numberDecimal) * parseFloat(a.prod_cost.$numberDecimal);
          const priceB = parseFloat(b.prod_cost.$numberDecimal) - parseFloat(b.prod_discount.$numberDecimal) * parseFloat(b.prod_cost.$numberDecimal);
          return priceB - priceA;
        });
      }
    }
    setSearchResults(updatedData.length);
    // Cập nhật filteredData với dữ liệu đã lọc cho trang hiện tại
    const startIdx = (activePage - 1) * productsPerPage;
    const endIdx = startIdx + productsPerPage;
    setFilteredData(updatedData.slice(startIdx, endIdx));

    // Cập nhật lại tổng số trang sau khi áp dụng bộ lọc
    const totalPages = Math.ceil(updatedData.length / productsPerPage);
    if (location.pathname === '/search') {
      setTotalPagesSearchResults(totalPages);
    } else {
      setTotalPagesProducts(totalPages);
    }
  };

  return (

    showMenu ? (
      <Container className="product" fluid id="product">
        <ProductFilter applyFilter={applyFilter} />
        <Row className="product__content">
          <Col xxl={3} xl={3} lg={3} md={4} sm={4} className="product__category">
            <ProductMenu onCategoryClick={handleCategoryClick} />
          </Col>
          <Col xxl={9} xl={9} lg={9} md={8} sm={8} className="product__list">
            <Row className="row-cols-1 row-cols-md-3 g-3">
              {filteredData.map((product) => (
                <Col
                  key={product._id}
                  xxl={filteredData.length <= 2 ? 6 : filteredData.length === 3 ? 4 : 3}
                  xl={filteredData.length <= 2 ? 6 : 4}
                  lg={filteredData.length <= 2 ? 6 : 4}
                  md={6}
                  sm={6}
                  className={`product__item__small ${filteredData.length <= 4 ? 'small-product' : ''}`}
                >
                  <ProductItem product={product} />
                </Col>
              ))}
            </Row>
            <Row className="product__pagination">
              {totalPagesProducts > 1 && (
                <ProductPagination totalPages={totalPagesProducts} activePage={activePage} onPageChange={handlePageChange} />
              )}
            </Row>
          </Col>
        </Row>
      </Container >
    ) : (
      <Container className="product result__search" fluid id="product__search">
        {searchResults === 0 ? (
          <h4>Không tìm thấy sản phẩm bạn cần, hãy thử lại với từ khóa khác!</h4>
        ) : (<>
          <ProductFilter applyFilter={applyFilter} />
          <div className="result__noti">
            <HiOutlineLightBulb />
            <h4>Có {searchResults} sản phẩm được tìm thấy.</h4>
          </div>
          <Row className="product__content">
            <Row className="product__search row-cols-1 row-cols-md-6 g-3">
              {filteredData.map((product) => (
                <Col key={product._id} xxl={2} xl={3} lg={3} md={4} sm={6} className="search__item">
                  <ProductItem product={product} />
                </Col>
              ))}
            </Row>
            <Row className="product__pagination">
              {totalPagesSearchResults > 1 && (
                <ProductPagination totalPages={totalPagesSearchResults} activePage={activePage} onPageChange={handlePageChange} />
              )}
            </Row>
          </Row>
        </>)}
      </Container>
    )


  );
}
export default Products;