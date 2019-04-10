import React from 'react';
import Styles from "../../styles/_index";

export default function CampaignCard(props) {
    return (
        <Styles.CampaignCardStyle>
            <img src={props.campaign.headerImage} alt="Header Image" />
            <Styles.CampaignCardContent>
                <h3>{props.campaign.heading}</h3>
                <p>{props.campaign.intro}</p>
                <span>By Ankit Brahmbhatt</span>
                <Styles.ProgressBar />
                <span className="goal">20 Eth Pledged</span>
                <span className="raised">50% funded</span>

            </Styles.CampaignCardContent>
        </Styles.CampaignCardStyle>
    )
}
