import React, { Component } from 'react';
import Styles from "../../styles/_index";
import { weiToEther } from "../../utils/etherUtils";
import compare from "../../utils/compareAddresses";
import Campaign from "../../Ethereum/campaign";
import getAccount from "../../utils/getAccount";
import { Router } from "../../routes";

export default class RequestCard extends Component {

    state = {
        loadingButton: false
    }

    // Voting for the Request
    onApprove = async e => {
        try {
            let account = await getAccount();
            if (compare(account, this.props.userAddress)) {
                const campaign = Campaign(this.props.address);

                // setting state for loading Button
                this.setState({ loadingButton: true });

                await campaign.methods.approveRequest(this.props.id).send({
                    from: account
                });

                // setting state for loading Button
                this.setState({ loadingButton: false });

                Router.replaceRoute(`/dashboard/${this.props.address}/requests`);
            } else {
                console.log(`Please Switch to Your Registered Address  :  ${this.props.userAddress}`);
            }
        } catch (err) {
            // setting state for loading Button
            this.setState({ loadingButton: false });

            console.log(err);
        }
    }

    // Making the Payment of the Approved Request
    onFinalize = async e => {
        try {
            let account = await getAccount();
            if (compare(account, this.props.userAddress) && this.props.isAdmin) {
                const campaign = Campaign(this.props.address);

                // setting state for loading Button
                this.setState({ loadingButton: true });

                await campaign.methods.makePayment(this.props.id).send({
                    from: account
                });

                // setting state for loading Button
                this.setState({ loadingButton: false });

                Router.replaceRoute(`/dashboard/${this.props.address}/requests`);
            } else {
                console.log(`Please Switch to Your Registered Address  :  ${this.props.userAddress}`);
            }
        } catch (err) {

            // setting state for loading Button
            this.setState({ loadingButton: false });

            console.log(err);
        }
    }

    render() {
        let completed = this.props.request[3];
        let isApproved = ((this.props.request[4] / this.props.contributors) * 100) >= 50;
        return (
            <div className="request-box">
                <div className="content">
                    <h4>{this.props.request[0]}</h4>
                    <p>Amount : <span>{weiToEther(this.props.request[1])} ETH</span></p>
                    <p>To : <span>{this.props.request[2]}</span></p>
                </div>
                <hr />

                {/* Conditional button display based on various conditions*/}
                {completed ? (
                    <Styles.AnchorButton
                        display="block"
                        width="50%"
                        radius="5px"
                        color="#009E74"
                        mg="15px auto"
                        font="25px"
                        disabled={true}

                    >
                        Completed
            </Styles.AnchorButton>
                ) : (
                        !this.props.isAdmin ? (
                            <Styles.AnchorButton
                                display="block"
                                width="50%"
                                radius="5px"
                                color="#009E74"
                                mg="15px auto"
                                font="25px"
                                onClick={this.onApprove}
                                disabled={this.props.hasVoted}
                            >
                                {this.props.hasVoted ? "Voted" : (this.props.loadingButton ? (<i className="fas fa-cog fa-spin"></i>) : "Approve")}
                            </Styles.AnchorButton>
                        ) : (isApproved ? (<Styles.AnchorButton
                            display="block"
                            width="50%"
                            radius="5px"
                            color="#1ba94c"
                            mg="15px auto"
                            font="25px"
                            onClick={this.onFinalize}
                            border="1px solid #1ba94c"
                        >
                            {this.props.loadingButton ? (<i className="fas fa-cog fa-spin"></i>) : "Finalize"}
                        </Styles.AnchorButton>)
                            : (<Styles.AnchorButton
                                display="block"
                                width="50%"
                                radius="5px"
                                color="#009E74"
                                mg="15px auto"
                                font="25px"
                                disabled={true}
                                onClick={(e) => { console.log("Not disabled") }}
                            >
                                Pending...
                        </Styles.AnchorButton>))
                    )}
            </div>
        )
    }
}


