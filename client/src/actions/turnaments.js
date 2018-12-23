import axios from "axios";
import { TURNAMENTS, GET_ERRORS } from "./types";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";

export const fetchTurnaments = user => dispatch => {
  console.log("fetchTurnaments");
  axios
    // .post("/api/promoters", user)
    .get("/api/turnaments")
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: TURNAMENTS,
        payload: res.data
      });
    })
    // .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
