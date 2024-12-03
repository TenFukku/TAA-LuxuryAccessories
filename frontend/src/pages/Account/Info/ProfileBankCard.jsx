import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ButtonIcon from 'components/Common/ButtonIcon';
import Button1 from 'components/Common/Button1';
import { GrAdd } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';
import AddBank from '../Modal/modal--add-bank';
import ConfirmBank from '../Modal/modal--confirm-bank';
import ConfirmPhone from '../Modal/modal--confirm-phone';
import AddSuccess from '../Modal/modal--add-success';
import DelBank from '../Modal/modal--del-bank';
import notFound from '../../../assets/image/account/no-data.jpg';
function ProfileBankCard() {
  const defaultUser = JSON.parse(localStorage.getItem('user'));
  const defaultUserData = defaultUser[0]
  const id = defaultUserData._id;
  const [bankCards, setBankCards] = useState([]);
  const [notBankCard, setNotBankCard] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/account/bank-cards/${id}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length === 0) setNotBankCard(true);
        setBankCards(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // Sử dụng mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi render đầu tiên
  const onSuccess = () => {
    axios
      .get(`http://localhost:8000/api/account/bank-cards/${id}`)
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data) && response.data.length === 0) setNotBankCard(true);
        else setNotBankCard(false);
        setBankCards(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleSetDefault = (bankCard, bankCardId, userId) => {
    axios
      .put(`http://localhost:8000/api/account/bank-default/${bankCardId}`, { id: userId })
      .then((response) => {
        setBankCards(
          bankCards.map((bank) => {
            if (bank === bankCard) {
              bank.is_default = true;
            } else {
              bank.is_default = false;
            }
            return bank;
          }),
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  // Hàm để che dấu số tài khoản, chỉ hiển thị 4 số cuối
  const maskBankNumber = (bankNumber) => {
    const masked = bankNumber.substring(0, bankNumber.length - 4).replace(/\d/g, '*');
    const lastFourDigits = bankNumber.substring(bankNumber.length - 4);
    return masked + lastFourDigits;
  };
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [dataFromModal1, setDataFromModal1] = useState(null);
  const [dataFromModal2, setDataFromModal2] = useState(null);

  const handleOpenModal1 = () => {
    setShowModal1(true);
  };

  const handleOpenModal2 = (data) => {
    setDataFromModal1(data);
    setShowModal2(true);
  };

  const handleOpenModal3 = (data) => {
    setDataFromModal2(data);
    setShowModal3(true);
  };
  const [selectedBankCardId, setSelectedBankCardId] = useState('');
  const handleDeletedBankCard = (id) => {
    setSelectedBankCardId(id);
    setIsOpenDelete(true);
  };

  return (
    <article id="profile-bank-card" className="section__content visible">
      <div className="section__title">
        <h2 className="headline-small">Tài khoản ngân hàng</h2>
        <ButtonIcon
          className="section__btn"
          border="none"
          label={<GrAdd />}
          type="button"
          onClick={handleOpenModal1}
        />
        {showModal1 && (
          <AddBank
            show={showModal1}
            onClose={() => setShowModal1(false)}
            onDataToModal2={handleOpenModal2}
            id={id}
            onSuccess={onSuccess}
          />
        )}
        {showModal2 && (
          <ConfirmBank
            onClose={() => setShowModal2(false)}
            onDataToModal3={handleOpenModal3} // Truyền hàm xử lý mở Modal 3
            dataFromModal1={dataFromModal1} // Truyền dữ liệu từ Modal 1 cho Modal 2
          />
        )}
        {showModal3 && (
          <ConfirmPhone
            onClose={() => setShowModal3(false)}
            dataFromModal2={dataFromModal2}
            id={id} // Truyền dữ liệu từ Modal 2 cho Modal 3
          />
        )}
        {showModal4 && <AddSuccess onClose={() => setShowModal4(false)} />}
      </div>
      <hr className="hr-title" />
      <ul className="accounts-list">
        {notBankCard && (
          <div className="no-data">
            <p className="body-large">Không có tài khoản thanh toán được tìm thấy</p>
            <img src={notFound} alt="Not found" />
          </div>
        )}
        {bankCards.map((bankCard, index) => (
          <React.Fragment key={bankCard._id}>
            <li>
              <div className="account-item__wrapper">
                <div className="account-info">
                  <div className="account-number-default">
                    <p className="body-large">STK:</p>
                    <p className="body-large">{maskBankNumber(bankCard.bank_number)} </p>
                    {bankCard.is_default && (
                      <span className="default-label label-large">Mặc định</span>
                    )}
                  </div>
                  <p className="bank-name body-large">Ngân hàng {bankCard.bank_name}</p>
                </div>

                <div className="bank-btn">
                  <Button1
                    backgroundColor={bankCard.is_default ? '#1D1B201F' : '#785B5B'}
                    labelColor={bankCard.is_default ? 'rgba(32, 26, 26, 0.38)' : '#F1EFE7'}
                    border="none"
                    className="set-default-btn label-large"
                    label="Thiết lập mặc định"
                    type="button"
                    onClick={() => handleSetDefault(bankCard, bankCard._id, id)}
                  />
                  <ButtonIcon
                    className="bank-item__btn--del"
                    label={<MdDeleteOutline style={{ color: '#785B5B' }} />}
                    type="button"
                    border="none"
                    backgroundColor="#F2E5E4"
                    onClick={() => handleDeletedBankCard(bankCard._id)}
                  />
                  <DelBank
                    show={isOpenDelete}
                    onHide={() => setIsOpenDelete(false)}
                    id={selectedBankCardId}
                    onSuccess={onSuccess}
                    notBankCard={notBankCard}
                    userId={id}
                  />
                </div>
              </div>
            </li>
            {index < bankCards.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </ul>
    </article>
  );
}
export default ProfileBankCard;
