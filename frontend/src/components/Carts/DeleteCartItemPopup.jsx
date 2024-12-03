// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// function StaticExample() {
//   return (
//     <div className="modal show" style={{ display: 'block', position: 'initial' }}>
//       <Modal.Dialog>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal title</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <p>Modal body text goes here.</p>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary">Hủy bỏ</Button>
//           <Button variant="primary">Đồng ý</Button>
//         </Modal.Footer>
//       </Modal.Dialog>
//     </div>
//   );
// }

// export default StaticExample;

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'style/components/Carts/DeleteCartItemPopup.scss';

function DeleteCartItemPopup({ showModal, onClose, onConfirmDelete }) {
  return (
    <Modal show={showModal} onHide={onClose} className="delete-cart-item-popup">
      <Modal.Header closeButton className="delete__cart__item__header">
        <Modal.Title className="delete__cart__title">
          Xác nhận xóa sản phẩm khỏi giỏ hàng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="delete__cart__item__body">
        <p>Bạn có chắc chắn muốn xóa?</p>
      </Modal.Body>
      <Modal.Footer className="delete__cart__item__footer">
        <Button
          variant="secondary"
          onClick={onClose}
          className="btn-close-logout btn_clickable_lightcolor_outline"
        >
          Hủy bỏ
        </Button>
        <Button
          variant="primary"
          onClick={onConfirmDelete}
          className="btn-logout btn_clickable_boldcolor delete__cart__item_btn"
        >
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteCartItemPopup;
