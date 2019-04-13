import React from 'react';
import Styles from "../../styles/_index";
import { Link } from "../../routes";

export default function Dropdown({ logoutUser }) {
    return (
        <Styles.StyledDropdown>
            <ul>
                <li><a onClick={logoutUser} className="logout">Logout</a></li>
                <li><Link route="/dashboard"><a>Dashboard</a></Link></li>
            </ul>
        </Styles.StyledDropdown>
    )
}
