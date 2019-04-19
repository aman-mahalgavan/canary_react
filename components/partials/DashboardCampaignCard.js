import React, { Component } from 'react';
import Styles from "../../styles/_index";
import { Link, Router } from "../../routes";
import { calculateRaisedPercentage, calculateRemainingDays, weiToEther } from "../../utils/etherUtils";
import getAccount from "../../utils/getAccount";
import Campaign from "../../Ethereum/campaign";
import compare from "../../utils/compareAddresses";
import ButtonComponent from "./ButtonComponent";
export default class DashboardCampaignCard extends Component {



    state = {
        loadingButton: false
    }
    getRefund = async e => {


        try {
            let account = await getAccount();
            if (compare(account, this.props.address)) {
                const campaign = Campaign(this.props.campaign.campaignAddress);
                // const isContributor = await campaign.methods.isContributor(this.props.address).call();
                // console.log(isContributor);

                // setting state for loading Button
                this.setState({ loadingButton: true });

                await campaign.methods.getRefund().send({
                    from: account
                });
                // setting state for loading Button
                this.setState({ loadingButton: false });

                Router.replaceRoute(`/dashboard/${this.props.campaign.campaignAddress}/requests`);
            } else {
                console.log(`Please Switch to Your Registered Address  :  ${this.props.address}`);
                alert(`Please Switch to Your Registered Address  :  ${this.props.address}`);
            }
        } catch (err) {
            // setting state for loading Button
            this.setState({ loadingButton: false });
            console.log(err);
            alert(err.message);
        }
    }


    render() {




        let { campaignAddress } = this.props.campaign;

        let { campaign, campaignSummary } = this.props;

        let raisedPercentage = calculateRaisedPercentage(campaignSummary[6], campaignSummary[1]);

        let { deadlineCrossed, remainingDays } = calculateRemainingDays(campaignSummary[5], this.props.blockNumber);

        let campaignSucces = deadlineCrossed && (weiToEther(campaignSummary[1]) >= weiToEther(campaignSummary[6]));





        return (
            <>
                <Styles.DashboardCampaignCardContainer>
                    <img src={campaign.campaignId.headerImage} alt="" />
                    <div className="content">
                        <Link route={"/campaign/" + campaignAddress}><h2>{campaign.campaignId.heading}</h2></Link>
                        <div className="middle-content">
                            <div className="left">
                                <p>Goal : <span>{weiToEther(campaignSummary[6])} ETH</span></p>
                                <p>Funded : <span>{raisedPercentage}%</span></p>
                            </div>
                            <div className="right">
                                <p>Deadline : <span>{remainingDays} days</span></p>
                                <p>Contributors : <span>{campaignSummary[3]}</span></p>
                            </div>
                        </div>

                        {/* Conditions for displaying button */}
                        {!this.props.contributionPage ? (
                            <Link route={"/dashboard/" + campaignAddress + "/requests"}>
                                <Styles.ButtonStyle
                                    border="2px solid #009E74"
                                    bg="#fff"
                                    color="#009E74"
                                    bs="0"
                                    disabled={!campaignSucces}
                                >
                                    View Requests
                     </Styles.ButtonStyle>
                            </Link>
                        ) : (campaignSucces ? (
                            <Link route={"/dashboard/" + campaignAddress + "/requests"}>
                                <Styles.ButtonStyle
                                    border="2px solid #009E74"
                                    bg="#fff"
                                    color="#009E74"
                                    bs="0"

                                >
                                    View Requests
                     </Styles.ButtonStyle>
                            </Link>
                        ) : (deadlineCrossed ? (
                            <ButtonComponent
                                bg="#fff"
                                border="2px solid #CD5C5C"
                                color="#CD5C5C"
                                style={{ fontWeight: "bold" }}
                                loading={this.state.loadingButton}
                                value="Withdraw"
                                disabled={!this.props.isContributor}
                                onClick={this.getRefund}
                                bs="0"
                            />
                        ) : (
                                <Styles.ButtonStyle
                                    border="2px solid #CD5C5C"
                                    bg="#fff"
                                    color="#CD5C5C"
                                    bs="0"
                                    disabled={true}
                                >
                                    View Requests
                 </Styles.ButtonStyle>
                            )))}
                    </div>

                </Styles.DashboardCampaignCardContainer>
                <Styles.DashboardCardDivider />
            </>
        )
    }
}






