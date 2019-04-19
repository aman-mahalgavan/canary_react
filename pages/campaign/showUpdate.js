import React, { Component } from 'react';
import { getUpdateById } from "../../redux/actions/campaignAction";
import Styles from "../../styles/_index";
import moment from "moment"
export default class showUpdate extends Component {


    static async getInitialProps(ctx) {
        let { updateId } = ctx.query;

        let update = await ctx.store.dispatch(getUpdateById(updateId));

        return {
            update
        }
    }


    render() {
        let { update } = this.props;
        return (

            <Styles.UpdateContainer >
                <h2>{update.heading}</h2>
                <span>{moment(update.date).format(" MMMM Do YYYY")}</span>
                <img src={update.image} alt="" />
                <p>{update.details}</p>
            </Styles.UpdateContainer>

        )
    }
}
