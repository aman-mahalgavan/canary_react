import React from 'react';
import Styles from "../../styles/_index";

export default function DashboardCampaignCard(props) {
    return (
        <Styles.DashboardCampaignCardContainer>
            <img src={props.campaign.campaignId.headerImage} alt="" />
            <div className="content">
                <h2>{props.campaign.campaignId.heading}</h2>
                <Styles.ButtonStyle
                    border="2px solid #009E74"
                    bg="#fff"
                    color="#009E74"
                    bs="0"
                    mg="65px 0 0 0"
                >
                    Requests
                </Styles.ButtonStyle>
            </div>
        </Styles.DashboardCampaignCardContainer>
    )
}
