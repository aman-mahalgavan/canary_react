import React, { Component } from "react";
import { getUserProfile } from "../../redux/actions/profileActions";




export default (Page) => {
  return class WithProfile extends Component {

    static async getInitialProps(ctx) {


      if (ctx.token) {
        try {
          await ctx.store.dispatch(getUserProfile(ctx.token));


        } catch (err) {
          console.log(err);
        }

      }

      if (Page.getInitialProps) {
        return { ...await Page.getInitialProps(ctx) };
      }
      return {}

    }

    render() {
      return (
        <Page {...this.props} />
      )
    }
  }
}