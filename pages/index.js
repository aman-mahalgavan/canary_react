
import { Link } from "../routes";
import GuestPage from "../components/hoc/GuestPage";
import Styles from "../styles/_index";



import React, { Component } from 'react'

class index extends Component {

    static getInitialProps(ctx) {
        console.log(ctx.req ? "On Server" : "On Client");
        return {};
    }
    render() {
        return (
            <Styles.HomePage>
                <div className="content">
                    <h1>Welcome To Canary</h1>
                    <p>Canary is a Decentralized Social Funding platform powered by the Ethereum Blockchain.We intend to bring transparency in social funding services</p>
                    <Link route="/explore"><Styles.ButtonStyle bg="#009E74" color="#fff" width="200px" mg="30px 0 0 0">Explore</Styles.ButtonStyle></Link>
                </div>
            </Styles.HomePage>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default GuestPage(index);