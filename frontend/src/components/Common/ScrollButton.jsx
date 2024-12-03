import React, { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
// import { Button } from 'hooks/useScrollButton.js';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour 
		in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <button
      style={{
        border: 'none',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#785b5b',
        color: 'white',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '999',
        display: visible ? 'inline' : 'none',
      }}
      onClick={scrollToTop}
    >
      <FaChevronUp />
    </button>
  );
};

export default ScrollButton;
