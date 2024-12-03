import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'components/Common/Button1';
import "style/components/Orders/DeliveryInformation.scss"
import { MdEdit } from 'react-icons/md';
import EditAddress from '../../pages/Account/Modal/modal--edit-address';
import notFound from 'assets/image/account/no-data.jpg';
import AddAddress from 'pages/Account/Modal/modal--add-address';
import "pages/Account/index.scss"
import ModalDeliveryAddress from './Modal--DeliveryAddress';
import axios from 'axios';
// DeliveryInformation.propTypes = {
//     deliveryInformation: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         phoneNumber: PropTypes.string.isRequired,
//         address: PropTypes.string.isRequired,
//     }).isRequired,
// };

function DeliveryInformation(props) {
    // const { name, phoneNumber, address } = props.deliveryInformation;
    // const hiddenPhoneNumber = props.deliveryInformation.loca_pers_phone.replace(/.(?=.{3})/g, "*");
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const defaultUser = JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):null;
    const defaultUserData = defaultUser?defaultUser[0]:null
    const id = defaultUserData?defaultUserData._id:null;
    const [isModalDeliveryAddress, setIsModalDeliveryAddress] = useState(false);
    const [selectedItems, setSelectedItems] = useState(null);
    const [isUser, setIsUser] = useState(true)

    console.log('selectitemss', selectedItems)
    console.log(props.deliveryInformation)
    useEffect(() => {
        if (!defaultUser)
        {
            setIsUser(false)
            JSON.parse(localStorage.getItem('addressNouser'))?setSelectedItems(JSON.parse(localStorage.getItem('addressNouser'))):setSelectedItems(null)
            return
            }
        axios
            .get(`http://localhost:8000/api/account/shipping-addresses/${props.id}`)
            .then((response) => {
                const addressDefault = response.data.find((item) => {
                    return item.is_default === true;
                });
                setSelectedItems(addressDefault)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    const handleCheckedItems = (item) => {
        setSelectedItems(item);
    };

    const onSuccessAddAddress = () => {
        if (!props.id)
        {
            props.updateDeliveryInformation(JSON.parse(localStorage.getItem('addressNouser')))
            setSelectedItems(JSON.parse(localStorage.getItem('addressNouser')))
            return
            }

        axios
            .get(`http://localhost:8000/api/account/shipping-addresses/${props.id}`)
            .then((response) => {
                const addressDefault = response.data.find((item) => {
                    return item.is_default === true;
                });
                props.updateDeliveryInformation(addressDefault)
                setSelectedItems(addressDefault)

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const updateDeliveryInformation = (item) => {
        props.updateDeliveryInformation(item)
    }

    const handleOnHide = () => {
        axios
            .get(`http://localhost:8000/api/account/shipping-addresses/${props.id}`)
            .then((response) => {
                console.log(response.data);
                const addressAfterDel = response.data.find((item) => {
                    return item._id === selectedItems._id;
                });
                const addressDefault = response.data.find((item) => {
                    return item.is_default === true;
                });
                const addressDefaultIndex = response.data.findIndex((item) => {
                    return item.is_default === true;
                });
                if (!addressAfterDel) {
                    if (!addressDefault) {
                        console.log('k co defalut')
                        updateDeliveryInformation(null)
                        setSelectedItems(null)
                        setIsModalDeliveryAddress(false)
                    }
                    else {
                        console.log('co dèal')
                        setIsModalDeliveryAddress(false)
                        setSelectedItems('Bạn chưa chọn địa chỉ giao hàng phù hợp')
                    }

                }
                setIsModalDeliveryAddress(false)

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    console.log(props.deliveryInformation)
    useEffect(() => {
        props.selectedAddressInfo(selectedItems)
    }, [selectedItems])
    const handleClickChangeButton = ()=>{
        if (!props.id) {
            setIsOpenEdit(true)
            return
        }
        setIsModalDeliveryAddress(true)
    }
    return (
        <div className="delivery__info">
            <div className="delivery__info__title title-large">1. Thông tin nhận hàng</div>
            {selectedItems === 'Bạn chưa chọn địa chỉ giao hàng phù hợp' && (
                <div className="delivery__info__location" style={{alignItems:"center"}}>
                <div className="location__detail" style={{paddingBottom:"0"}}>   
                    <p className='body-large' style={{marginBottom:"0"}}>Bạn chưa chọn địa chỉ giao hàng phù hợp!</p>
                </div>
                <div className="location__button">
                    <Button
                        label="Thay đổi"
                        type="submit"
                        labelColor="#785B5B"
                        onClick={handleClickChangeButton}
                        />
                    {isModalDeliveryAddress && (
                        <ModalDeliveryAddress
                            show={isModalDeliveryAddress}
                            onHide={handleOnHide}
                            onHideSubmit={() => setIsModalDeliveryAddress(false)}
                            onCheckedItems={handleCheckedItems}
                            idAddress={selectedItems && Object.keys(selectedItems).length === 0 ? props.deliveryInformation._id : selectedItems._id}
                            updateDeliveryInformation={updateDeliveryInformation}
                        />)}
                    </div>
                    </div>
            )}

            {selectedItems !== 'Bạn chưa chọn địa chỉ giao hàng phù hợp' &&
                (!props.deliveryInformation ? (
                    <div className="delivery__info__location">
                        <div className="no-data">
                            <img src={notFound} alt="Not found" />
                            <p className="body-large">Bạn chưa có địa chỉ giao hàng, hãy thêm địa chỉ để đặt hàng!!!</p>
                        </div>
                        <div className="location__button">
                            <Button
                                label="Thêm địa chỉ"
                                type="submit"
                                labelColor="#785B5B"
                                onClick={() => setIsOpenAdd(true)} />

                            {isOpenAdd && (

                                <AddAddress
                                    onHide={() => setIsOpenAdd(false)}
                                    id={id}
                                    onSuccess={onSuccessAddAddress}
                                />

                            )

                            }

                        </div>
                    </div>

                ) : (<div className="delivery__info__location">
                    <div className="location__detail">
                        <div className="detail__name__phone">
                            <div className="person__name title-medium">
                                {selectedItems && Object.keys(selectedItems).length === 0
                                    ? props.deliveryInformation.loca_pers_name
                                    : selectedItems.loca_pers_name}
                            </div>
                            <hr className='hr-line'/>
                            <div className="person__phone body-large">{selectedItems && Object.keys(selectedItems).length === 0
                                ? props.deliveryInformation.loca_pers_phone
                                : selectedItems.loca_pers_phone}</div>
                            {(selectedItems && Object.keys(selectedItems).length === 0
                                ? props.deliveryInformation.is_default
                                : selectedItems.is_default) &&
                                <div className="label__default body-medium">Mặc định</div>}

                        </div>
                        <div className="detail__address body-large">
                            {selectedItems && Object.keys(selectedItems).length === 0
                                ? props.deliveryInformation.loca_address : selectedItems.loca_address}
                            {selectedItems && Object.keys(selectedItems).length === 0
                                ? props.deliveryInformation.loca_detail !== "" ? ` - ${props.deliveryInformation.loca_detail}` : ""
                                : selectedItems.loca_detail !== "" ? ` - ${selectedItems.loca_detail}` : ""}
                        </div>
                    </div>
                    <div className="location__button">
                        <Button
                            label="Thay đổi"
                            type="submit"
                            labelColor="#785B5B"
                            onClick={handleClickChangeButton}
                        />
                        {
                            isOpenEdit && (
                                <EditAddress
                                    show={isOpenEdit}
                                    onHide={() => setIsOpenEdit(false)}
                                    onSuccess={onSuccessAddAddress}
                                    data={selectedItems}
                                />
                            )
                        }
                        {isModalDeliveryAddress && (
                            <ModalDeliveryAddress
                                show={isModalDeliveryAddress}
                                onHide={handleOnHide}
                                onHideSubmit={() => setIsModalDeliveryAddress(false)}
                                onCheckedItems={handleCheckedItems}
                                idAddress={selectedItems && Object.keys(selectedItems).length === 0 ? props.deliveryInformation._id : selectedItems._id}
                                updateDeliveryInformation={updateDeliveryInformation}
                            />)}
                    </div>

                </div>)
                )
            }

            
        </div>

    );
}

export default DeliveryInformation;