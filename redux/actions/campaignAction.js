
import axios from "axios";
import { SET_CAMPAIGN, SET_CAMPAIGNS, ERRORS } from "./types";
import { Router } from "../../routes";
import setDefaultHeader from "../../utils/setDefaultHeader";
const URI = "http://localhost:12000/api";



// creating a campaign
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

//Fetching all the campaigns from the backend
export const getAllCampaigns = () => async dispatch => {
    try {
        let res = await axios.get(`${URI}/campaign`);
        dispatch(setCampaigns(res.data));
        return res.data;
    } catch (err) {
        let { errors } = err.response.data;

        dispatch({
            type: ERRORS,
            errors
        });
    }
}

export const getCampaignByAddress = (address) => async dispatch => {
    try {
        let res = await axios.get(`${URI}/campaign/${address}`);
        dispatch(setSingleCampaign(res.data));
    } catch (err) {
        let { errors } = err.response.data;
        dispatch({
            type: ERRORS,
            errors
        });
    }
}



// Updating all the campaigns to the redux state
export const setCampaigns = (campaigns) => {
    return {
        type: SET_CAMPAIGNS,
        campaigns
    }
}


export const setSingleCampaign = (campaign) => {
    return {
        type: SET_CAMPAIGN,
        campaign
    }
}


// updating a single campaign to the redux state
export const setCampaign = (campaign) => {
    return {
        type: SET_CAMPAIGN,
        campaign
    }
}