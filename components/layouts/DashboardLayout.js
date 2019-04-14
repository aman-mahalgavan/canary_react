import React, { Component } from 'react';
import Styles from "../../styles/_index";
import { connect } from "react-redux";
import { updateAddress } from "../../redux/actions/authActions";
import colors from "../../styles/colors";
import getAccount from "../../utils/getAccount";

class DashboardLayout extends Component {


    connectToEthereum = async (e) => {
        try {
            let currentAccount = await getAccount();
            console.log(currentAccount);
            await this.props.updateAddress(currentAccount);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        let { name, avatar, address } = this.props.user;
        let { handle } = this.props;
        return (
            <Styles.DashboardLeftContent>
                <div className="profile-box">
                    <img src={avatar} alt="" />
                    <h2>{name}</h2>
                    <span>@{handle}</span>
                    <br></br>
                    <Styles.AnchorButton width="80%" display="inline-block" color={colors.Theme_green} >
                        Edit Profile
     </Styles.AnchorButton>
                </div>
                <div className="extra-info">
                    <h2>Etherum Address</h2>
                    {address ?
                        (<span>{address}</span>) :
                        (<Styles.AnchorButton width="80%" display="inline-block" color={colors.Theme_green} onClick={this.connectToEthereum}>
                            Connect
                        </Styles.AnchorButton>)}
                </div>


            </Styles.DashboardLeftContent>
        )
    }
}


const maspStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(maspStateToProps, { updateAddress })(DashboardLayout)