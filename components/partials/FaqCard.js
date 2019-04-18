import React, { Component } from 'react';
import Styles from "../../styles/_index";
import InputComponent from "../../components/partials/InputComponent";
import { answerQuestion } from "../../redux/actions/campaignAction";

import { connect } from "react-redux";

class FaqCard extends Component {


    state = {
        openBox: false,
        answer: ""
    }

    onClick = e => {
        this.setState((prevState) => ({ openBox: !prevState.openBox }))
    }


    onSubmit = e => {
        e.preventDefault();
        let { faqId } = this.props.faq;
        if (this.state.answer) {
            let data = {
                answer: this.state.answer,
                id: faqId._id,
                address: this.props.address
            }
            this.props.answerQuestion(data, this.props.auth.token);
        }
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


    render() {
        let { faqId } = this.props.faq;
        return (
            <Styles.FaqCard >

                <div className="faq-container" onClick={this.onClick}>
                    <h3>{faqId.question}</h3>

                    <i className={this.state.openBox ? "fas fa-arrow-down" : "fas fa-arrow-right"}></i>
                </div>

                {this.state.openBox ? (
                    faqId.answer ? <p style={{ marginTop: "20px", color: "grey" }}>{faqId.answer}</p> : (this.props.isAdmin ? (
                        <Styles.FormContainer onSubmit={this.onSubmit}>
                            <InputComponent
                                placeholder="Answer this question"
                                type="text"
                                value={this.state.answer}
                                name="answer"

                                onChange={this.onChange}
                            />
                            <Styles.ButtonStyle bg="#1ba94c" color="#fff" type="submit" width="100px">Answer</Styles.ButtonStyle>

                        </Styles.FormContainer>
                    ) : <h3 style={{ marginTop: "20px", color: "grey" }}>Not answered Yet</h3>)
                ) : null}

            </Styles.FaqCard>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { answerQuestion })(FaqCard);