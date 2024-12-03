import React, { useState, useEffect } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import { IoMdClose } from 'react-icons/io';
// import productDetailImg from '../assets/image/pencil.png';
import { FaRegStar, FaStar } from 'react-icons/fa';
import '../ReviewPopup.scss';
import NotiAddReviewSuccessPopup from 'components/Orders/NotiAddReviewSuccessPopup';
// import data from '@components/HomeComponents/data';

export default function ReviewPopup({ show,set, onHide, name, img }) {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleCompletionButtonClick = () => {
    setShowReviewPopup(false); // Ẩn ReviewPopup
    setShowSuccessPopup(true); // Hiển thị NotiAddReviewSuccessPopup
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false); // Ẩn NotiAddReviewSuccessPopup
    onHide();
  };
  // useEffect(() => {
  //   let timer;
  //   if (showPopup) {
  //     timer = setTimeout(() => {
  //       setShowPopup(false);
  //       setShowSuccessPopup(true);
  //     }, 5000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [showPopup]);

  function StarRating({ ratingContainerId }) {
    const [selectedRating, setSelectedRating] = useState(0);

    const handleStarClick = (index) => {
      setSelectedRating(index + 1);
      const stars = document.getElementById(ratingContainerId).querySelectorAll('.star-icon');
      stars.forEach((star, i) => {
        i <= index ? star.classList.add('active') : star.classList.remove('active');
      });
    };

    return (
      <div id={ratingContainerId} data-rating={selectedRating}>
        {[...Array(5)].map((_, index) => (
          <span key={index} className="star-icon" onClick={() => handleStarClick(index)}>
            {index < selectedRating ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
        <div className="review-start">
          <span>Tệ</span>
          <span>Tốt</span>
        </div>
      </div>
    );
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal__content__review" closeButton style={{ fontSize: '20px' }}>
        <Modal.Title className="modal__title">Đánh giá sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-review modal__content__review">
        <div className="modal-body">
          <div className="modal__product">
            <Image
              src={img}
              className="product__image_small__size"
              id="image-review"
              alt="image small"
            />
            <div className="modal__product--cover">
              <span>{name}</span>
              <span>Phân loại hàng: FreeStyle</span>
            </div>
          </div>
          <div className="modal__quality">
            <span className="mt-8">Chất lượng sản phẩm</span>
            <StarRating ratingContainerId="rating1" />
            <span className="mt-8">Tuyệt vời</span>
          </div>

          <div className="modal__service">
            <span className="mt-8">Dịch vụ vận chuyển</span>
            <StarRating ratingContainerId="rating2" />
            <span className="mt-8">Tuyệt vời</span>
          </div>

          <div className="modal__form-review visible">
            <div className="modal__form-review-border">
              <label htmlFor="form__review">Đánh giá sản phẩm:</label>
              <textarea
                id="form__review"
                placeholder="Để lại đánh giá"
                className="modal__form-review-textarea mt-12"
                // value={reviewContent}
                // onChange={handleReviewChange}
                required
              ></textarea>
            </div>
            <div className="energy-review">
              Đánh giá của bạn là động lực để TAA ngày càng hoàn thiện hơn
            </div>
          </div>

          <div className="modal__checkbox-form">
            <input type="checkbox" id="checkbox1" />
            <div>
              <label className="modal__view-name-account" htmlFor="checkbox1">
                Hiển thị tên tài khoản trên đánh giá này
              </label>
              <span className="modal__check-name-account">
                Tên tài khoản sẽ được hiển thị như: Nguyễn Văn A
              </span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal__content__review">
        <Button className="btn_round_8px btn_light btn_review_backto" onClick={onHide}>
          Trở lại
        </Button>
        <Button
          className="btn_round_8px btn_bold btn_review_done review-list__btn--del done-btn"
          onClick={handleCompletionButtonClick}
        >
          Hoàn thành
        </Button>
      </Modal.Footer>
      {showSuccessPopup && <NotiAddReviewSuccessPopup onHide={handleCloseSuccessPopup} />}
    </Modal>
  );
}
