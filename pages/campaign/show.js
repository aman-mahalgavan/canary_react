import React, { Component } from 'react';
import CampaignLayout from "../../components/layouts/CampaignLayout";
import Styles from "../../styles/_index";
import { getCampaignByAddress } from "../../redux/actions/campaignAction";
import Campaign from "../../Ethereum/campaign";
import { connect } from "react-redux";
import validate from "../../utils/validate";
import { etherToWei } from "../../utils/etherUtils";
import WithProfile from "../../components/hoc/WithProfile";

class show extends Component {

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

    state = {
        contribution: ""
    }
    onChange = e => {
        let contribution = etherToWei(e.target.value);
        this.setState(() => {
            return {
                contribution
            }
        })
    }

    onContribute = async e => {
        e.preventDefault();

    }




    render() {
        const { singleCampaign } = this.props.campaign;
        return (
            <Styles.CampaignContainer>
                <CampaignLayout parentProps={this.props} />
                <Styles.CampaignBottomContent>

                    <nav>
                        <a className="active" href="">
                            Campaign
				</a>
                        <a href="">FAQ</a>
                        <a href="">Updates</a>
                        <a href="">Comments</a>
                    </nav>
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
                                <input type="text" />
                                <span>ETH</span>
                            </div>
                            <Styles.ButtonStyle style={{ fontWeight: "bold" }} color="#fff" bg="#1ba94c" onChange={this.onChange} value={this.state.contribution}>
                                Contribute
					</Styles.ButtonStyle>
                        </form>
                    </main>

                </Styles.CampaignBottomContent>
            </Styles.CampaignContainer>
        )
    }
}



const mapStateToprops = state => {
    return {
        auth: state.auth,
        campaign: state.campaign
    }
}

export default connect(mapStateToprops)(WithProfile(show));