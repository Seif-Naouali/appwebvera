import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import profileReducer from "./profileReducers";


export default combineReducers({
    auth: authReducer,
    userInfo:authReducer,
    totalDistances:profileReducer,
    distances_temps:profileReducer,
    distances:profileReducer,
    tempsByDate:profileReducer,
    tempsMinutes:profileReducer,
    temps:profileReducer,
    dist_temps:profileReducer,
    errors: errorReducer,
    best_score:profileReducer
});