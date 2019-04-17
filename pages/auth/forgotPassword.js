import React, { Component } from 'react';
import InputComponent from "../../components/partials/InputComponent";
import ButtonComponent from "../../components/partials/ButtonComponent";
import { sendResetToken } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import Styles from "../../styles/_index";

class forgotPassword extends Component {

    state = {
        email: "",
        errors: {}
    }



    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(nextProps);

    //     if (prevState.errors !== nextProps.errors) {
    //         return { errors: nextProps.errors, ...prevState }
    //     }
    //     else {
    //         return { ...prevState };
    //     }

    // }

    componentDidUpdate(nextProps) {
        if (this.state.errors !== nextProps.errors) {
            this.setState(() => {
                return {
                    errors: nextProps.errors
                }
            })
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


    onSubmit = e => {
        e.preventDefault();
        this.props.sendResetToken(this.state.email);
    }
    render() {
        let { errors } = this.state;

        return (
            <Styles.FormContainer onSubmit={this.onSubmit}>

                <h2>Enter your registered email</h2>
                <InputComponent
                    placeholder="Email"
                    type="text"
                    value={this.state.email}
                    name="email"
                    error={errors.email}
                    onChange={this.onChange}
                />

                <ButtonComponent bg="#1ba94c" color="#fff" type="submit" width="200px" value="Send Token" />
            </Styles.FormContainer>
        )
    }
}



const mapStateToprops = state => {
    return {
        errors: state.errors
    }
}


export default connect(mapStateToprops, { sendResetToken })(forgotPassword);