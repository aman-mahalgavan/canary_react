import { SET_CURRENT_USER, SET_TOKEN } from "./types";
import { ERRORS } from "./types";
import axios from "axios";
import { Router } from "../../routes";
import { formatToken } from "../../utils/formatToken";

import { setCookie, removeCookie, getCookieFromBrowser } from "../../utils/cookie";


const URI = "http://localhost:12000/api";

// logging in a user(getting the authgorization token)
export const loginUser = userData => async (dispatch) => {
    try {
        let res = await axios.post(`${URI}/auth/login`, userData);
        let { token } = res.data;
        setCookie("authorization", token);

        let user = await fetchUser(token);
        dispatch(setToken(token));
        dispatch(setCurrentUser(user));
        Router.pushRoute("/dashboard");
    } catch (err) {
        let { errors } = err.response.data;

        dispatch({
            type: ERRORS,
            errors
        });
    }
}


//registering a user
export const registerUser = userData => async (dispatch) => {
    try {
        let res = await axios.post(`${URI}/auth/register`, userData);
        Router.pushRoute("/login");

    } catch (err) {
        console.log(err);
        let { errors } = err.response.data;

        dispatch({
            type: ERRORS,
            errors
        });
    }
}



// again fetching and setting the user
export const resetUser = token => async (dispatch) => {
    try {

        let user = await fetchUser(token);

        dispatch(setCurrentUser(user));
    } catch (err) {
        let errors = {};
        if (err.response.data === "Unauthorized") {
            errors.unauthorized = "Invalid Token";
        }
        else { errors = err.response.data.errors }
        dispatch({
            type: ERRORS,
            errors
        });
    }
}


// getting the password reset token 
export const sendResetToken = (email) => async dispatch => {
    try {
        let res = await axios.post(`${URI}/auth/forgot`, { email });
        alert(res.data.msg);

    } catch (err) {
        let { errors } = err.response.data;
        dispatch({
            type: ERRORS,
            errors
        });
    }
}



// resetting the user password
export const resetUserPassword = (data) => async dispatch => {
    try {
        let res = await axios.post(`${URI}/auth/reset`, data);
        console.log(res.data);
        alert(res.data.message);
        Router.pushRoute("/login");
    } catch (err) {
        let { errors } = err.response.data;
        alert(errors.message);
        dispatch({
            type: ERRORS,
            errors
        });
    }
}


//logging out the user
export const logoutUser = () => dispatch => {

    removeCookie("authorization");
    dispatch(setCurrentUser({}));
    dispatch(setToken(""));
    Router.pushRoute("/login");
}



//confirming the account(email verification)

export const confirmAccount = (token) => async dispatch => {
    try {
        console.log(token);
        let res = await axios.get(`${URI}/auth/confirmation/${token}`);

        setTimeout(() => {
            Router.pushRoute("/login")
        }, 3000);
    } catch (err) {
        let { errors } = err.response.data;
        dispatch({
            type: ERRORS,
            errors
        });
    }

}


//Connecting the Ethereum address to the User
export const updateAddress = (address) => async dispatch => {
    try {

        let token = getCookieFromBrowser("authorization");
        let formattedToken = formatToken(token);
        let headers = { "authorization": token }
        let res = await axios.post(`${URI}/auth/updateAddress`, { address }, { headers });

        Router.pushRoute("/dashboard");
    } catch (err) {
        let errors = {};
        if (err.response.data === "Unauthorized") {
            errors.unauthorized = "Invalid Token";
        }
        else { errors = err.response.data.errors }
        dispatch({
            type: ERRORS,
            errors
        });
    }
}

//fetching the user using the token
export const fetchUser = async (token) => {

    let headers = { authorization: token }
    let res = await axios.get(`${URI}/auth/user`, { headers });
    return res.data;


}

export const setToken = token => {
    return {
        type: SET_TOKEN,
        token
    }
}


// setting the current user in the redux store
export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user
    };
};


