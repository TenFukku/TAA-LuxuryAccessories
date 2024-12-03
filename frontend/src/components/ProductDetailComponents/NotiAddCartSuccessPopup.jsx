import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'style/components/ProductDetail/NotiAddCartSuccess.scss';
import { GoCheckCircleFill } from 'react-icons/go';

function NotiAddCartSuccessPopup(props) {
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="modal-noti-add-cart-success">
        {/* <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title> */}
      </Modal.Header>
      <Modal.Body className="modal-noti-add-cart-success-body">
        <GoCheckCircleFill className="go-check-circle-fill" />
        <h4>Thêm vào giỏ hàng thành công</h4>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default NotiAddCartSuccessPopup;
