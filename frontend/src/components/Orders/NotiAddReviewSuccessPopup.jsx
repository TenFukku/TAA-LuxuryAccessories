import React from 'react';
import { Modal } from 'react-bootstrap';
import { GoCheckCircleFill } from 'react-icons/go';

function NotiAddReviewSuccessPopup({ onHide, show }) {
  return (
    <Modal show onHide={onHide} size="" centered>
      <Modal.Body className="modal-noti-add-cart-success-body">
        <GoCheckCircleFill className="go-check-circle-fill" />
        <h4>Bạn đã đánh giá thành công!</h4>
      </Modal.Body>
    </Modal>
  );
}

export default NotiAddReviewSuccessPopup;
