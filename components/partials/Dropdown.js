import React from 'react';
import Styles from "../../styles/_index";
import { Link } from "../../routes";

export default function Dropdown({ logoutUser, toggle, setToggle }) {
    return (
        <Styles.StyledDropdown>
            <ul onClick={() => { setToggle(!toggle) }}>

                <li><Link route="/dashboard"><a>Dashboard</a></Link></li>
                <li><a onClick={logoutUser} className="logout">Logout</a></li>
            </ul>
        </Styles.StyledDropdown>
    )
}




