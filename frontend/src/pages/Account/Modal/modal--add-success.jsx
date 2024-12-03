import React from "react";
import { useEffect } from "react";
import ButtonIcon from 'components/Common/ButtonIcon';
import { CgClose } from 'react-icons/cg';
import updateSuccess from '../../../assets/image/account/update-success.png';

function AddSuccess({ onClose, title }) {
      // Sử dụng useEffect để tự động đóng modal sau 5 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Gọi hàm onClose để đóng modal
    }, 5000);

    // Xóa bộ đếm khi component unmount
    return () => clearTimeout(timer);
  }, [onClose]);
  const handleModalClick = (e) => {
    // Kiểm tra xem phần tử được nhấp có là nền của modal hay không
    if (e.target === e.currentTarget) {
      onClose(); // Gọi hàm onHide khi nhấp vào nền modal
    }
  };
      return (
          <div id="modal--add-success" className="profile-modal active" onClick={handleModalClick}>
              <div className="modal__content--form">
                <ButtonIcon
                  className="modal__btn--close"
                  label={<CgClose />}
              border="none"
              type="button"
                  onClick={onClose}
            />
            <div className="success-content">
            <h1 className="profile-modal__title headline-small">{ title}</h1>
              <img src={updateSuccess} alt="" style={{ width: "auto", height: "200px" }} />
              </div>
              </div>
            </div>
      )
  }
  export default AddSuccess