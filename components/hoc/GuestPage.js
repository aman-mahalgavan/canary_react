import React, { Component } from "react";

import Redirect from "../../utils/redirect";



export default (Page) => {
    return class GuestPage extends Component {

        static async getInitialProps(ctx) {

            let isAuthenticated = ctx.store.getState().auth.isAuthenticated;
            if (isAuthenticated) {
                Redirect("/", ctx);
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