import { SET_CAMPAIGN, SET_CAMPAIGNS } from "../actions/types";
import isEmpty from "../../utils/isEmpty";

const initialState = {
    singleCampaign: {},
    campaigns: []
};


export default (state = initialState, action) => {

    switch (action.type) {
        case SET_CAMPAIGN:
            return {
                ...state,
                singleCampaign: action.campaign

            }
        case SET_CAMPAIGNS:
            return {
                ...state,
                campaigns: action.campaigns
            }
        default:
            return state
    }
}