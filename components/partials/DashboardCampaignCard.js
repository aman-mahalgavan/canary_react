import React from 'react';
import Styles from "../../styles/_index";
import { Link } from "../../routes";
import { calculateRaisedPercentage, calculateRemainingDays, weiToEther } from "../../utils/etherUtils";

export default function DashboardCampaignCard(props) {
    let { campaignAddress } = props.campaign;
    let { campaign, campaignSummary } = props;
    let raisedPercentage = calculateRaisedPercentage(campaignSummary[6], campaignSummary[1]);
    let { deadlineCrossed, remainingDays } = calculateRemainingDays(campaignSummary[5], props.blockNumber);
    let campaignSucces = deadlineCrossed && (weiToEther(campaignSummary[1]) >= weiToEther(campaignSummary[6]));
    return (
        <>
            <Styles.DashboardCampaignCardContainer>
                <img src={campaign.campaignId.headerImage} alt="" />
                <div className="content">
                    <Link route={"/campaign/" + campaignAddress}><h2>{campaign.campaignId.heading}</h2></Link>
                    <div className="middle-content">
                        <div className="left">
                            <p>Goal : <span>{weiToEther(campaignSummary[6])} ETH</span></p>
                            <p>Funded : <span>{raisedPercentage}%</span></p>
                        </div>
                        <div className="right">
                            <p>Deadline : <span>{remainingDays} days</span></p>
                            <p>Contributors : <span>{campaignSummary[3]}</span></p>
                        </div>
                    </div>
                    <Link route={"/dashboard/" + campaignAddress + "/requests"}>
                        <Styles.ButtonStyle
                            border="2px solid #009E74"
                            bg="#fff"
                            color="#009E74"
                            bs="0"
                            disabled={!campaignSucces}
                        >
                            View Requests
                         </Styles.ButtonStyle>
                    </Link>
                </div>

            </Styles.DashboardCampaignCardContainer>
            <Styles.DashboardCardDivider />
        </>
    )
}
