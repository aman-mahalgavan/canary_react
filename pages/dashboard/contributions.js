import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import Styles from "../../styles/_index";
import { Link } from "../../routes";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Campaigns from "../../components/dashboard/Campaigns";
import Campaign from "../../Ethereum/campaign";
import privatePage from "../../components/hoc/PrivatePage";
import WithProfile from "../../components/hoc/WithProfile";
import WithBlockNumber from "../../components/hoc/WithBlockNumber";


class contributions extends Component {



    // fetching the campaign summary from the blockchain
    static async getInitialProps(ctx) {
        try {
            let campaigns = ctx.store.getState().profile.userProfile.contributions;
            let userAddress = ctx.store.getState().auth.user.address;


            let campaignsSummary = await Promise.all(campaigns.map(async singleCampaign => {

                let campaign = Campaign(singleCampaign.campaignAddress);
                return campaign.methods.getSummary().call();
            }));

            let isContributor = await Promise.all(campaigns.map(async singleCampaign => {
                let campaign = Campaign(singleCampaign.campaignAddress);
                return campaign.methods.isContributor(userAddress).call();
            }))
            return {
                campaigns,
                campaignsSummary,
                isContributor
            }


        } catch (err) {
            console.log(err);
        }
    }


    // Rendering the Dashboard Elements
    renderDashboard = () => {
        let { user } = this.props.auth;
        let { userProfile } = this.props.profile;

        // Initial dashboard if profile is not created
        let initialDashboard = (<Styles.DefaultDashboard>
            <h2>You Have'nt Created any profile yet</h2>
            <Link route="/dashboard/createProfile">
                <Styles.ButtonStyle bg="#1ba94c" color="#fff" width="200px" mg="5px 0 0 0">
                    Create Profile
        </Styles.ButtonStyle></Link>
        </Styles.DefaultDashboard>
        )

        // if user has profile then rendering the Profile elements
        if (user.hasProfile) {
            return (
                <Styles.DashboardContainerStyle>
                    <DashboardLayout handle={userProfile.handle} />




                    <Campaigns
                        blockNumber={this.props.blockNumber}
                        contributionPage="true"
                        campaigns={this.props.campaigns}
                        campaignsSummary={this.props.campaignsSummary}
                        address={this.props.auth.user.address}
                        isContributor={this.props.isContributor}
                    />



                    <Styles.DashboardRightStyle space="150px"></Styles.DashboardRightStyle>
                </Styles.DashboardContainerStyle>

            );
        }

        // else rendering the initial Dashboard
        else {
            return initialDashboard;
        }
    }
    render() {
        return (<section>
            {this.renderDashboard()}
        </section>)




    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
        profile: state.profile
    }
}
const FinalHoc = compose(privatePage, WithProfile, WithBlockNumber);

export default connect(mapStateToProps)(FinalHoc(contributions));