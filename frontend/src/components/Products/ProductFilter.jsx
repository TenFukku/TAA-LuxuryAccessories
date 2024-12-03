import Button from 'components/Common/Button1';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { BsCheck2 } from 'react-icons/bs';
import 'style/components/Products/ProductFilter.scss';

ProductFilter.propTypes = {
    applyFilter: PropTypes.func.isRequired,
};

function ProductFilter(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedButtons, setSelectedButtons] = useState([]);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDropdownSelect = (eventKey, event) => {
        setSelectedOption(eventKey);
        setShowDropdown(false);
        props.applyFilter({ sortBy: eventKey, filterBy: selectedButtons });
    };

    const handleButtonClick = (buttonName) => {
        let updatedButtons = [...selectedButtons];
        const isButtonSelected = selectedButtons.includes(buttonName);

        if (isButtonSelected) {
            updatedButtons = updatedButtons.filter(btn => btn !== buttonName);
        } else {
            updatedButtons.push(buttonName);
        }

        if (updatedButtons.includes("Giảm giá")) {
            props.applyFilter({ sortBy: selectedOption || '0', filterBy: [] });
        }
        console.log(updatedButtons)
        props.applyFilter({ sortBy: selectedOption || '0', filterBy: updatedButtons });
        console.log(updatedButtons)

        setSelectedButtons(updatedButtons);
    };

    let dropdownTitle = 'Giá';
    if (selectedOption === '1') {
        dropdownTitle = 'Từ thấp đến cao';
    } else if (selectedOption === '2') {
        dropdownTitle = 'Từ cao đến thấp';
    }

    return (
        <Row>
            <Col className="product__filter body-large on-surface-text">
                <span>Sắp xếp theo: </span>
                <Button
                    className={"product__button"}
                    label="Giảm giá"
                    onClick={() => handleButtonClick("Giảm giá")}
                    icon={selectedButtons.includes("Giảm giá") ? BsCheck2 : null}
                    iconHeight="24px"
                    iconWidth="24px"
                    backgroundColor={`${selectedButtons.includes("Giảm giá") ? '#ffdad9' : 'white'}`}
                    border={`${selectedButtons.includes("Giảm giá") ? 'none' : ''}`}
                />
                <Button
                    className={"product__button"}
                    label="Bán chạy nhất"
                    onClick={() => handleButtonClick("Bán chạy nhất")}
                    icon={selectedButtons.includes("Bán chạy nhất") ? BsCheck2 : null}
                    iconHeight="24px"
                    iconWidth="24px"
                    backgroundColor={`${selectedButtons.includes("Bán chạy nhất") ? '#ffdad9' : 'white'}`}
                    border={`${selectedButtons.includes("Bán chạy nhất") ? 'none' : ''}`}
                />
                <DropdownButton
                    title={dropdownTitle}
                    id="dropdown-menu-align-right"
                    show={showDropdown}
                    onSelect={handleDropdownSelect}
                    onToggle={handleDropdownToggle}
                    className="dropdown__product"
                >
                    <Dropdown.Item eventKey="1" >Từ thấp đến cao</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Từ cao đến thấp</Dropdown.Item>
                </DropdownButton>
            </Col>
        </Row>
    );
}

export default ProductFilter;
