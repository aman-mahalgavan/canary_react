import React from 'react';
import Styles from "../../styles/_index";

export default function Dropdown({ logoutUser }) {
    return (
        <Styles.StyledDropdown>
            <ul>
                <li><a onClick={logoutUser} className="logout">Logout</a></li>
            </ul>
        </Styles.StyledDropdown>
    )
}
