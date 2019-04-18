import React, { Component } from 'react';
import CampaignLayout from "../../components/layouts/CampaignLayout";
import Styles from "../../styles/_index";
import { getCampaignByAddress } from "../../redux/actions/campaignAction";
import Campaign from "../../Ethereum/campaign";
import { connect } from "react-redux";
import compare from "../../utils/compareAddresses";
import { Router, Link } from "../../routes";
import CampaignNav from "../../components/partials/CampaignNav";
import WithBlockNumber from "../../components/hoc/WithBlockNumber";


class update extends Component {

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
        const isAdmin = compare(this.props.admin, this.props.auth.user.address);
        return (
            <CampaignLayout parentProps={this.props}>
                <Styles.CampaignBottomContent>

                    <CampaignNav update="true" address={singleCampaign.campaignAddress} />
                    <main className="campaign-update">

                        <Link route={"/campaign/" + singleCampaign.campaignAddress + "/updates/add"}>

                            {isAdmin ? (
                                <Styles.ButtonStyle
                                    border="2px solid #009E74"
                                    bg="#fff"
                                    color="#009E74"
                                    bs="0"


                                >
                                    Add an Update
                   </Styles.ButtonStyle>
                            ) : ""}
                        </Link>
                        <div className="bottom">
                            <h4>Campaign Launched</h4>
                        </div>
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

export default connect(mapStateToprops)(WithBlockNumber(update));