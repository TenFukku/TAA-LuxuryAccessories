import CartBill from 'components/Carts/CartBill';
import CartItem from 'components/Carts/CartItem';
import { Col, Container, Row } from 'react-bootstrap';
import 'style/pages/Cart/Cart.scss';
import React, { useEffect, useState } from 'react';
import { useGetUserCart } from 'hooks/useGetUserCart';
import { useAsyncValue } from 'react-router-dom';
import axios from 'axios';
import notFound from 'assets/image/account/no-data.jpg';
import { useAuthContext } from 'hooks/useAuthContext';
import { MdProductionQuantityLimits } from 'react-icons/md';

function Cart(props) {
  const { getCartQuantity } = useAuthContext();
  const [checkedItemsInfo, setCheckedItemsInfo] = useState([]);
  const [temporaryAmount, setTemporaryAmount] = useState(0);
  let discountAmount;
  if (temporaryAmount > 0) {
    discountAmount = 5000 * checkedItemsInfo.length;
    if (discountAmount > 50000) discountAmount = 50000;
  } else {
    discountAmount = 0;
  }
  const totalAmount = temporaryAmount - discountAmount;
  const [cartItems1, setCartItems] = useState([]);
  const [notProduct, setNotProduct] = useState(false);

  const handleCheckedItemsChange = (checkedItemsInfo) => {
    setCheckedItemsInfo(checkedItemsInfo);
  };
  console.log(checkedItemsInfo);
  const userID = (localStorage.getItem('user'))
  ? JSON.parse(localStorage.getItem('user'))[0]._id
  : null;

console.log(userID);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!userID) {
          console.log('no userId');
          const cartData = JSON.parse(localStorage.getItem('cartNouser'));
          console.log(cartData)
          if (!cartData||cartData.length===0)
            setNotProduct(true)
          else {
            setNotProduct(false)
            const data = cartData.map((item) => {
              // const productObject = item.product.length > 0 ? item.product[0] : [];
              // console.log(productObject)
              return {
                ...item,
                product: createItem(item),
                _doc: { quantity: item.quantity, _id: item._id }
              };
            })
            setCartItems(data);
            return;
          }
        }

        const res = await axios.post('http://localhost:8000/cart/get', {
          user_id: userID,
        });
        if (res.status === 200) {
          if (Array.isArray(res.data) && res.data.length === 0) {
            setNotProduct(true);
          } else {
            setNotProduct(false);
            const data = res.data.map((item) => {
              const productObject = item.product.length > 0 ? item.product[0] : null;
              return {
                ...item,
                product: createItem(productObject),
              };
            });
            setCartItems(data);

            console.log('cartitm', data);
            return res.data;
          }
        } else if (res.status === 404) {
          alert('Cart is empty or user not found');
        } else {
          alert('Error fetching cart items');
        }
        // setCartItems(data.map(item => createItem(item)));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchItems();
  }, []);

  const createItem = (item) => {
    return {
      _id: item._id,
      imageUrl: item.prod_img[0],
      productName: item.prod_name,
      productSold: item.prod_num_avai,
      moneyCurrent: item.prod_cost.$numberDecimal * (1 - item.prod_discount.$numberDecimal),
      moneyBeforeDiscount: item.prod_cost.$numberDecimal,
    };
  };
  const handleDeleteCartItem = async (updatedCartItems) => {
    // Cập nhật danh sách cartItems sau khi xóa sản phẩm
    if (updatedCartItems.length === 0) {
      setNotProduct(true);
    }
    else
    setCartItems(updatedCartItems);
    getCartQuantity();
  };
  return (
    <Container className="cart" fluid id="cart">
      <Row className="cart__content">
        {notProduct ? (
          <div className="no-data body-large" style={{ textAlign: 'center' }}>
            <img
              src={notFound}
              alt="Not found"
              style={{
                width: '200px',
                height: 'auto',
              }}
            />
            <p>Oops! Giỏ hàng của bạn trống rỗng.</p>
            <p style={{ fontSize: '20px' }}>Hãy quay lại tìm sản phẩm cho mình bạn nhé ^^</p>
          </div>
        ) : (
          <React.Fragment>
            <Col xl={9} lg={9} md={12} className="cart__content__item">
              {/* Truyền danh sách các mục vào CartItem */}
                <CartItem
                  userID={userID}
                cartItems={cartItems1}
                setMoneyAll={setTemporaryAmount}
                onCheckedItemsChange={handleCheckedItemsChange}
                onDeleteCartItem={handleDeleteCartItem}
                // notProduct={notProduct}
              />
            </Col>
            <Col xl={3} lg={3} md={12} className="cart__content__bill">
              <CartBill
                temporaryAmount={temporaryAmount}
                discountAmount={discountAmount}
                totalAmount={totalAmount}
                checkedItemsInfo={checkedItemsInfo}
              />
            </Col>
          </React.Fragment>
        )}
      </Row>
    </Container>
  );
}

export default Cart;
