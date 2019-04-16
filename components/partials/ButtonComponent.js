import React from 'react';
import Styles from "../../styles/_index";

export default function ButtonComponent(props) {
    let { bg, color, type, width, loading, value, onClick, disabled, style, border, bs } = props;
    return (
        <Styles.ButtonStyle
            bg={bg}
            color={color}
            type={type}
            width={width}
            onClick={onClick}
            disabled={disabled}
            style={style}
            border={border}
            bs={bs}>
            {loading ? (<i className="fas fa-cog fa-spin"></i>) : value}
        </Styles.ButtonStyle>
    )
}
