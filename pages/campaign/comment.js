import React, { Component } from 'react';
import CampaignLayout from "../../components/layouts/CampaignLayout";
import Styles from "../../styles/_index";
import { getCampaignByAddress, addComment } from "../../redux/actions/campaignAction";
import Campaign from "../../Ethereum/campaign";
import { connect } from "react-redux";
import TextAreaInputComponent from "../../components/partials/TextAreaInputComponent";
import { Router, Link } from "../../routes";
import CampaignNav from "../../components/partials/CampaignNav";
import CommentCard from "../../components/partials/CommentCard";
import WithBlockNumber from "../../components/hoc/WithBlockNumber";
class comment extends Component {

    static async getInitialProps(ctx) {

        try {
            ctx.store.dispatch(getCampaignByAddress(ctx.query.address));
            const campaign = Campaign(ctx.query.address);

            const summary = await campaign.methods.getSummary().call();

            return {
                minimumContribution: summary[0],
                balance: summary[1],
                requestCount: summary[2],
                contributors: summary[3],
                admin: summary[4],
                deadline: summary[5],
                goal: summary[6],
                address: ctx.query.address
            };
        } catch (err) {
            console.log(err);
        }
    }


    state = {
        comment: "",
        errors: {}
    }

    onChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    };

    onSubmit = async e => {
        e.preventDefault();
        let commentData = {
            address: this.props.address,
            comment: this.state.comment
        }
        if (this.state.comment) {
            await this.props.addComment(commentData, this.props.auth.token);
        }
    }

    renderComments = () => {
        return this.props.campaign.singleCampaign.comments.map((comment, index) => {
            return <CommentCard comment={comment} key={index} />
        })
    }

    render() {
        let { errors } = this.state;
        const { singleCampaign } = this.props.campaign;
        return (
            <CampaignLayout parentProps={this.props}>
                <Styles.CampaignBottomContent>

                    <CampaignNav comment="true" address={singleCampaign.campaignAddress} />
                    <main className="campaign-comment">

                        {this.props.auth.isAuthenticated ? (
                            <form className="comment-form" onSubmit={this.onSubmit}>

                                <TextAreaInputComponent
                                    placeholder="Write a Comment"

                                    value={this.state.comment}
                                    name="comment"
                                    error={errors.comment}
                                    onChange={this.onChange}
                                    height="100px"
                                />

                                <Styles.ButtonStyle bg="#1ba94c" color="#fff" type="submit" mg="5px 0" type="submit">Submit</Styles.ButtonStyle>
                            </form>
                        ) : (
                                <div className="logged-out">
                                    <p>Please <Link route="/login"><a>Login</a></Link> to comment</p>
                                </div>
                            )}
                        <div className="comments-display">
                            {this.renderComments()}
                        </div>

                    </main>
                </Styles.CampaignBottomContent>


            </CampaignLayout>
        )
    }
}


const mapStateToprops = state => {
    return {
        auth: state.auth,
        campaign: state.campaign
    }
}

export default connect(mapStateToprops, { addComment })(WithBlockNumber(comment));