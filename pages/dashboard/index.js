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
import isEmpty from "../../utils/isEmpty";

class dashboard extends Component {




    static async getInitialProps(ctx) {
        try {

            let campaigns = ctx.store.getState().profile.userProfile.campaigns;


            let campaignsSummary = await Promise.all(campaigns.map(async singleCampaign => {

                let campaign = Campaign(singleCampaign.campaignAddress);
                return campaign.methods.getSummary().call()
            }));


            return {
                campaigns,
                campaignsSummary
            }



        } catch (err) {
            console.log(err);
        }
    }


    // Rendering the Dashboard Elements
    renderDashboard = () => {
        let { user } = this.props.auth;
        let { userProfile } = this.props.profile;
        let initialDashboard = (<Styles.DefaultDashboard>
            <h2>You Have'nt Created any profile yet</h2>
            <Link route="/dashboard/createProfile">
                <Styles.ButtonStyle bg="#1ba94c" color="#fff" width="200px" mg="5px 0 0 0">
                    Create Profile
        </Styles.ButtonStyle></Link>
        </Styles.DefaultDashboard>
        )
        if (user.hasProfile) {
            return (
                <Styles.DashboardContainerStyle>
                    <DashboardLayout handle={userProfile.handle} />




                    <Campaigns
                        blockNumber={this.props.blockNumber}
                        campaigns={this.props.campaigns}
                        campaignsSummary={this.props.campaignsSummary}
                        address={this.props.auth.user.address}
                    />



                    <Styles.DashboardRightStyle space="120px"></Styles.DashboardRightStyle>
                </Styles.DashboardContainerStyle>

            );
        }
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

export default connect(mapStateToProps)(FinalHoc(dashboard));