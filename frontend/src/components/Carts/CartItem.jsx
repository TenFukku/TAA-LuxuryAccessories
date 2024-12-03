import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';
import { RiDeleteBin6Line } from 'react-icons/ri';
import 'style/components/Carts/CartItem.scss';
import axios from 'axios';
import { useDeleteCartItem } from 'hooks/useDeleteCartIem';
import { useAddToCart } from 'hooks/useAddToCart';
import DeleteCartItemPopup from 'components/Carts/DeleteCartItemPopup';
import { useNavigate } from 'react-router-dom';

// CartItem.propTypes = {
//   cartItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       imageUrl: PropTypes.string.isRequired,
//       productName: PropTypes.string.isRequired,
//       moneyCurrent: PropTypes.number.isRequired,
//       moneyBeforeDiscount: PropTypes.number,
//       _id:PropTypes.string.isRequired
//     }),
//   ).isRequired,
//   setMoneyAll: PropTypes.func.isRequired,
// };
CartItem.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        productSold: PropTypes.string.isRequired,
        moneyCurrent: PropTypes.number.isRequired,
        moneyBeforeDiscount: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string, // Vì "moneyBeforeDiscount" có thể là số hoặc chuỗi
        ]),
        _id: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  setMoneyAll: PropTypes.func.isRequired,
  onDeleteCartItem: PropTypes.func.isRequired,
};

function CartItem(props, id) {
  const {removeFromCartNoLogin, updateQuantityNoLogin} = useAddToCart()
  const navigate = useNavigate();
  props.cartItems.map((item) => {
    // console.log(item);
  });
  const user_id = (localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))[0]._id
    : null;
  const { deleteFromCart } = useDeleteCartItem();
  const [quantity, setQuantity] = useState(props.cartItems.map((item) => item._doc.quantity));

  const [checkedItems, setCheckedItems] = useState([]);
  const [allItemsChecked, setAllItemsChecked] = useState(false);
  // const [checkedItemsInfo, setCheckedItemsInfo] = useState([]);
  console.log('cartItem23231', props.cartItems);

  //handel delete cart items from
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const handleDeleteItem = async (productId) => {
    try {
      // Gọi hàm xóa sản phẩm từ hook useDeleteCartItem hoặc từ API trực tiếp
      if (!props.userID) {
        await removeFromCartNoLogin(productId)
      }
      else
      await deleteFromCart(productId);

      const updatedCartItems = props.cartItems.filter((item) => item._doc._id !== productId);
      props.onDeleteCartItem(updatedCartItems);
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDeleteClick = (itemId) => {
    console.log(itemId)
    setItemIdToDelete(itemId);
    setShowModal(true);
  };
  const handleConfirmDelete = () => {
    handleDeleteItem(itemIdToDelete);
    setShowModal(false);
  };
  useEffect(() => {
    // console.log(cartQuantity)
  }, [props.cartItems.length]);

  useEffect(() => {
    const initialCheckedItems = Array(props.cartItems.length).fill(false);
    setCheckedItems(initialCheckedItems);
    setQuantity(props.cartItems.map((item) => item._doc.quantity) || 1);
  }, [props.cartItems.length]);

  useEffect(() => {
    const allChecked = checkedItems.every((item) => item);
    setAllItemsChecked(allChecked);
  }, [checkedItems]);

  useEffect(() => {
    calculateTotalPrice();
    const checkedItemsInfo = [];

    checkedItems.forEach((item, i) => {
      if (item === true) {
        props.cartItems[i].product.number = quantity[i] || 1;
        checkedItemsInfo.push(props.cartItems[i].product); // Đưa đối tượng item vào mảng checkedItemsInfo
      }
    });
    // setCheckedItemsInfo(checkedItemsInfo);
    props.onCheckedItemsChange(checkedItemsInfo);
  }, [checkedItems, quantity]);

  const handleCheckboxClick = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const handleAllCheckboxClick = () => {
    setAllItemsChecked((prevState) => !prevState);
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = prevCheckedItems.map(() => !allItemsChecked);
      return newCheckedItems;
    });
  };

  const updateQuantityOnServer = async (index, newQuantity) => {
    try {
      const response = await axios.put('http://localhost:8000/cart/update-quantity', {
        product_id: props.cartItems[index].product._id,
        user_id: user_id, // Đây là user_id bạn nhận được từ phía back-end
        newQuantity: newQuantity,
      });

      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error updating quantity on server:', error);
    }
  };

  const handleChange = (event, index) => {
    let value = parseInt(event.target.value);
    if (value > parseInt(props.cartItems[index].product.productSold)) {
      value = parseInt(props.cartItems[index].product.productSold);
    } else if (value < 0) {
      value = 1;
    }
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity]; // Tạo một bản sao của mảng quantity
      newQuantity[index] = value; // Cập nhật giá trị mới cho phần tử có chỉ số là index
      return newQuantity;
    });
    if (!props.userID) {
      updateQuantityNoLogin(props.cartItems[index].product._id, quantity[index])
      return
    }
    else
    updateQuantityOnServer(index, quantity[index]);
  };

  const handleBlur = (event, index) => {
    if (quantity[index] === 0 || isNaN(quantity[index])) {
      setQuantity((prevQuantity) => {
        const newQuantity = [...prevQuantity];
        newQuantity[index] = 1; // Đặt lại giá trị thành 1 nếu giá trị là 0 hoặc không phải là một số
        return newQuantity;
      });
    }
    if (!props.userID) {
      updateQuantityNoLogin(props.cartItems[index].product._id, quantity[index])
      return
    }
    else
    updateQuantityOnServer(index, quantity[index]);
  };

  const handleIncreaseQuantity = (index) => {
    const productSold = parseInt(props.cartItems[index].product.productSold);

    // Kiểm tra xem giá trị hiện tại có nhỏ hơn giá trị productSold không
    if (quantity[index] < productSold) {
      setQuantity((prevQuantity) => {
        const updatedQuantity = [...prevQuantity];
        updatedQuantity[index] = (prevQuantity[index] || 0) + 1;
        if (!props.userID) {
          updateQuantityNoLogin(props.cartItems[index].product._id, updatedQuantity[index])
        }
        else
        updateQuantityOnServer(index, updatedQuantity[index]);
        return updatedQuantity;
      });
    }
  };


  const handleDecreaseQuantity = (index) => {
    if (quantity[index] && quantity[index] > 1) {
      setQuantity((prevQuantity) => {
        const updatedQuantity = [...prevQuantity];
        updatedQuantity[index] = prevQuantity[index] - 1;
        if (!props.userID) {
          updateQuantityNoLogin(props.cartItems[index].product._id, updatedQuantity[index])
        }
        else
        updateQuantityOnServer(index, updatedQuantity[index]);
        return updatedQuantity;
      });
    }
  };



  const calculateTotalPrice = () => {
    let totalPrice = 0;
    props.cartItems.forEach((item, index) => {
      if (checkedItems[index]) {
        totalPrice += calculateSubtotal(index);
      }
    });
    props.setMoneyAll(totalPrice);
    // props.calculateTotalPriceFunction(totalPrice); // Truyền totalPrice ra ngoài component
  };

  // Tính thành tiền của từng sản phẩm
  const calculateSubtotal = (index) => {
    return (quantity[index] || 1) * props.cartItems[index].product.moneyCurrent;
  };
  const formatPrice = (price) => {
    const priceNumber = parseFloat(price);
    let formattedPrice = priceNumber.toLocaleString('vi-VN', { maximumFractionDigits: 0 });
    return formattedPrice.trim();
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    // Thêm event listener để lắng nghe sự thay đổi kích thước của màn hình
    window.addEventListener('resize', handleResize);

    // Xóa event listener khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClickNameProduct = (index) => {
    navigate(`/products/${props.cartItems[index].product._id}`)
  }
  return isMobile ? (
    <Table borderless className="cart" size="sm" id="cart_resize">
      <thead className="cart__item__thead title-medium">
        <tr>
          <th>
            <div className="item__checkbox__all">
              {allItemsChecked ? (
                <ImCheckboxChecked className="check-box" onClick={handleAllCheckboxClick} />
              ) : (
                <ImCheckboxUnchecked className="check-box" onClick={handleAllCheckboxClick} />
              )}
            </div>
          </th>
          <th>Sản phẩm</th>
        </tr>
      </thead>
      <tbody className="cart__item__tbody body-large">
        {props.cartItems.map((item, index) => (
          <tr key={index} className={index === props.cartItems.length - 1 ? 'last__item' : ''}>
            <td className="item__checkbox">
              {checkedItems[index] ? (
                <ImCheckboxChecked
                  className="check-box"
                  onClick={() => handleCheckboxClick(index)}
                />
              ) : (
                <ImCheckboxUnchecked
                  className="check-box"
                  onClick={() => handleCheckboxClick(index)}
                />
              )}
            </td>
            <td>
              <div className="info__product">
                <div className="img__product">
                  <img src={item.product.imageUrl} alt={item.product.productName} />
                </div>
                <div className="info__product--responsive">
                  <div className="name__product" onClick={() => handleClickNameProduct(index)}>
                    <p>{item.product.productName}</p>
                  </div>
                  <div className="item__total__money">
                    {/* {formatPrice(calculateSubtotal(index))} đ */}
                    {(quantity[index] || 1) * item.product.moneyCurrent} đ
                  </div>
                  <div className="item__number">
                    <div
                      className="item__number__decrease"
                      onClick={() => handleDecreaseQuantity(index)}
                    >
                      -
                    </div>
                    <label for="number__product__cart" hidden>Số lượng sản phẩm</label>
                    <input
                      id="number__product__cart"
                      type="number"
                      min="1"
                      max={item.product.productSold}
                      step="1"
                      value={quantity[index].toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: false })}
                      className="item__number__product"
                      onChange={(event) => handleChange(event, index)}
                      onBlur={(event) => handleBlur(event, index)}
                    />
                    <div
                      className="item__number__increase"
                      onClick={() => handleIncreaseQuantity(index)}
                    >
                      +
                    </div>
                  </div>
                  <div className="delete__product__cart">
                    <div className="item__delete__product">
                      <RiDeleteBin6Line
                        className="icon__delete primary-text"
                        // method="delete"
                        onClick={() => handleDeleteClick(item?._doc?._id)}
                      />
                      <DeleteCartItemPopup showModal={showModal} onClose={() => setShowModal(false)} onConfirmDelete={handleConfirmDelete} />
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <Table borderless responsive="sm" className="table__cart__item" size="sm">
      <thead className="cart__item__thead title-medium">
        <tr>
          <th>
            <div className="item__checkbox__all">
              {allItemsChecked ? (
                <ImCheckboxChecked className="check-box" onClick={handleAllCheckboxClick} />
              ) : (
                <ImCheckboxUnchecked className="check-box" onClick={handleAllCheckboxClick} />
              )}
            </div>
          </th>
          <th>Sản phẩm</th>
          <th>Giá tiền</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="cart__item__tbody body-large">
        {props.cartItems.map((item, index) => (
          <tr key={index} className={index === props.cartItems.length - 1 ? 'last__item' : ''}>
            <td className="item__checkbox">
              {checkedItems[index] ? (
                <ImCheckboxChecked
                  className="check-box"
                  onClick={() => handleCheckboxClick(index)}
                />
              ) : (
                <ImCheckboxUnchecked
                  className="check-box"
                  onClick={() => handleCheckboxClick(index)}
                />
              )}
            </td>
            <td>
              <div className="info__product">
                <div className="img__product">
                  <img src={item.product.imageUrl} alt={item.product.productName} />
                </div>
                <div className="name__product" onClick={() => handleClickNameProduct(index)}>
                  <p>{item.product.productName}</p>
                </div>
              </div>
            </td>
            <td>
              <div
                className={
                  item.product.moneyBeforeDiscount
                    ? 'item__money__product have__discount'
                    : 'item__money__product'
                }
              >
                <span className="money__current">{formatPrice(item.product.moneyCurrent)} đ</span>
                {item.product.moneyBeforeDiscount && (
                  <span className="money__befor__discount primary-text">
                    {formatPrice(item.product.moneyBeforeDiscount)} đ
                  </span>
                )}
              </div>
            </td>
            <td>
              <div className="item__number">
                <div
                  className="item__number__decrease"
                  onClick={() => handleDecreaseQuantity(index)}
                >
                  -
                </div>
                <label for="number__product__cart-mobile" hidden>Số lượng sản phẩm</label>
                <input
                  id="number__product__cart-mobile"
                  type="number"
                  min="1"
                  max={item.product.productSold}
                  step="1"
                  value={quantity[index]?.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: false })}
                  className="item__number__product"
                  onChange={(event) => handleChange(event, index)}
                  onBlur={(event) => handleBlur(event, index)}
                />
                <div
                  className="item__number__increase"
                  onClick={() => handleIncreaseQuantity(index)}
                >
                  +
                </div>
              </div>
            </td>
            <td>
              <div className="item__total__money">
                {formatPrice(calculateSubtotal(index))} đ
                {/* {(quantity[index] || 1) * item.product.moneyCurrent} đ */}
              </div>
            </td>
            <td>
              <div className="item__delete__product">
                <RiDeleteBin6Line
                  className="icon__delete primary-text"
                  // method="delete"
                  onClick={() => handleDeleteClick(item?._doc?._id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <DeleteCartItemPopup showModal={showModal} onClose={() => setShowModal(false)} onConfirmDelete={handleConfirmDelete} />
    </Table>
  );


}

export default CartItem;
