import React, { Component } from "react";
import InputComponent from "../../components/partials/InputComponent";
import PrivatePage from "../../components/hoc/PrivatePage";
import SocialInputComponent from "../../components/partials/SocialInputComponent";
import TextAreaInputComponent from "../../components/partials/TextAreaInputComponent";
import { connect } from "react-redux";
import { Link } from "../../routes";
import Styles from "../../styles/_index";
import { createUserProfile } from "../../redux/actions/profileActions";


class createProfile extends Component {
    state = {
        displaySocialHandles: false,
        handle: "",
        avatar: {},
        bio: "",
        location: "",
        facebook: "",
        youtube: "",
        twitter: "",
        instagram: "",
        errors: {},
        imagePreview: ""

    };

    // Lifecycle function for changing errors in localstate everytime they changes in redux store

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    //handler function of submitting a form
    onSubmit = e => {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            avatar: this.state.avatar,
            bio: this.state.bio,
            location: this.state.location,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            youtube: this.state.youtube,
            instagram: this.state.instagram

        };


        this.props.createUserProfile(profileData, this.props.auth.token);
    };

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

        const { displaySocialHandles } = this.state;
        let { errors } = this.state;


        return (
            //  Create Profile
            <Styles.FormContainer onSubmit={this.onSubmit}>
                <h1>Profile Settings</h1>
                <p>Help Contributors understand you Better</p>
                <Styles.ImageContainer bg={this.state.imagePreview}>
                    <div className="image-upload">
                        <label htmlFor="file-input">
                            <a><Styles.ImageIcon className="fas fa-edit"></Styles.ImageIcon></a>
                        </label>
                        <input id="file-input" type="file" onChange={this.handleFileUpload} />
                    </div>


                </Styles.ImageContainer>
                <InputComponent
                    placeholder="Your Handle"
                    type="text"
                    value={this.state.handle}
                    name="handle"
                    error={errors.handle}
                    onChange={this.onChange}
                />
                <InputComponent
                    placeholder="Your location"
                    type="text"
                    value={this.state.location}
                    name="location"
                    error={errors.location}
                    onChange={this.onChange}
                />
                <TextAreaInputComponent
                    placeholder="Your Bio"
                    type="text"
                    value={this.state.bio}
                    name="bio"
                    error={errors.bio}
                    onChange={this.onChange}

                />

                <SocialInputComponent
                    icon="fab fa-facebook"
                    placeholder="Facebook"
                    type="text"
                    value={this.state.facebook}
                    name="facebook"
                    error={errors.facebook}
                    onChange={this.onChange}
                />
                <SocialInputComponent
                    icon="fab fa-instagram"
                    placeholder="instagram"
                    type="text"
                    value={this.state.instagram}
                    name="instagram"
                    error={errors.instagram}
                    onChange={this.onChange}
                />
                <SocialInputComponent
                    icon="fab fa-youtube"
                    placeholder="youtube"
                    type="text"
                    value={this.state.youtube}
                    name="youtube"
                    error={errors.youtube}
                    onChange={this.onChange}
                />
                <SocialInputComponent
                    icon="fab fa-twitter"
                    placeholder="twitter"
                    type="text"
                    value={this.state.twitter}
                    name="twitter"
                    error={errors.twitter}
                    onChange={this.onChange}
                />

                <Styles.ButtonStyle bg="#1ba94c" color="#fff" type="submit" width="200px" type="submit">Create Profile</Styles.ButtonStyle>
            </Styles.FormContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors,
        auth: state.auth
    };
};
export default connect(
    mapStateToProps,
    { createUserProfile }
)(PrivatePage(createProfile));