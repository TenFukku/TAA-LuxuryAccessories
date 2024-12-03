import React from "react";
import MainLogo from 'assets/image/logo.svg'

const logoStyle = {
    height: '100%',
    aspectRatio: '2 / 1',
}

function Logo() {
    return (
        <img className="header__logo" src={MainLogo} alt="TAA logo" style={logoStyle}></img>
    )
}

export default Logo;