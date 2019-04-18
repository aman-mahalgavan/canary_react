import React from 'react';
import Styles from "../../styles/_index";
import { calculateRaisedPercentage, weiToEther, calculateRemainingDays } from "../../utils/etherUtils";

export default function CampaignLayout({ parentProps, children }) {
    let { singleCampaign } = parentProps.campaign;
    let raisedPercentage = calculateRaisedPercentage(parentProps.goal, parentProps.balance)


    let { deadlineCrossed, remainingDays } = calculateRemainingDays(parentProps.deadline, parentProps.blockNumber);


    let progressBarWidth = (raisedPercentage <= 100) ? `${raisedPercentage}%` : "100%";
    return (<>
        <Styles.CampaignContainer>
            <Styles.CampaignHeader>
                <div className="user-meta">
                    <img src={singleCampaign.creatorId.avatar} alt="" />
                    <span>By {singleCampaign.creatorId.name}</span>
                    <b>3 Created</b>
                </div>
                <div className="agenda">
                    <h2>{singleCampaign.heading}</h2>
                    <p>
                        {singleCampaign.intro}
                    </p>
                </div>
            </Styles.CampaignHeader>
            <Styles.CampaignMiddleContent>

                <section id="main-content">
                    <img src={singleCampaign.headerImage} alt="" />
                    <div id="info">
                        <Styles.ProgressBar height="3px" mt="0" width={progressBarWidth} />
                        <span>
                            {weiToEther(parentProps.balance)} ETH <b>collected of {weiToEther(parentProps.goal)} ETH</b>
                        </span>
                        <span>
                            {parentProps.contributors} <b>contributors</b>
                        </span>
                        <span>
                            {remainingDays ? remainingDays : "No"} <b>days to go</b>
                        </span>
                        <span>
                            {weiToEther(parentProps.minimumContribution)} ETH <b>minimum contribution</b>
                        </span>
                        <span>
                            {(deadlineCrossed) ? "Campaign Ended" : ""}
                        </span>
                    </div>
                </section>

            </Styles.CampaignMiddleContent>
            {children}
        </Styles.CampaignContainer>
    </>)
}
