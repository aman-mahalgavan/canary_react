import React, { Component } from 'react';
import CampaignLayout from "../../components/layouts/CampaignLayout";
import Styles from "../../styles/_index";
import { getCampaignByAddress, askQuestion, answerQuestion } from "../../redux/actions/campaignAction";
import Campaign from "../../Ethereum/campaign";
import { connect } from "react-redux";
import InputComponent from "../../components/partials/InputComponent";
import { Router, Link } from "../../routes";
import CampaignNav from "../../components/partials/CampaignNav";
import WithBlockNumber from "../../components/hoc/WithBlockNumber";
import FaqCard from "../../components/partials/FaqCard";
import isEmpty from "../../utils/isEmpty";
import compare from "../../utils/compareAddresses";



class faq extends Component {

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
        question: "",
        errors: {}
    }

    //handler function onChanging the input value everytime
    onChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState(() => {
            return {
                [name]: value
            };
        });
    };



    onQuestionSubmit = e => {
        e.preventDefault();
        if (this.state.question) {
            let data = {
                question: this.state.question,
                address: this.props.campaign.singleCampaign.campaignAddress
            }
            this.props.askQuestion(data, this.props.auth.token);
        }
    }


    renderFaqCards = () => {
        let { singleCampaign } = this.props.campaign;
        let isAdmin = compare(singleCampaign.creatorAddress, this.props.auth.user.address);
        if (!isEmpty(singleCampaign.faq)) {
            return singleCampaign.faq.map((element, index) => {
                return <FaqCard
                    isAdmin={isAdmin}
                    key={index}
                    faq={element}
                    address={singleCampaign.campaignAddress} />
            })
        }
        else {
            return (<p>No Faq Found</p>)
        }

    }

    render() {
        const { singleCampaign } = this.props.campaign;
        let { errors } = this.state;
        return (
            <CampaignLayout parentProps={this.props}>
                <Styles.CampaignBottomContent>

                    <CampaignNav faq="true" address={singleCampaign.campaignAddress} />
                    <main className="campaign-faq">
                        <div className="faq-left">
                            <h4>Frequently Asked Questions</h4>
                            {this.renderFaqCards()}

                        </div>
                        <div className="faq-right">
                            <Styles.VerticalDivider />
                            {this.props.auth.isAuthenticated ? (
                                <Styles.FormContainer onSubmit={this.onQuestionSubmit}>

                                    <InputComponent
                                        placeholder="Ask a question"
                                        type="text"
                                        value={this.state.question}
                                        name="question"
                                        error={errors.question}
                                        onChange={this.onChange}
                                    />
                                    <Styles.ButtonStyle bg="#1ba94c" color="#fff" type="submit" width="100px">
                                        Ask
                                </Styles.ButtonStyle>
                                </Styles.FormContainer>
                            ) : <div className="logged-out">
                                    <p>Please <Link route="/login"><a>Login</a></Link> to ask a Question</p>
                                </div>}
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

export default connect(mapStateToprops, { askQuestion })(WithBlockNumber(faq));