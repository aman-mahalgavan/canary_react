import React, { Component } from 'react';
import Styles from "../../styles/_index";
import { connect } from "react-redux";
import { confirmAccount } from "../../redux/actions/authActions";



const confirmation = (props) => {

    return (
        <div>
            <Styles.ButtonStyle bg="#1ba94c" color="#fff" width="100px" onClick={(e) => {
                props.confirmAccount(props.token);
            }}>
                Verify Account
      </Styles.ButtonStyle>
        </div>
    )
}

confirmation.getInitialProps = async ({ query }) => {
    let { token } = query;

    return {
        token
    }
}


export default connect(null, { confirmAccount })(confirmation);