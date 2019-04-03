import React, { Component } from 'react';
import { connect } from "react-redux";

import privatePage from "../components/hoc/PrivatePage";
class dashboard extends Component {

    static async getInitialProps(ctx) {
        console.log(ctx.isServer);
        console.log(ctx.isServer ? "On Server" : "On Client");
    }
    render() {
        return (
            <div>
                <h1>This is Protected content</h1>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}


export default connect(mapStateToProps)(privatePage(dashboard));