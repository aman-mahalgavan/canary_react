import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "./reducers/index";
import thunk from "redux-thunk";

let middleware = [thunk];

export default (initialState = {}) => {
    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(
            applyMiddleware(...middleware)
        ));
    return store;
};