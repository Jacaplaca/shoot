import axios from "axios";
import { GET_ERRORS, CONFIRMATION, TODELETE } from "./types";
// import { fetchTurnaments } from "./turnaments";
// import { fetchJudges } from "./judges";
import { fetchFromDB } from "./fetchFromDB";
import store from "../store";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";

export const deleteIdAndFetch = collection => async dispatch => {
  const myStore = await store.getState();

  const id = myStore.delete;

  axios
    .post(`/api/${collection}/remove/${id}`)
    .then(res => {
      dispatch(fetchFromDB(collection));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });

  dispatch({
    type: CONFIRMATION,
    payload: false
  });
  dispatch({ type: TODELETE, payload: null });
};
