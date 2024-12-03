import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ButtonIcon from 'components/Common/ButtonIcon';
import { GrAdd } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import Button1 from 'components/Common/Button1';
import AddAddress from '../Modal/modal--add-address';
import DelAddress from '../Modal/modal--del-address';
import EditAddress from '../Modal/modal--edit-address';
import notFound from '../../../assets/image/account/no-data.jpg';
import AddSuccess from '../Modal/modal--add-success';

function ProfileShippingAddress() {
  const defaultUser = JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):null;
  const defaultUserData = defaultUser?defaultUser[0]:null
  const id = defaultUserData?defaultUserData._id:null;
  const [addresses, setAddresses] = useState([]);
  const [notAddresses, setNotAddress] = useState(false);
  useEffect(() => {
    if (!defaultUser)
    {
      JSON.parse(localStorage.getItem('addressNouser')) && setNotAddress(true)
      setAddresses(JSON.parse(localStorage.getItem('addressNouser')))
      return
      }
    axios
      .get(`http://localhost:8000/api/account/shipping-addresses/${id}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length === 0) setNotAddress(true);
        setAddresses(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  const onSuccess = () => {
    axios
      .get(`http://localhost:8000/api/account/shipping-addresses/${id}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length === 0) setNotAddress(true);
        else setNotAddress(false);
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

  const [selectedAddressId, setSelectedAddressId] = useState('');
  const handleDeletedAddress = (id) => {
    setSelectedAddressId(id);
    setIsOpenDelete(true);
  };
  const [selectedEditAdress, setSelectedEditAdress] = useState('');
  const handleEditedAddress = (add) => {
    setSelectedEditAdress(add);
    setIsOpenEdit(true);
  };
  return (
    <article id="profile-shipping-addres" className="section__content visible">
      <div className="section__title">
        <h2 className="headline-small">Địa chỉ nhận hàng</h2>
        <ButtonIcon
          className="section__btn"
          border="none"
          label={<GrAdd />}
          type="button"
          onClick={() => setIsOpenAdd(true)}
        />
        {isOpenAdd && (
          <AddAddress
            onHide={() => setIsOpenAdd(false)}
            id={id}
            onSuccess={onSuccess}
          />)}
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
              <div className="shipping-item__wrapper">
                <div className="shipping-info">
                  <div className="shipping-number-default">
                    <p className="title-medium">{add.loca_pers_name}</p>
                    <hr style={{ borderWidth: '24px', width: '1px', margin: '0' }} />
                    <p className="body-medium">SĐT: {add.loca_pers_phone}</p>
                    {add.is_default && <span className="default-label label-large">Mặc định</span>}
                  </div>
                  <p className="bank-name body-medium">{add.loca_address}{add.loca_detail !== "" ? ` - ${add.loca_detail}` : ""}</p>
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
                      onSuccess={onSuccess}
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
            </li>
            {index < addresses.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </ul>
    </article>
  );
}

export default ProfileShippingAddress;
