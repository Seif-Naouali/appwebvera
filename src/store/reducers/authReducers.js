import {
    SET_CURRENT_USER,
    USER_LOADING,
    GET_USER_INFO
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    userInfo:{}
};
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log(action.payload);
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            };
        default:
            return state;
    }
}