import notLogin from 'assets/image/products/no-login.png';
import { Modal } from 'react-bootstrap';
import Button from 'components/Common/Button1';
import 'style/components/Products/PopupNotiLogin.scss';
import { useNavigate } from 'react-router-dom';
PopupNotiLogin.propTypes = {

};

function PopupNotiLogin(props) {
    const navigate = useNavigate();

    const handleNotiLogin = () => {
        navigate("/log_in");
    };
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='popup__noti noti__login'
        >
            <Modal.Header closeButton className='noti__login__header'>

            </Modal.Header>
            <Modal.Body className="noti__login__body">
                <img src={notLogin} alt='no-login'></img>
                <p className='title-medium primary-text'>
                    {props.content}
                </p>
                <div className="noti__button">
                    <Button
                        label="Đăng nhập"
                        labelColor="#f1efe7"
                        backgroundColor="#785b5b"
                        onClick={handleNotiLogin}
                    />
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
            </Modal.Footer> */}
        </Modal>
    );
}

export default PopupNotiLogin;