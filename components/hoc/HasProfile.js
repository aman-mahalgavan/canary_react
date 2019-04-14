import React, { Component } from "react";


import Redirect from "../../utils/redirect";



export default (Page) => {
    return class HasProfile extends Component {

        static async getInitialProps(ctx) {

            let hasProfile = ctx.store.getState().auth.user.hasProfile;
            if (!hasProfile) {

                Redirect("/dashboard", ctx);

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