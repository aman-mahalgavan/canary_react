import { ERRORS } from "../actions/types";


const initialState = {
    errors: {}
};


export default (state = initialState, action) => {
    let { errors } = action;
    switch (action.type) {
        case ERRORS:
            return { ...errors }
        default:
            return state;
    }
}