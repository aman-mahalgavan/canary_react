import axios from "axios";
import { UPDATE_HAS_PROFILE, SET_PROFILE, ERRORS } from "./types";
import { Router } from "../../routes";
import { getCookieFromBrowser } from "../../utils/cookie";
import { formatToken } from "../../utils/formatToken";
import setDefaultHeader from "../../utils/getAuthToken";

const URI = "http://localhost:12000/api";



export const createUserProfile = (profileData, token) => async dispatch => {
    let data = new FormData();
    for (let key in profileData) {
        data.append(key, profileData[key]);
    }

    // setting the axios default headers in case the page is just reloaded
    let headers = { authorization: token }

    try {

        let res = await axios.post(`${URI}/profile/create`, data, { headers });
        dispatch(setProfile(res.data));

        Router.replace("/dashboard");
    } catch (err) {

        let errors = {};

        if (err.response.data === "Unauthorized") {
            errors.unauthorized = "Invalid Token";
        }
        else {
            errors = err.response.data.errors
        }

        dispatch({
            type: ERRORS,
            errors
        });
    }
}


export const editUserProfile = (profileData, token) => async dispatch => {
    let data = new FormData();
    for (let key in profileData) {
        data.append(key, profileData[key]);
    }

    // setting the axios default headers in case the page is just reloaded
    let headers = { authorization: token }

    try {

        let res = await axios.put(`${URI}/profile/edit`, data, { headers });
        dispatch(setProfile(res.data));

        Router.replace("/dashboard");
    } catch (err) {

        let errors = {};

        if (err.response.data === "Unauthorized") {
            errors.unauthorized = "Invalid Token";
        }
        else {
            errors = err.response.data.errors
        }

        dispatch({
            type: ERRORS,
            errors
        });
    }
}

export const getUserProfile = (token) => async dispatch => {

    let headers = { authorization: token };
    try {
        let res = await axios.get(`${URI}/profile`, { headers });

        dispatch(setProfile(res.data));


    } catch (err) {
        let errors = {};

        if (err.response.data === "Unauthorized") {
            errors.unauthorized = "Invalid Token";
        }
        else {
            errors = err.response.data.errors
        }

        dispatch({
            type: ERRORS,
            errors
        });
    }
}

const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        profile
    }
}