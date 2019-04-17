import React, { Component } from "react";
import InputComponent from "../../components/partials/InputComponent";
import PrivatePage from "../../components/hoc/PrivatePage";
import HasProfile from "../../components/hoc/HasProfile";
import WithProfile from "../../components/hoc/WithProfile";
import { compose } from "redux";
import SocialInputComponent from "../../components/partials/SocialInputComponent";
import TextAreaInputComponent from "../../components/partials/TextAreaInputComponent";
import ButtonComponent from "../../components/partials/ButtonComponent";
import { connect } from "react-redux";

import Styles from "../../styles/_index";
import { editUserProfile } from "../../redux/actions/profileActions";


class editProfile extends Component {
    state = {

        handle: "",
        avatar: {},
        bio: "",
        location: "",
        facebook: "",
        youtube: "",
        twitter: "",
        instagram: "",
        errors: {},
        imagePreview: "",
        loadingButton: false
    };



    componentDidMount() {
        let { userProfile } = this.props.profile;

        this.setState(() => ({
            handle: userProfile.handle,
            bio: userProfile.bio,
            location: userProfile.location,
            twitter: userProfile.twitter ? userProfile.twitter : "",
            facebook: userProfile.twitter ? userProfile.facebook : "",
            youtube: userProfile.twitter ? userProfile.youtube : "",
            instagram: userProfile.twitter ? userProfile.instagram : "",
            imagePreview: userProfile.avatar

        }))
    }
    // Lifecycle function for changing errors in localstate everytime they changes in redux store

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    //handler function of submitting a form
    onSubmit = async e => {
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

        // setting state for loading Button
        this.setState({ loadingButton: true });

        await this.props.editUserProfile(profileData, this.props.auth.token);


        // setting state for loading Button
        this.setState({ loadingButton: false });
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
        let imagePreview = avatar ? URL.createObjectURL(avatar) : "";
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

                <ButtonComponent bg="#1ba94c" color="#fff" type="submit" width="200px" loading={this.state.loadingButton} value="Edit Profile" />
            </Styles.FormContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors,
        auth: state.auth,
        profile: state.profile
    };
};



const FinalHoc = compose(PrivatePage, HasProfile, WithProfile);


export default connect(
    mapStateToProps,
    { editUserProfile }
)(FinalHoc(editProfile));