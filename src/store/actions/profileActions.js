import {
  GET_PROFILE,
  BEST_SCORE_USER,
  GET_ALL_DIST_TEMPS,
  GET_TOTAL_TEMPS_PARCOURUS,

  LOADING,
  GET_DISTANCE_USER_BY_DATE,
  GET_TOTAL_DISTANCE,
  GET_TEMPS_EN_MINUTES,
  FETCH_GAME_BY_DATE
} from "./types";
import axios from 'axios/index';

// Get current profile
export const getCurrentProfile = () => dispatch => {

        dispatch(setProfileLoading());
        axios.get('/users/getGamerInfo')
            .then(res => {
                    dispatch({
                        type: GET_PROFILE,
                        payload: res.data
                    })
                }
            )
            .catch(err =>
                dispatch({
                    type: GET_PROFILE,
                    payload: {}
                })
            );

    };

export const getDistanceUserByDate = ()=>(dispatch)=>{
  dispatch(setProfileLoading());
  axios.get('/users/fetchDistanceDate')
    .then(res=>
    dispatch({
        type: GET_DISTANCE_USER_BY_DATE,
        payload: res.data
      }))

};


export const getGameInfo = ()=>(dispatch)=>{
    console.log("actions");
  dispatch(setProfileLoading());
  axios
    .get("/users/fetchGameByDate")
    .then(res => {
      dispatch({
        type: FETCH_GAME_BY_DATE,
        payload: res.data
      });
      console.log("GET GAME USER BY DATE", res.data)
    })
    .catch(
        // err =>
      // dispatch({
      //   type: FETCH_GAME_BY_DATE,
      //   payload: {}
      // })
    );
};

export const getTempsEnMinutes = () => dispatch => {

  dispatch(setProfileLoading());
  axios.get('/users/getAllTempsEnMinutes')
    .then(res => {
        dispatch({
          type: GET_TEMPS_EN_MINUTES,
          payload: res.data
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );

};

//get total temps parcourus
export const getTotalTempsParcourus = ()=>(dispatch)=>{
  dispatch(setProfileLoading());
  axios.get('/users/getAllTempsEnMinutes')
    .then(res=>
      dispatch({
        type: GET_TOTAL_TEMPS_PARCOURUS,
        payload: res.data
      }))

};


//get total distances parcourus
export const getTotalDistancesParcourus = ()=>(dispatch)=>{
  dispatch(setProfileLoading());
  axios.get('/users/CalculTotalDistances')
    .then( res =>{
  dispatch({
    type: GET_TOTAL_DISTANCE,
    payload: res.data
  })
  console.log( res.data);
}
  )
};


//get best score user
export const getBestScore = ()=>(dispatch)=>{
    console.log("best score");
  dispatch(setProfileLoading());
  axios.get('/users/BestScoreUser')
    .then( res =>{
        dispatch({
          type: BEST_SCORE_USER,
          payload: res.data
        });
        console.log( "best score",res.data);
      }
    )


};

//get liste distance et toal temps en minutes pour la chart
export const getDistancesTemps = ()=>(dispatch)=>{

  dispatch(setProfileLoading());
  axios
    .get("/users/getAllDistancesTemps")
    .then(res => {
      dispatch({
        type: GET_ALL_DIST_TEMPS,
        payload: res.data
      })
      console.log("ALLLL", res.data)
    })
    .catch(err =>
      dispatch({
        type: GET_ALL_DIST_TEMPS,
        payload: {}
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: LOADING
  };
};