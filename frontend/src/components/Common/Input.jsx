import React from 'react';

const styles = {
    height: '3.5rem',
    borderRadius: '.75rem',
    width: '100%',
    // border: '1px solid var(--md-sys-color-outline)',
    border: 'none',
    padding: '0 0rem',
    backgroundColor: 'transparent',
    outline: 'none'
      
}


const Input = (props) => {
    return (
            <input 
            className={props.className}
            style={styles} 
            type='email'
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            />
    );
};

export default Input;