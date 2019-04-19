import React from 'react';
import Styles from "../../styles/_index";
import { calculateRaisedPercentage, weiToEther } from "../../utils/etherUtils";



export default function CampaignCard(props) {

    let raisedPercentage = calculateRaisedPercentage(props.campaignSummary[6], props.campaignSummary[1])

    let progressBarWidth = (raisedPercentage <= 100) ? `${raisedPercentage}%` : "100%";



    return (
        <div>
            <img src={props.campaign.headerImage} alt="Header Image" />
            <Styles.CampaignCardContent>
                <h3>{props.campaign.heading}</h3>
                <p>{props.campaign.intro}</p>
                <span>{props.campaign.creatorId.name}</span>
                <Styles.ProgressBar width={progressBarWidth} />
                <span className="goal">{weiToEther(props.campaignSummary[6])} Eth Pledged</span>
                <span className="raised">{raisedPercentage}% funded</span>

            </Styles.CampaignCardContent>
        </div>
    )
}
