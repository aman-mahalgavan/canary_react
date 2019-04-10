
import axios from "axios";
import { SET_CAMPAIGN, ERRORS } from "./types";
import { Router } from "../../routes";
import setDefaultHeader from "../../utils/setDefaultHeader";
const URI = "http://localhost:12000/api";


export const createCampaign = (campaignData) => async dispatch => {

    let data = new FormData();
    for (let key in campaignData) {
        data.append(key, campaignData[key]);

    }

    setDefaultHeader();

    try {
        let res = await axios.post(`${URI}/campaign/create`, data);
        dispatch(setCampaign(res.data));
        Router.pushRoute("/dashboard");
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


export const setCampaign = (campaign) => {
    return {
        type: SET_CAMPAIGN,
        campaign
    }
}