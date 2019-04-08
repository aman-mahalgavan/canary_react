import React from "react";
import Styles from "../../styles/_index";

function SocialInputComponent({
    icon,
    name,
    placeholder,
    value,
    error,
    onChange,
    type,
    disabled
}) {
    return (
        <Styles.SocialContainer>
            <Styles.StyledLabel htmlFor={name} color="red">{error ? error : ""}</Styles.StyledLabel>
            <Styles.FLX className="icon-input">

                <Styles.StyledIcon className={icon}></Styles.StyledIcon>



                <Styles.InputStyle
                    type={type}

                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />

            </Styles.FLX>
        </Styles.SocialContainer>
    );
}

export default SocialInputComponent;