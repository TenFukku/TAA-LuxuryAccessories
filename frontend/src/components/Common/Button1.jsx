const Button = ({ className, label, type, backgroundColor, labelColor, fontSize, border, onClick, icon: Icon, iconWidth, iconHeight }) => {
    const buttonStyle = {
        minWidth: '8rem',
        borderRadius: '8px',
        padding: '0',
        backgroundColor: backgroundColor || 'transparent',
        fontFamily: 'Roboto',
        fontSize: fontSize || '14px',
        border: border || '1px solid #857373',
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        whiteSpace: "nowrap",
    }

    const spanStyle = {
        color: labelColor || '#785B5B',
        borderRadius: 'inherit',
        minHeight: '40px',
        padding: '0 2rem',
        lineHeight: '40px',
    };
    if (Icon) {
        // Khi có icon, thiết lập paddingLeft của spanStyle là 16px
        spanStyle.paddingLeft = '16px';
    } else {
        spanStyle.paddingLeft = '24px';
    }
    const iconStyle = {
        width: iconWidth || 'auto',
        height: iconHeight || 'auto',
        marginRight: '5px',
    };

    return (
        <button className={className} type={type} style={buttonStyle} onClick={onClick}>
            <span style={spanStyle}>
                {Icon && <Icon style={iconStyle} />} {label}
            </span>
        </button>
    );
};

export default Button;