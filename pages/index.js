
import { Link } from "../routes";

import React, { Component } from 'react'

export default class index extends Component {

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
