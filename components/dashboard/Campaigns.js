import React, { Component } from 'react';
import Styles from "../../styles/_index";
import { Link, Router } from "../../routes";
import DashboardCard from "../partials/DashboardCampaignCard";




export default class Campaigns extends Component {



    renderCards = () => {

        return this.props.campaigns.map((campaign, index) => {
            return (
                <DashboardCard
                    key={index}
                    campaign={campaign}
                    campaignSummary={this.props.campaignsSummary[index]}
                    blockNumber={this.props.blockNumber}
                    contributionPage={this.props.contributionPage}
                    address={this.props.address}
                />
            )
        })


    }

    render() {
        return (
            <Styles.DashboardMainContent>
                <Styles.DashboardSwitchTab>
                    <Link route="/dashboard">
                        <a className={this.props.contributionPage ? null : "active"}>Campaigns</a>
                    </Link>
                    <Link route="/dashboard/contributions">
                        <a className={this.props.contributionPage ? "active" : null}>Contributions</a>
                    </Link>
                </Styles.DashboardSwitchTab>
                {this.renderCards()}
            </Styles.DashboardMainContent>)
    }
}