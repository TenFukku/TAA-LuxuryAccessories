import React, { useState } from "react";
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import "style/components/Orders/DeliveryMethod.scss";

function DeliveryMethod(props) {
    const [selectedOption, setSelectedOption] = useState(null);

    // Hàm xử lý sự kiện khi click vào một nút
    const handleClick = (index) => {
        // Nếu nút đã được chọn, không làm gì cả
        if (index === selectedOption) {
            return;
        }
        // Nếu không, cập nhật trạng thái của nút mới được chọn
        setSelectedOption(index);
        props.handleDeliveryFee(index===0 ? 30000 : 0)
        props.onDeliveryMethodChange(index);
    };

    return (
        <div className="delivery__method">
            <div className="delivery__method__title title-large">2. Phương thức vận chuyển</div>
            <div className="delivery__method__one body-large" onClick={() => handleClick(0)}>
                <div className="radio__check">
                    {selectedOption === 0 ? <MdOutlineRadioButtonChecked className="icon__radio" /> : <MdOutlineRadioButtonUnchecked className="icon__radio" />}
                </div>
                <span>Giao hàng nhanh trong 2 giờ (Trễ tặng 100k)</span>
            </div>
            <div className="delivery__method__two body-large" onClick={() => handleClick(1)}>
                <div className="radio__check">
                    {selectedOption === 1 ? <MdOutlineRadioButtonChecked className="icon__radio" /> : <MdOutlineRadioButtonUnchecked className="icon__radio" />}
                </div>
                <span>Giao hàng trong 72 giờ</span>
            </div>
        </div>
    );
}

export default DeliveryMethod;
