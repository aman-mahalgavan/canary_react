import React, { Component } from 'react';
import Styles from "../../styles/_index";
import { Link } from "../../routes";
import DashboardCard from "../partials/DashboardCampaignCard";


export default class Campaign extends Component {


    renderCards = () => {
        return this.props.campaigns.map((campaign, index) => {
            return (
                <DashboardCard key={index} campaign={campaign} campaignSummary={this.props.campaignsSummary[index]} />
            )
        })
    }

    render() {
        return (<Styles.DashboardMainContent>
            <Styles.DashboardSwitchTab>
                <Link route="/dashboard/campaigns">
                    <a className="active">Campaigns</a>
                </Link>
                <Link route="/dashboard/contributions">
                    <a >Contributions</a>
                </Link>
            </Styles.DashboardSwitchTab>
            {this.renderCards()}
        </Styles.DashboardMainContent>)
    }
}