import { SET_CURRENT_USER } from "./types";
import { ERRORS } from "./types";
import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";
import { setCookie, removeCookie } from "../../utils/cookie";


// logging in a user(getting the authgorization token)
export const loginUser = userData => async (dispatch) => {
    try {
        let res = await axios.post("http://localhost:12000/api/auth/login", userData);
        let { token } = res.data;
        setCookie("authorization", token);
        setAuthToken(token);
        let user = await fetchUser();

        dispatch(setCurrentUser(user));
    } catch (err) {
        let errors = {};
        if (err.response.data = "Unauthorized") {
            errors.unauthorized = "Invalid Token";
        }
        else { errors = err.response.data.errors }
        dispatch({
            type: ERRORS,
            errors
        });
    }
}



// again fetching and setting the user
export const resetUser = token => async (dispatch) => {
    try {

        let user = await fetchUser();

        dispatch(setCurrentUser(user));
    } catch (err) {
        let errors = {};
        if (err.response.data = "Unauthorized") {
            errors.unauthorized = "Invalid Token";
        }
        else { errors = err.response.data.errors }
        dispatch({
            type: ERRORS,
            errors
        });
    }
}


//logging out the user
export const logoutUser = () => dispatch => {
    setAuthToken();
    removeCookie("authorization");
    dispatch(setCurrentUser({}));

}

//fetching the user using the token
export const fetchUser = async () => {

    let res = await axios.get("http://localhost:12000/api/auth/user");

    return res.data;

}


// setting the current user in the redux store
export const setCurrentUser = user => {
    return {
        type: SET_CURRENT_USER,
        user
    };
};


