import React, { Component } from 'react';
import web3 from "../../Ethereum/web3";
import { calculateRemainingDays, weiToEther } from "../../utils/etherUtils";
import Campaign from "../../Ethereum/campaign";

import Redirect from "../../utils/redirect";

export default (Page) => {
    return class CampaignSuccess extends Component {
        static async getInitialProps(ctx) {
            let { address } = ctx.query;
            const campaign = Campaign(address);
            const campaignData = await campaign.methods.getSummary().call();
            const blockNumber = await web3.eth.getBlockNumber();
            let { deadlineCrossed } = calculateRemainingDays(campaignData[5], blockNumber);


            if (deadlineCrossed && weiToEther(campaignData[1]) >= weiToEther(campaignData[6])) {
                if (Page.getInitialProps) {
                    return { ...await Page.getInitialProps(ctx) }
                }
                else {
                    return {}
                }
            }
            else {
                Redirect("/dashboard", ctx);
            }


        }

        render() {
            return (
                <Page {...this.props} />
            )
        }
    }
}