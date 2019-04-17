import React, { Component } from 'react';
import { Link } from "../../routes";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import InputComponent from "../../components/partials/InputComponent";
import Styles from "../../styles/_index";
import GuestPage from "../../components/hoc/GuestPage";

class signin extends Component {


    state = {
        email: "",
        password: ""
    }

    onChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    };

    onSubmit = async e => {
        e.preventDefault();
        const User = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(User);
    };


    render() {
        let errors = this.props.errors ? this.props.errors : {};
        return (
            <Styles.SignInForm onSubmit={this.onSubmit}>
                <Styles.SwitchTab>
                    <Link route="/login">
                        <a className="active">Sign In</a>
                    </Link>
                    <Link route="/register">
                        <a>Sign Up</a>
                    </Link>
                </Styles.SwitchTab>
                <InputComponent
                    type="text"
                    name="email"
                    placeholder="Your Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                />
                <InputComponent
                    type="password"
                    name="password"
                    placeholder="Your password"
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                />

                <Styles.FLX mg="30px 0 30px 0">
                    <Link route="/forgot ">
                        <a className="forgot">Forgot your password?</a>
                    </Link>
                </Styles.FLX>
                <Styles.ButtonStyle bg="#1ba94c" color="#fff" type="submit" >
                    Login
		        </Styles.ButtonStyle>
            </Styles.SignInForm>
        )
    }
}


const mapStateToprops = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToprops, { loginUser })(GuestPage(signin));