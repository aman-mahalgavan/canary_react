import React from 'react';
import Styles from "../../styles/_index";
import { calculateRaisedPercentage, weiToEther } from "../../utils/etherUtils";

export default function CampaignLayout({ parentProps }) {
    let { singleCampaign } = parentProps.campaign;

    return (
        <div>
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
                        <Styles.ProgressBar height="3px" mt="0" />
                        <span>
                            {weiToEther(parentProps.balance)} ETH <b>collected of {weiToEther(parentProps.goal)} ETH</b>
                        </span>
                        <span>
                            {parentProps.contributors} <b>contributers</b>
                        </span>
                        <span>
                            20 <b>days to go</b>
                        </span>
                        <span>
                            {weiToEther(parentProps.minimumContribution)} ETH <b>minimum contribution</b>
                        </span>
                    </div>
                </section>

            </Styles.CampaignMiddleContent>
        </div>
    )
}
