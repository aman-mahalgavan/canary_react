import axios from "axios";
import { UPDATE_HAS_PROFILE, SET_PROFILE, ERRORS } from "./types";
import { Router } from "../../routes";
import { getCookieFromBrowser } from "../../utils/cookie";
import { formatToken } from "../../utils/formatToken";

const URI = "http://localhost:12000/api";



export const createUserProfile = (profileData) => async dispatch => {
    let data = new FormData();
    for (let key in profileData) {
        data.append(key, profileData[key]);
    }

    let token = getCookieFromBrowser("authorization");
    let formattedToken = formatToken(token);
    let headers = { "authorization": token }
    try {

        let res = await axios.post(`${URI}/profile/create`, data, { headers: headers });
        dispatch(setProfile(res.data));

        Router.replace("/dashboard");
    } catch (err) {
        console.log(err.response.data);
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