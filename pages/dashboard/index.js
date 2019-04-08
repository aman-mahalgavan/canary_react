import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from "../../styles/_index";
import { Link } from "../../routes";



import privatePage from "../../components/hoc/PrivatePage";
class dashboard extends Component {











    // Rendering the Dashboard Elements
    renderDashboard = () => {
        let { user } = this.props.auth;

        let initialDashboard = (<Styles.DefaultDashboard>
            <h2>You Have'nt Created any profile yet</h2>
            <Link route="/dashboard/createProfile"><Styles.ButtonStyle bg="#1ba94c" color="#fff" width="200px" mg="5px 0 0 0">
                Create Profile
        </Styles.ButtonStyle></Link>
        </Styles.DefaultDashboard>
        )
        if (user.hasProfile) {
            return (<h1>User has a Profile</h1>);
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
        errors: state.errors
    }
}


export default connect(mapStateToProps)(privatePage(dashboard));