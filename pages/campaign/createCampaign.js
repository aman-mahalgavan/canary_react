import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from "../../styles/_index";
import PrivatePage from "../../components/hoc/PrivatePage";
import InputComponent from "../../components/partials/InputComponent";
import TextAreaInputComponent from "../../components/partials/TextAreaInputComponent";

class createCampaign extends Component {

    state = {

        heading: "",
        headerImage: {},
        about: "",
        intro: "",
        deadline: "",
        goal: "",
        minimumContribution: "",
        errors: {},
        imagePreview: ""

    };





    // Lifecycle function for changing errors in localstate everytime they changes in redux store

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
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


        let avatar = event.target.files[0]
        let imagePreview = URL.createObjectURL(avatar);
        this.setState(() => {
            return {
                avatar,
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
                <Styles.CampaignImageContainer bg={this.state.imagePreview}>
                    <div className="image-upload">
                        <label htmlFor="file-input">
                            <a><Styles.ImageIcon className="fas fa-edit"></Styles.ImageIcon></a>
                        </label>
                        <input id="file-input" type="file" onChange={this.handleFileUpload} />
                    </div>


                </Styles.CampaignImageContainer>
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



                <Styles.ButtonStyle bg="#1ba94c" color="#fff" type="submit" width="200px" type="submit">Create Campaign</Styles.ButtonStyle>
            </Styles.FormContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors
    };
};
export default connect(
    mapStateToProps
)(PrivatePage(createCampaign));