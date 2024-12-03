import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ButtonIcon from 'components/Common/ButtonIcon';
import Button1 from 'components/Common/Button1';
import { GrAdd } from 'react-icons/gr';
import { CgClose } from 'react-icons/cg';
import { MdDeleteOutline } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import AddAddress from 'pages/Account/Modal/modal--add-address';
import EditAddress from 'pages/Account/Modal/modal--edit-address';
import DelAddress from 'pages/Account/Modal/modal--del-address';
import notFound from '../../assets/image/account/no-data.jpg';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import '../../pages/Account/index.scss';
function ModalDeliveryAddress(props) {
  const defaultUser = JSON.parse(localStorage.getItem('user'));
  const defaultUserData = defaultUser[0];
  const id = defaultUserData._id;
  const idAddress = props.idAddress;
  const [addresses, setAddresses] = useState([]);
  const [notAddresses, setNotAddress] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/account/shipping-addresses/${id}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length === 0) {
          setNotAddress(true);
        } else {
          setAddresses(response.data);
          const addressIndex = response.data.findIndex((item) => {
            return item._id === props.idAddress;
          });
          setSelectedOption(addressIndex);
          setSelectedItem(response.data[addressIndex]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  console.log('selectedItem', selectedItem);
  console.log('selectOption', selectedOption);
  const onSuccess = () => {
    axios
      .get(`http://localhost:8000/api/account/shipping-addresses/${id}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length === 0) {
          setNotAddress(true);
        } else {
          setNotAddress(false);
          setAddresses(response.data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onSuccessDel = () => {
    axios
      .get(`http://localhost:8000/api/account/shipping-addresses/${id}`)
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data) && response.data.length === 0) {
          setNotAddress(true);
        } else {
          setNotAddress(false);
          const addressAfterDel = response.data.find((item) => {
            return item._id === idAddress;
          });
          const addressDefault = response.data.find((item) => {
            return item.is_default === true;
          });
          const addressDefaultIndex = response.data.findIndex((item) => {
            return item.is_default === true;
          });
          if (!addressAfterDel) {
            if (!addressDefault) {
              console.log('k co default ne');
              props.updateDeliveryInformation(null);
              props.onCheckedItems(null);
            } else {
              console.log('co default');
              setSelectedItem(addressDefault);
              setSelectedOption(addressDefaultIndex);
              // props.onCheckedItems(null)
              props.updateDeliveryInformation(addressDefault);
            }
          }
        }
        setAddresses(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleSetDefault = (address, addressId, userId) => {
    axios
      .put(`http://localhost:8000/api/account/address-default/${addressId}`, { id: userId })
      .then((response) => {
        setAddresses(
          addresses.map((add) => {
            if (add === address) {
              add.is_default = true;
            } else {
              add.is_default = false;
            }
            return add;
          }),
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  // const [isOpenConfirmPhone, setIsOpenConfirmPhone] = useState(false);
  // const [isOpenAddSuccess, setIsOpenAddSuccess] = useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const handleDeletedAddress = (id) => {
    setSelectedAddressId(id);
    setIsOpenDelete(true);
  };
  const [selectedEditAdress, setSelectedEditAdress] = useState(null);
  const handleEditedAddress = (add) => {
    setSelectedEditAdress(add);
    setIsOpenEdit(true);
  };
  const handleClick = (item, index) => {
    // Nếu nút đã được chọn, không làm gì cả
    if (index === selectedOption) {
      return;
    }
    // Nếu không, cập nhật trạng thái của nút mới được chọn
    setSelectedOption(index);
    setSelectedItem(item);
    // props.onPaymentMethodChange(index === 0 || index === 1);
  };
  useEffect(() => {
    let checkedItemsInfo = null;

    addresses.forEach((item, index) => {
      if (index === selectedOption) {
        checkedItemsInfo = item; // Đưa đối tượng item vào mảng checkedItemsInfo
      }
    });
    setSelectedItem(checkedItemsInfo);
  }, [selectedOption]);
  const handleSubmit = () => {
    // props.onHide();
    // console.log(selectedItem);
    props.onHideSubmit();
    if (notAddresses === true) {
      props.updateDeliveryInformation(null);
      props.onCheckedItems(null);
      return;
    }
    props.onCheckedItems(selectedItem);
  };
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onHide();
    }
  };
  return (
    <div
      className={`modal__delivery-address ${props.show ? 'active' : ''}`}
      onClick={handleModalClick}
    >
      <div className="modal__content--form">
        <ButtonIcon
          className="modal__btn--close"
          label={<CgClose />}
          border="none"
          onClick={props.onHide}
        />
        <article id="profile-shipping-addres" className="section__content">
          <div className="section__title">
            <h2 className="headline-small">Địa chỉ nhận hàng</h2>
          </div>
          <hr className="hr-title" />

          <ul className="shipping-list">
            {notAddresses && (
              <div className="no-data">
                <p className="body-large">Không có địa chỉ giao hàng được tìm thấy</p>
                <img src={notFound} alt="Not found" />
              </div>
            )}
            {addresses.map((add, index) => (
              <React.Fragment key={add._id}>
                <li>
                  {selectedOption === index ? (
                    <MdOutlineRadioButtonChecked
                      className="icon__radio"
                      onClick={() => handleClick(add, index)}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <MdOutlineRadioButtonUnchecked
                      className="icon__radio"
                      onClick={() => handleClick(add, index)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                  <div className="shipping-item__wrapper">
                    <div
                      className="shipping-info"
                      onClick={() => handleClick(add, index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="shipping-number-default">
                        <p className="title-medium">{add.loca_pers_name}</p>
                        <hr style={{ borderWidth: '24px', width: '1px', margin: '0' }} />
                        <p className="body-medium">SĐT: {add.loca_pers_phone}</p>
                        {add.is_default && (
                          <span className="default-label label-large">Mặc định</span>
                        )}
                      </div>
                      <p className="bank-name body-medium">
                        {add.loca_address}
                        {add.loca_detail !== '' ? ` - ${add.loca_detail}` : ''}
                      </p>
                    </div>

                    <div className="shipping-btn">
                      <div className="edit-delete-btn">
                        <ButtonIcon
                          className="bank-item__btn--del"
                          label={<MdDeleteOutline style={{ color: '#785B5B' }} />}
                          type="button"
                          border="none"
                          backgroundColor="#F2E5E4"
                          onClick={() => handleDeletedAddress(add._id)}
                        />
                        <DelAddress
                          show={isOpenDelete}
                          onHide={() => setIsOpenDelete(false)}
                          id={selectedAddressId}
                          // addresses={addresses}
                          onSuccess={onSuccessDel}
                          userId={id}
                        />
                        <ButtonIcon
                          className="shipping-btn--edit"
                          label={
                            <>
                              <MdEdit style={{ color: '#785B5B' }} />
                              <span style={{ color: '#785B5B' }}> Sửa</span>
                            </>
                          }
                          type="button"
                          width="91px"
                          height="40px"
                          backgroundColor="transparent"
                          onClick={() => handleEditedAddress(add)}
                        />
                        <EditAddress
                          show={isOpenEdit}
                          onHide={() => setIsOpenEdit(false)}
                          data={selectedEditAdress}
                          onSuccess={onSuccess}
                        />
                      </div>
                      <Button1
                        backgroundColor={add.is_default ? '#1D1B201F' : '#785B5B'}
                        labelColor={add.is_default ? 'rgba(32, 26, 26, 0.38)' : '#F1EFE7'}
                        border="none"
                        className="set-default-btn label-large"
                        label="Thiết lập mặc định"
                        type="button"
                        onClick={() => handleSetDefault(add, add._id, id)}
                      />
                    </div>
                  </div>

                  {/* {index < addresses.length - 1 && <hr />} */}
                </li>
                <hr />
              </React.Fragment>
            ))}
          </ul>
          <div className="btn__wrapper btn__wrapper1">
            <ButtonIcon
              className="section__btn"
              border="none"
              label={<GrAdd />}
              type="button"
              onClick={() => setIsOpenAdd(true)}
            />
            {isOpenAdd && (
              <AddAddress onHide={() => setIsOpenAdd(false)} id={id} onSuccess={onSuccess} />
            )}
            <div className="btn__cancel-submit">
              <Button1 label="Hủy bỏ" type="button" onClick={props.onHide} className="col-6" />
              <Button1
                label="Tiếp tục"
                type="button"
                className="col-6"
                labelColor="#F1EFE7"
                backgroundColor="#785B5B"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
export default ModalDeliveryAddress;
