import React, { Component } from "react";
import { Router } from "../../routes";

import Redirect from "../../utils/redirect";



export default (Page) => {
    return class PrivatePage extends Component {

        static async getInitialProps(ctx) {

            let isAuthenticated = ctx.store.getState().auth.isAuthenticated;
            if (!isAuthenticated) {

                Redirect("/login", ctx);

            }
            else {

                if (Page.getInitialProps) {
                    return { ...await Page.getInitialProps(ctx) };
                }

            }

        }

        render() {
            return (
                <Page {...this.props} />
            )
        }
    }
}