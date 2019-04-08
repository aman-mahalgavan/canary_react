import React from "react";
import Styles from "../../styles/_index";

function TextAreaInputComponent({

    name,
    placeholder,
    value,
    error,
    onChange,
    disabled
}) {
    return (
        <div className="form-group">
            <Styles.StyledLabel htmlFor={name} color="red">{error ? error : ""}</Styles.StyledLabel>
            <Styles.TextAreaInputStyle


                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />

        </div>
    );
}

export default TextAreaInputComponent;