import {
    GET_PROFILE,
    BEST_SCORE_USER,
    GET_DISTANCE_USER_BY_DATE,
    GET_TOTAL_TEMPS_PARCOURUS,
    GET_ALL_DIST_TEMPS,
    GET_TEMPS_USER_BY_DATE,
    LOADING,FETCH_GAME_BY_DATE,
    GET_ALL_DISTANCES,
    GET_TOTAL_DISTANCE,
    GET_TEMPS_EN_MINUTES
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    distances: [],
    temps:[],
    distTem:[],
    tempsByDate:[],
    distances_temps:[],
    distancesByDate:[],
    loading: false,
    dist_temps:[],
    tempsMinutes:[],
    best_score:[]

};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PROFILE:
            return {
                ...state,
                profiles : action.payload,
                loading: false
            };
        case GET_ALL_DIST_TEMPS:
            return {
                ...state,
                distances_temps : action.payload,
                loading: false
            };
        case BEST_SCORE_USER:
            return {
                ...state,
                best_score: action.payload,
                loading:false
            };
        case GET_TEMPS_EN_MINUTES:
            return {
                ...state,
                tempsMinutes: action.payload,
                loading: false
            };
        case GET_DISTANCE_USER_BY_DATE:
            console.log(action.payload);
            return {
                ...state,
                distances : action.payload,
                loading: false
            };
        case FETCH_GAME_BY_DATE:
            console.log("GET GAME USER BY DATE", action.payload);
            return {
                ...state,
                dist_temps: action.payload,
                loading:false
            }
        case GET_TOTAL_DISTANCE:
            console.log(action.payload);
            return {
                ...state,
                totalDistances : action.payload,
                loading: false
            };
        case GET_ALL_DISTANCES:
            return {
                ...state,
                distancesByDate : action.payload,
                loading: false
            };
        case GET_TEMPS_USER_BY_DATE:
            console.log(action.payload);
            return {
                ...state,
                tempsByDate : action.payload,
                loading: false
            };
        case GET_TOTAL_TEMPS_PARCOURUS:
            return {
                ...state,
                temps : action.payload,
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}