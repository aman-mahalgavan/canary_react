import { Link } from "../../routes";
import Styles from "../../styles/_index";
import InputComponent from "../../components/partials/InputComponent";
import react, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import GuestPage from "../../components/hoc/GuestPage";





class signup extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        await this.props.registerUser(User);
    };

    render() {
        let { errors } = this.props
        return (
            <Styles.SignInForm onSubmit={this.onSubmit}>
                <Styles.SwitchTab>
                    <Link route="/login">
                        <a>Sign In</a>
                    </Link>
                    <Link route="/register">
                        <a className="active">Sign Up</a>
                    </Link>
                </Styles.SwitchTab>
                <InputComponent
                    placeholder="Your Name"
                    type="text"
                    value={this.state.name}
                    name="name"
                    error={errors.name}
                    onChange={this.onChange}
                />
                <InputComponent
                    placeholder="Your email"
                    type="email"
                    value={this.state.email}
                    name="email"
                    error={errors.email}
                    onChange={this.onChange}
                />
                <InputComponent
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    name="password"
                    error={errors.password}
                    onChange={this.onChange}
                />
                <InputComponent
                    placeholder="Confirm password"
                    type="password"
                    value={this.state.confirmPassword}
                    name="confirmPassword"
                    error={errors.confirmPassword}
                    onChange={this.onChange}
                />

                <Styles.ButtonStyle bg="#1ba94c" color="#fff" type="submit">
                    Create An Account
                </Styles.ButtonStyle>
            </Styles.SignInForm>
        );
    }
}




const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { registerUser })(GuestPage(signup));
