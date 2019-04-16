import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { createCampaign } from "../../redux/actions/campaignAction";
import Styles from "../../styles/_index";
import PrivatePage from "../../components/hoc/PrivatePage";
import WithProfile from "../../components/hoc/WithProfile";
import InputComponent from "../../components/partials/InputComponent";
import TextAreaInputComponent from "../../components/partials/TextAreaInputComponent";
import web3 from "../../Ethereum/web3";
import campaignCreator from "../../Ethereum/campaignCreator";
import { daysToBlockNumber } from "../../utils/etherUtils";
import ButtonComponent from "../../components/partials/ButtonComponent";
import validate from "../../utils/validate";

class create extends Component {

    state = {

        heading: "",
        headerImage: {},
        about: "",
        intro: "",
        deadline: "",
        goal: "",
        minimumContribution: "",
        errors: {},
        imagePreview: "",
        loadingButton: false
    };








    // Lifecycle function for changing errors in localstate everytime they changes in redux store

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }



    // handling the submit of campaign form
    onSubmit = async e => {
        e.preventDefault();
        let { hasProfile, address } = this.props.auth.user;
        let { isEligible, errors } = await validate(hasProfile, address);
        if (isEligible) {
            try {
                let { minimumContribution, deadline, goal } = this.state;

                // Converting ether values to wei
                let formattedContribution = web3.utils.toWei(minimumContribution, "ether");
                let formattedGoal = web3.utils.toWei(goal, "ether");

                // formatting the days entered to blocknumber
                let formattedDeadline = daysToBlockNumber(deadline);
                console.log(formattedDeadline);

                // setting state for loading Button
                this.setState({ loadingButton: true });

                // creating the campaign and getting the transaction details
                let transactionDetails = await campaignCreator.methods.createCampaign(formattedDeadline, formattedGoal, formattedContribution).send({ from: address });

                // fetching the campaign address from the transaction details
                let campaignAddress = transactionDetails.events.DeployedCampaignAddress.returnValues._campaign;


                // saving the campaign details to the centralized database
                let campaignData = {
                    heading: this.state.heading,
                    intro: this.state.intro,
                    campaignAddress,
                    about: this.state.about,
                    campaignImage: this.state.headerImage
                }
                await this.props.createCampaign(campaignData, this.props.auth.token);
                this.setState({ loadingButton: false })
            } catch (err) {
                console.log(err);
            }
        }
        else {
            console.log(errors);
        }
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





    //handling profile image
    handleFileUpload = (event) => {
        let headerImage = event.target.files[0]
        let imagePreview = URL.createObjectURL(headerImage);
        this.setState(() => {
            return {
                headerImage,
                imagePreview
            }
        })
    }



    render() {
        let { errors } = this.state;
        return (
            <Styles.FormContainer onSubmit={this.onSubmit}>
                <h1>Create a Campaign</h1>
                <p>Help Contributors understand you Better</p>
                <Styles.CampaignFormImageContainer bg={this.state.imagePreview}>
                    <div className="image-upload">
                        <label htmlFor="file-input">
                            <a><Styles.ImageIcon className="fas fa-edit"></Styles.ImageIcon></a>
                        </label>
                        <input id="file-input" type="file" onChange={this.handleFileUpload} />
                    </div>


                </Styles.CampaignFormImageContainer>
                <InputComponent
                    placeholder="Heading"
                    type="text"
                    value={this.state.heading}
                    name="heading"
                    error={errors.heading}
                    onChange={this.onChange}
                />
                <InputComponent
                    placeholder="Intro"
                    type="text"
                    value={this.state.intro}
                    name="intro"
                    error={errors.intro}
                    onChange={this.onChange}
                />
                <InputComponent
                    placeholder="minimum Contribution"
                    type="text"
                    value={this.state.minimumContribution}
                    name="minimumContribution"
                    error={errors.minimumContribution}
                    onChange={this.onChange}
                />
                <InputComponent
                    placeholder="deadline"
                    type="text"
                    value={this.state.deadline}
                    name="deadline"
                    error={errors.deadline}
                    onChange={this.onChange}
                />
                <InputComponent
                    placeholder="goal"
                    type="text"
                    value={this.state.goal}
                    name="goal"
                    error={errors.goal}
                    onChange={this.onChange}
                />
                <TextAreaInputComponent
                    placeholder="About the campaign"

                    value={this.state.about}
                    name="about"
                    error={errors.about}
                    onChange={this.onChange}

                />

                <ButtonComponent bg="#1ba94c" color="#fff" type="submit" width="200px" loading={this.state.loadingButton} value="Create" />


            </Styles.FormContainer>
        )
    }
}

// Combining all the Hocs required for this Page
const FinalHoc = compose(PrivatePage, WithProfile);

const mapStateToProps = state => {
    return {
        errors: state.errors,
        profile: state.profile,
        auth: state.auth
    };
};
export default connect(
    mapStateToProps, { createCampaign }
)(FinalHoc(create));