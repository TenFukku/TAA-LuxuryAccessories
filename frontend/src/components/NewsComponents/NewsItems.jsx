import React from 'react';
// import Card from 'react-bootstrap/Card';
import { Row, Col, Image } from 'react-bootstrap';
import 'style/components/News/NewsItems.scss';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

NewsItems.propTypes = {
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

function NewsItems({ news }) {
  if (!news) {
    return null;
  }
  console.log(news);

  const goToNextPageTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Row lg={2} md={1} sm={1}>
      <div className="news__card card">
        <Row>
          <Col sm={4}>
            {news && news.b_image && news.b_image[0] && (
              <Image className="card__poster" loading="lazy" src={news.b_image[0]} />
            )}
          </Col>
          <Col sm={8}>
            <div className="card__body">
              <NavLink
                to={`/news/${news._id}`}
                className="article__title title-medium"
                onClick={goToNextPageTop}
              >
                {news.b_title}
              </NavLink>
              <p className="article__context body-medium">{news.b_content}</p>
            </div>
          </Col>
        </Row>
      </div>
    </Row>
  );
}
export default NewsItems;
