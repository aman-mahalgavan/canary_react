import React from 'react';
import Styles from "../../styles/_index";
import { Link } from "../../routes";

export default function Campaigns() {
    return (
        <Styles.DashboardMainContent>
            <Styles.DashboardSwitchTab>
                <Link route="/dashboard/campaigns">
                    <a className="active">Campaigns</a>
                </Link>
                <Link route="/dashboard/contributions">
                    <a >Contributions</a>
                </Link>
            </Styles.DashboardSwitchTab>
        </Styles.DashboardMainContent>
    )
}
