import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import PrivatePage from "../../../components/hoc/PrivatePage";
import WithProfile from "../../../components/hoc/WithProfile";
import HasProfile from "../../../components/hoc/HasProfile.js";
import CampaignSuccess from "../../../components/hoc/CheckCampaignSuccess";
import Styles from "../../../styles/_index";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import InputComponent from "../../../components/partials/InputComponent";
import TextAreaInputComponent from "../../../components/partials/TextAreaInputComponent";
import Campaign from "../../../Ethereum/campaign";
import web3 from "../../../Ethereum/web3";
import { Router } from "../../../routes";
import validate from "../../../utils/validate";

class createRequest extends Component {

    static async getInitialProps(ctx) {
        try {
            let { address } = ctx.query;
            const campaign = Campaign(address);
            const admin = await campaign.methods.admin().call();
            return { admin, address }

        } catch (err) {
            console.log(err);

        }
    }

    state = {
        description: "",
        amount: "",
        recipient: "",
        errors: {}
    }


    //handler function onChanging the input value everytime
    onChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    };

    //onSubmitting the form
    onSubmit = async e => {
        e.preventDefault();
        let { description, amount, recipient } = this.state;
        const campaign = Campaign(this.props.address);
        try {
            let { hasProfile, address } = this.props.auth.user;
            let { isEligible, errors } = await validate(hasProfile, address);
            if (isEligible) {
                await campaign.methods
                    .createSpendingRequest(description, recipient, web3.utils.toWei(amount, "ether"))
                    .send({ from: address });
                Router.pushRoute(`/dashboard/${this.props.address}/requests`);
            } else {
                console.log(errors);
            }


        } catch (err) {
            console.log(err);
        }

    }
    render() {
        let { userProfile } = this.props.profile;
        let { errors } = this.state
        return (
            <Styles.DashboardContainerStyle>
                <DashboardLayout handle={userProfile.handle} />



                <Styles.RequestFormContainer onSubmit={this.onSubmit}>
                    <h1>Create a Request</h1>
                    <TextAreaInputComponent
                        placeholder="Description"

                        value={this.state.description}
                        name="description"
                        error={errors.description}
                        onChange={this.onChange}

                    />
                    <InputComponent
                        placeholder="Amount"
                        type="number"
                        value={this.state.amount}
                        name="amount"
                        error={errors.amount}
                        onChange={this.onChange}
                    />
                    <InputComponent
                        placeholder="Recipient Address"
                        type="text"
                        value={this.state.recipient}
                        name="recipient"
                        error={errors.recipient}
                        onChange={this.onChange}
                    />

                    <Styles.ButtonStyle bg="#1ba94c" color="#fff" type="submit" width="200px" type="submit">Create</Styles.ButtonStyle>
                </Styles.RequestFormContainer>



                <Styles.DashboardRightStyle space="150px"></Styles.DashboardRightStyle>
            </Styles.DashboardContainerStyle>
        )

    }
}



const mapStateToprops = state => {
    return {
        auth: state.auth,
        profile: state.profile
    }
}

let FinalHoc = compose(PrivatePage, CampaignSuccess, HasProfile, WithProfile);

export default connect(mapStateToprops)(FinalHoc(createRequest))