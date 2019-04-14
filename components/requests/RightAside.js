import React from 'react';
import Styles from "../../styles/_index";
import { Link } from "../../routes";

export default function RightAside(props) {
    return (
        <Styles.DashboardRightStyle>
            <Link route={"/dashboard/" + props.address + "/requests/create"}>
                <Styles.ButtonStyle bg="#009E74" color="#fff">
                    ADD A REQUEST
            </Styles.ButtonStyle>
            </Link>
        </Styles.DashboardRightStyle>
    )
}
