import React, { useState, useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'style/pages/NewsPost/NewsPost.scss';
import bannersmall from 'assets/image/banners/banner-small.png';
// import banner from "assets/image/banners/banner.png";
import axios from 'axios';
import PropTypes from 'prop-types';

NewsPost.propTypes = {
  news: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    b_title: PropTypes.string.isRequired,
    b_date: PropTypes.string.isRequired,
    b_content: PropTypes.string.isRequired,
    b_heading: PropTypes.arrayOf(PropTypes.string).isRequired,
    b_text: PropTypes.arrayOf(PropTypes.string).isRequired,
    b_image: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

function NewsPost(props) {
  const { newsId } = useParams();
  const [news, setNews] = useState(null);
  console.log(newsId);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/news/${newsId}`);
        // const response = await axios.get(http://localhost:8000/news/661e937fc480bc54ddbff055);
        console.log('data', response.data);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching newspost:', error);
      }
    };

    fetchNews();
  }, [newsId]);
  console.log(news);

  if (!news) {
    console.log('a');
    return null;
  }

  return (
    <Container className="post fluid">
      <div className="post__title display-medium">
        <span>{news.b_title}</span>
      </div>
      <p className="post__date body-large mt-12">{news.b_date}</p>
      <p className="post__content body-large mt-12">{news.b_content}</p>
      {/* <Image className="post__poster" loading="lazy" src={banner} fluid/> */}
      <p className="post__heading headline-small">{news.b_heading[0]}</p>
      <p className="post__text body-large">{news.b_text[0]}</p>
      <div className="post__img-list">
        <img className="post__picture-product" loading="lazy" src={news.b_image[0]} fluid />
        <img className="post__picture-product" loading="lazy" src={news.b_image[1]} fluid />
        <img className="post__picture-product" loading="lazy" src={news.b_image[2]} fluid />
        <img className="post__picture-product" loading="lazy" src={news.b_image[3]} fluid />
      </div>

      <p className="post__heading headline-small">{news.b_heading[1]}</p>
      <p className="post__text body-large">{news.b_text[1]}</p>
      <div className="post__img-list">
        <img className="post__picture-product" loading="lazy" src={news.b_image[4]} fluid />
        <img className="post__picture-product" loading="lazy" src={news.b_image[5]} fluid />
        <img className="post__picture-product" loading="lazy" src={news.b_image[6]} fluid />
        <img className="post__picture-product" loading="lazy" src={news.b_image[7]} fluid />
      </div>

      <p className="post__heading headline-small">{news.b_heading[2]}</p>
      <p className="post__text body-large">{news.b_text[2]}</p>
      <div className="post__img-list">
        <img className="post__picture-product" loading="lazy" src={news.b_image[8]} fluid />
        <img className="post__picture-product" loading="lazy" src={news.b_image[9]} fluid />
        <img className="post__picture-product" loading="lazy" src={news.b_image[10]} fluid />
        <img className="post__picture-product" loading="lazy" src={news.b_image[11]} fluid />
      </div>

      <Image src={bannersmall} fluid />
    </Container>
  );
}
export default NewsPost;
