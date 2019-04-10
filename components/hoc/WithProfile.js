import React, { Component } from "react";
import { getUserProfile } from "../../redux/actions/profileActions";




export default (Page) => {
  return class WithProfile extends Component {

    static async getInitialProps(ctx) {


      try {
        await ctx.store.dispatch(getUserProfile());

        if (Page.getInitialProps) {
          return { ...await Page.getInitialProps(ctx) };
        }
        return {}

      } catch (err) {
        console.log(err);
      }


    }

    render() {
      return (
        <Page {...this.props} />
      )
    }
  }
}