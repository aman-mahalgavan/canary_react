import { SET_CAMPAIGN } from "../actions/types";
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
        default:
            return state
    }
}