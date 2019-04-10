import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import Styles from "../../styles/_index";
import { Link } from "../../routes";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Campaigns from "../../components/dashboard/Campaigns";

import privatePage from "../../components/hoc/PrivatePage";
import WithProfile from "../../components/hoc/WithProfile";

class dashboard extends Component {



    // static async getInitialProps(ctx) {
    //     try {
    //         await ctx.store.dispatch(getUserProfile());

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // Rendering the Dashboard Elements
    renderDashboard = () => {
        let { user } = this.props.auth;
        let { userProfile } = this.props.profile;
        let initialDashboard = (<Styles.DefaultDashboard>
            <h2>You Have'nt Created any profile yet</h2>
            <Link route="/dashboard/createProfile"><Styles.ButtonStyle bg="#1ba94c" color="#fff" width="200px" mg="5px 0 0 0">
                Create Profile
        </Styles.ButtonStyle></Link>
        </Styles.DefaultDashboard>
        )
        if (user.hasProfile) {
            return (
                <Styles.DashboardContainerStyle>
                    <DashboardLayout handle={userProfile.handle} />
                    <Campaigns />
                    <Styles.DashboardRightStyle space="150px"></Styles.DashboardRightStyle>
                </Styles.DashboardContainerStyle>

            );
        }
        else {
            return initialDashboard;
        }
    }
    render() {
        return (<section>
            {this.renderDashboard()}
        </section>)




    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
        profile: state.profile
    }
}
const FinalHoc = compose(privatePage, WithProfile);

export default connect(mapStateToProps)(FinalHoc(dashboard));