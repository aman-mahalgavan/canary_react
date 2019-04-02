import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../redux/actions/authActions";
import Layout from "../components/layouts/testNav";

class signIn extends Component {
    static async getInitialProps(ctx) {
        return {};
    }

    handleClick = async () => {
        let data = {
            email: "ankitbrahmbhatt1997@gmail.com",
            password: "Enterthevoid@123"
        }

        this.props.loginUser(data);
    }

    handlelogout = () => {
        this.props.logoutUser();
    }
    render() {
        return (
            <Layout {...this.props} >
                <div>
                    <h1>This is the Signin page</h1>
                    <button onClick={this.handleClick}>SignIn</button>
                    {this.props.auth ? "True" : "False"}
                </div>

            </Layout>
        )
    }
}


const mapStateToprops = (state) => {
    return { auth: state.auth }
}

export default connect(mapStateToprops, { loginUser, logoutUser })(signIn);