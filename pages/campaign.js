
import { Link } from "../routes";


import React, { Component } from 'react'

export default class campaign extends Component {

    static getInitialProps(ctx) {

        return {};
    }
    render() {
        return (
            <div>
                <div>
                    <h1>This is the home page</h1>
                    <Link route='/'>
                        <a>Go to Home</a>
                    </Link>
                </div>
            </div>
        )
    }
}
