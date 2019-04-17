import React, { Component } from 'react';
import InputComponent from "../../components/partials/InputComponent";
import ButtonComponent from "../../components/partials/ButtonComponent";
import Styles from "../../styles/_index";
import { connect } from "react-redux";
import { resetUserPassword } from "../../redux/actions/authActions";

class resetPassword extends Component {




    static async getInitialProps(ctx) {

        return {
            token: ctx.query.token
        }
    }


    componentDidUpdate(nextProps) {
        if (this.state.errors !== nextProps.errors) {
            this.setState(() => {
                return {
                    errors: nextProps.errors
                }
            })
        }
    }


    state = {
        password: "",
        confirmPassword: "",
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


    onSubmit = e => {
        e.preventDefault();
        let data = {
            password: this.state.password,
            confirmPassword: this.state.password,
            token: this.props.token
        }
        this.props.resetUserPassword(data);
    }


    render() {
        let { errors } = this.state;
        return (
            <Styles.FormContainer onSubmit={this.onSubmit}>
                <h2>Enter Your new Password</h2>
                <InputComponent
                    placeholder="Password"
                    type="text"
                    value={this.state.password}
                    name="password"
                    error={errors.password}
                    onChange={this.onChange}
                />
                <InputComponent
                    placeholder="Confirm password"
                    type="text"
                    value={this.state.confirmPassword}
                    name="confirmPassword"
                    error={errors.confirmPassword}
                    onChange={this.onChange}
                />
                <ButtonComponent bg="#1ba94c" color="#fff" type="submit" width="200px" value="Reset" />
            </Styles.FormContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { resetUserPassword })(resetPassword);