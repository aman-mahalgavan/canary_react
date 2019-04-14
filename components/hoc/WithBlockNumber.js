import React, { Component } from 'react';
import web3 from "../../Ethereum/web3";

export default (Page) => {
    return class WithBlockNumber extends Component {
        static async getInitialProps(ctx) {
            let blockNumber = await web3.eth.getBlockNumber();
            if (Page.getInitialProps) {
                return { ...await Page.getInitialProps(ctx), blockNumber };
            }
            else {
                return { blockNumber }
            }

        }

        render() {
            return (
                <Page {...this.props} />
            )
        }
    }
}