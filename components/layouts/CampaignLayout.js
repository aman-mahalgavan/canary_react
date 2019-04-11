import React from 'react';
import Styles from "../../styles/_index";

export default function CampaignLayout({ parentProps }) {
    let { singleCampaign } = parentProps.campaign;

    return (
        <div>
            <Styles.CampaignHeader>
                <div className="user-meta">
                    <img src={singleCampaign.headerImage} alt="" />
                    <span>By Ankit Brahimbhatt</span>
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
                            {parentProps.balance} ETH <b>collected of {parentProps.goal} ETH</b>
                        </span>
                        <span>
                            {parentProps.contributors} <b>contributers</b>
                        </span>
                        <span>
                            20 <b>days to go</b>
                        </span>
                        <span>
                            0.01 <b>minimum subscription</b>
                        </span>
                    </div>
                </section>

            </Styles.CampaignMiddleContent>
        </div>
    )
}
