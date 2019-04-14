import React, { Component } from 'react';
import Campaign from "../../../Ethereum/campaign";
import RequestCard from "../../../components/requests/RequestCard";
import RequestSideContent from "../../../components/requests/RightAside";
import { connect } from "react-redux";
import { compose } from "redux";
import PrivatePage from "../../../components/hoc/PrivatePage";
import WithProfile from "../../../components/hoc/WithProfile";
import HasProfile from "../../../components/hoc/HasProfile";
import CampaignSuccess from "../../../components/hoc/CheckCampaignSuccess";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import Styles from "../../../styles/_index";
import compare from "../../../utils/compareAddresses";

class Requests extends Component {

    static async getInitialProps(ctx) {
        let { address } = ctx.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const contributors = await campaign.methods.totalContributors().call();
        const admin = await campaign.methods.admin().call();
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );
        return {
            address,
            requests,
            contributors,
            admin
        }
    }

    renderRequests = () => {
        return this.props.requests.map((request, index) => {
            return (
                <RequestCard
                    request={request}
                    id={index}
                    key={index}
                    contributors={this.props.contributors}
                    address={this.props.address}

                />
            )
        })
    }
    render() {

        let { userProfile } = this.props.profile;
        return (
            <Styles.DashboardContainerStyle>
                <DashboardLayout handle={userProfile.handle} />

                <Styles.RequestMainContent>

                    {this.props.requests.length > 0 ? this.renderRequests() : "No Request Created Yet"}
                </Styles.RequestMainContent>





                {compare(this.props.admin, this.props.auth.user.address) ? <RequestSideContent address={this.props.address} /> : <Styles.DashboardRightStyle space="150px"></Styles.DashboardRightStyle>}
            </Styles.DashboardContainerStyle>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors,
        profile: state.profile
    }
}

const FinalHoc = compose(PrivatePage, CampaignSuccess, HasProfile, WithProfile);

export default connect(mapStateToProps)(FinalHoc(Requests));