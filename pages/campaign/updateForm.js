import React, { Component } from 'react';
import Styles from "../../styles/_index";
import InputComponent from "../../components/partials/InputComponent";
import TextAreaInputComponent from "../../components/partials/TextAreaInputComponent";
import { connect } from "react-redux";
import { addUpdate } from "../../redux/actions/campaignAction";
import PrivatePage from "../../components/hoc/PrivatePage";
import ButtonComponent from "../../components/partials/ButtonComponent";

class updateForm extends Component {

    static async getInitialProps(ctx) {

        return {
            address: ctx.query.address
        }
    }

    state = {
        heading: "",
        details: "",
        updateImage: "",
        imagePreview: "",
        errors: {},
        loadingButton:false
    }

    // Lifecycle function for changing errors in localstate everytime they changes in redux store

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }


    onSubmit = async (e) => {
        e.preventDefault();

        // saving the campaign details to the centralized database
        let updateData = {
            heading: this.state.heading,
            details: this.state.details,
            address: this.props.address,

            updateImage: this.state.updateImage
        }

          // setting state for loading Button
          this.setState({ loadingButton: true });
        await this.props.addUpdate(updateData, this.props.auth.token);
          // setting state for loading Button
          this.setState({ loadingButton: true });
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
        let updateImage = event.target.files[0]
        let imagePreview = URL.createObjectURL(updateImage);
        this.setState(() => {
            return {
                updateImage,
                imagePreview
            }
        })
    }

    render() {
        let { errors } = this.state;
        return (
            <Styles.StyledContainer>
                <Styles.FormContainer onSubmit={this.onSubmit}>
                    <h1>Add an Update</h1>
                    <p>Increase Contributors's Trust</p>
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
                    <TextAreaInputComponent
                        placeholder="About the Update"

                        value={this.state.details}
                        name="details"
                        error={errors.details}
                        onChange={this.onChange}

                    />
                  

                    
                <ButtonComponent bg="#1ba94c" color="#fff" type="submit" width="200px" loading={this.state.loadingButton} value="Add Update" />
                </Styles.FormContainer>
            </Styles.StyledContainer>
        )
    }
}



const mapStateToprops = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToprops, { addUpdate })(PrivatePage(updateForm));