
import axios from "axios";
import { SET_CAMPAIGN, SET_CAMPAIGNS, ERRORS } from "./types";
import { Router } from "../../routes";
import getAuthToken from "../../utils/getAuthToken";
const URI = "http://localhost:12000/api";



// creating a campaign
export const createCampaign = (campaignData, token) => async dispatch => {

    let data = new FormData();
    for (let key in campaignData) {
        data.append(key, campaignData[key]);

    }

    let headers = { authorization: token }

    try {
        let res = await axios.post(`${URI}/campaign/create`, data, { headers });
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

export const contribute = (address, token) => async dispatch => {
    let headers = { authorization: token }
    try {
        let res = await axios.post(`${URI}/campaign/contribute`, { address }, { headers });
        Router.replaceRoute(`/campaign/${address}`);
    }
    catch (err) {

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


export const addComment = (data, token) => async dispatch => {
    let { address } = data;
    let headers = { authorization: token }
    try {
        await axios.post(`${URI}/campaign/comment`, data, { headers });
        Router.replaceRoute(`/campaign/${address}/comments`);
    }
    catch (err) {

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


export const addUpdate = (updateData, token) => async dispatch => {

    let data = new FormData();
    for (let key in updateData) {
        data.append(key, updateData[key]);

    }

    let headers = { authorization: token }

    try {
        let res = await axios.post(`${URI}/campaign/update`, data, { headers });

        Router.pushRoute(`/campaign/${updateData.address}/updates`);
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


export const askQuestion = (data, token) => async dispatch => {
    let { address } = data;
    let headers = { authorization: token }
    try {
        await axios.post(`${URI}/campaign/question`, data, { headers });
        Router.replaceRoute(`/campaign/${address}/faqs`);
    }
    catch (err) {

        let errors = {};

        if (err.response.data === "Unauthorized") {
            errors.unauthorized = "Invalid Token";
            alert(errors.unauthorized);
        }
        else {
            errors = err.response.data.errors
        }
        alert(errors.message);
        dispatch({
            type: ERRORS,
            errors
        });
    }
}


export const answerQuestion = (data, token) => async dispatch => {
    let { address } = data;
    let headers = { authorization: token }
    try {
        await axios.post(`${URI}/campaign/answer`, data, { headers });
        Router.replaceRoute(`/campaign/${address}/faqs`);
    }
    catch (err) {

        let errors = {};

        if (err.response.data === "Unauthorized") {
            errors.unauthorized = "Invalid Token";
            alert(errors.unauthorized);
        }
        else {
            errors = err.response.data.errors
        }
        alert(errors.message);
        dispatch({
            type: ERRORS,
            errors
        });
    }
}

export const getUpdateById = (id) => async dispatch => {
    try {

        let res = await axios.get(`${URI}/campaign/update/${id}`);
        return res.data
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