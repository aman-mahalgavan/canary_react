import { SET_PROFILE } from "../actions/types";
import isEmpty from "../../utils/isEmpty";

const initialState = {
    userProfile: {}
};


export default (state = initialState, action) => {

    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                userProfile: action.profile

            }
        default:
            return state
    }
}