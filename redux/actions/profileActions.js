import axios from "axios";
import { UPDATE_HAS_PROFILE, SET_PROFILE, ERRORS } from "./types";
import { Router } from "../../routes";
import { getCookieFromBrowser } from "../../utils/cookie";
import { formatToken } from "../../utils/formatToken";
import setDefaultHeader from "../../utils/setDefaultHeader";

const URI = "http://localhost:12000/api";



export const createUserProfile = (profileData) => async dispatch => {
    let data = new FormData();
    for (let key in profileData) {
        data.append(key, profileData[key]);
    }

    // setting the axios default headers in case the page is just reloaded
    setDefaultHeader();
    try {

        let res = await axios.post(`${URI}/profile/create`, data);
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


export const getUserProfile = () => async dispatch => {
    try {
        let res = await axios.get(`${URI}/profile`);

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