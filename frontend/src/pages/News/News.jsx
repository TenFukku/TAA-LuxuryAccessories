import React, { useState, useEffect } from 'react';
import NewsItems from 'components/NewsComponents/NewsItems';
import ProductPagination from 'components/Products/ProductPagination';
// import { useParams } from 'react-router-dom';
import { Container, Image, Row } from 'react-bootstrap';
import 'style/pages/News/News.scss';
import banner1 from 'assets/image/banners/news__banner--large.jpg';
import banner2 from 'assets/image/banners/news__banner--large-1.jpg';
import banner3 from 'assets/image/banners/news__banner--large-2.jpg';
import bannersmall from 'assets/image/banners/banner-small.png';
import axios from 'axios';
// import PropTypes from 'prop-types';

// News.propTypes = {
//   news: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     b_title: PropTypes.string.isRequired,
//     b_date: PropTypes.string.isRequired,
//     b_content: PropTypes.string.isRequired,
//     b_heading: PropTypes.arrayOf(PropTypes.string).isRequired,
//     b_text: PropTypes.arrayOf(PropTypes.string).isRequired,
//     b_img: PropTypes.arrayOf(PropTypes.string).isRequired,
//   }).isRequired,
// };

function News() {
  // const { newsId } = useParams();
  const [news, setNews] = useState([]); // Sửa thành một mảng rỗng thay vì null
  const [newsData, setnewsData] = useState([]); // Thêm state newsData
  const [totalPagesNews, setTotalPagesNews] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const newsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/news');
        const totalPages = Math.ceil(response.data.length / newsPerPage);
        setTotalPagesNews(totalPages);

        // Calculate the start and end indexes for the initial data
        const startIdx = (activePage - 1) * newsPerPage;
        const endIdx = startIdx + newsPerPage;

        // Slice the data based on the start and end indexes
        const initialData = response.data.slice(startIdx, endIdx);
        setNews(response.data); // Update the state 'news'
        setnewsData(initialData); // Update the state 'newsData'
      } catch (error) {
        console.error('Error fetching newspost:', error);
      }
    };

    fetchNews();
  }, [activePage]);


  const handlePageChange = (page) => {
    setActivePage(page);
    const startIdx = (page - 1) * newsPerPage;
    const endIdx = startIdx + newsPerPage;
    const filteredNews = news.slice(startIdx, endIdx); // Update newsData based on 'news'
    setnewsData(filteredNews);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <Container className="news fluid">
      <h1 className="news__title display-large">TUẦN VỪA QUA</h1>

      <div className="news__slider">
        <div className="news__slider-wrapper">
          <Image loading="lazy" src={banner1} className="news__slider-img" />
          <Image loading="lazy" src={banner2} className="news__slider-img" />
          <Image loading="lazy" src={banner3} className="news__slider-img" />
        </div>
      </div>

      <h1 className="news__title display-large">BÀI VIẾT</h1>
      <div className="news__item">
        <div className="row row-cols-1 row-cols-md-2 g-5">
          {newsData &&
            newsData.length > 0 &&
            newsData.map((item) => (
              <div className="news__item-col" key={item._id}>
                <NewsItems news={item} />
              </div>
            ))}
        </div>
      </div>

      <div className="product__pagination">
        {totalPagesNews > 1 && (
          <ProductPagination
            totalPages={totalPagesNews}
            activePage={activePage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <div className="news__banner">
        <Image src={bannersmall} fluid />
      </div>
    </Container>
  );
}

export default News;