
import { Link } from "../routes";
import GuestPage from "../components/hoc/GuestPage";


import React, { Component } from 'react'

class index extends Component {

    static getInitialProps(ctx) {
        console.log(ctx.req ? "On Server" : "On Client");
        return {};
    }
    render() {
        return (
            <div>
                <div>
                    <h1>This is the home page</h1>
                    <Link route='/campaign'>
                        <a>Go to campaign</a>
                    </Link>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default GuestPage(index);