import React, { Component } from 'react';
import CampaignLayout from "../../components/layouts/CampaignLayout";
import Styles from "../../styles/_index";
import { getCampaignByAddress } from "../../redux/actions/campaignAction";
import Campaign from "../../Ethereum/campaign";
import { connect } from "react-redux";

import { Router } from "../../routes";
import CampaignNav from "../../components/partials/CampaignNav";

class comment extends Component {

    static async getInitialProps(ctx) {

        try {
            ctx.store.dispatch(getCampaignByAddress(ctx.query.address));
            const campaign = Campaign(ctx.query.address);

            const summary = await campaign.methods.getSummary().call();

            return {
                minimumContribution: summary[0],
                balance: summary[1],
                requestCount: summary[2],
                contributors: summary[3],
                admin: summary[4],
                deadline: summary[5],
                goal: summary[6],
                address: ctx.query.address
            };
        } catch (err) {
            console.log(err);
        }
    }



    render() {
        const { singleCampaign } = this.props.campaign;
        return (
            <CampaignLayout parentProps={this.props}>
                <Styles.CampaignBottomContent>

                    <CampaignNav comment="true" address={singleCampaign.campaignAddress} />
                    <main className="campaign-comment">

                        <h1>comment</h1>

                    </main>
                </Styles.CampaignBottomContent>


            </CampaignLayout>
        )
    }
}


const mapStateToprops = state => {
    return {
        auth: state.auth,
        campaign: state.campaign
    }
}

export default connect(mapStateToprops)(comment);