import React, { Component } from 'react';
import CampaignLayout from "../../components/layouts/CampaignLayout";
import Styles from "../../styles/_index";
import { getCampaignByAddress, contribute } from "../../redux/actions/campaignAction";
import Campaign from "../../Ethereum/campaign";
import { connect } from "react-redux";
import validate from "../../utils/validate";
import { etherToWei, calculateRemainingDays } from "../../utils/etherUtils";
import { Router } from "../../routes";
import CampaignNav from "../../components/partials/CampaignNav";
import WithBlockNumber from "../../components/hoc/WithBlockNumber";
import ButtonComponent from "../../components/partials/ButtonComponent";

class show extends Component {

    static async getInitialProps(ctx) {

        try {
            await ctx.store.dispatch(getCampaignByAddress(ctx.query.address));
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

    state = {
        contribution: "",
        loadingButton: false
    }

    onChange = e => {
        let contribution = e.target.value;

        this.setState(() => {
            return {
                contribution
            }
        })
    }

    onContribute = async e => {
        e.preventDefault();
        if (this.props.auth.isAuthenticated) {
            let { hasProfile, address } = this.props.auth.user;

            try {
                let { isEligible, errors } = await validate(hasProfile, address);
                if (isEligible) {


                    // setting state for loading Button
                    this.setState({ loadingButton: true });

                    const campaign = Campaign(this.props.campaign.singleCampaign.campaignAddress);
                    await campaign.methods.contribute().send({
                        from: address,
                        value: etherToWei(this.state.contribution)
                    });

                    await this.props.contribute(this.props.campaign.singleCampaign.campaignAddress, this.props.auth.token);


                    // setting state for loading Button
                    this.setState({ loadingButton: false });
                } else {
                    console.log(errors);
                    alert(errors.message);
                }
            } catch (err) {
                this.setState({ loadingButton: false });
                console.log(err.message);
                alert(err.message);
            }
        } else {
            Router.pushRoute("/login");
        }

    }




    render() {
        const { singleCampaign } = this.props.campaign;
        let { deadlineCrossed } = calculateRemainingDays(this.props.deadline, this.props.blockNumber);
        return (

            <CampaignLayout parentProps={this.props}>
                <Styles.CampaignBottomContent>
                    <CampaignNav campaign="true" address={singleCampaign.campaignAddress} />

                    <main className="campaign-about">
                        <Styles.CampaignInfo>
                            <h3>About</h3>
                            <p>

                                {singleCampaign.about}


                            </p>
                        </Styles.CampaignInfo>
                        <form action="" id="contribution" onSubmit={this.onContribute}>
                            <label htmlFor="">Make a contribution</label>
                            <div className="input-group">
                                <input type="text" onChange={this.onChange} value={this.state.contribution} />
                                <span>ETH</span>
                            </div>


                            <ButtonComponent
                                bg="#1ba94c"
                                color="#fff"
                                type="submit"
                                style={{ fontWeight: "bold" }}
                                loading={this.state.loadingButton}
                                value="Contribute"
                                disabled={deadlineCrossed}
                            />
                        </form>
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

export default connect(mapStateToprops, { contribute })(WithBlockNumber(show));



// <Styles.ButtonStyle
// style={{ fontWeight: "bold" }}
// color="#fff"
// bg="#1ba94c"
// disabled={deadlineCrossed}
// >
// Contribute
// </Styles.ButtonStyle>