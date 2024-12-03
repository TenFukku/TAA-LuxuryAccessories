import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            navigate(`/search?keyword=${searchTerm}`);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Nếu phím nhấn là Enter, thực hiện tìm kiếm
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress} // Xử lý sự kiện nhấn phím
            />
            <FiSearch stroke='white' className="search-icon" onClick={handleSearch} />
        </div>
    );
};

export default SearchBar;
