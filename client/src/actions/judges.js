import axios from "axios";
import { JUDGES, GET_ERRORS } from "./types";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";

export const fetchJudges = user => dispatch => {
  console.log(user);
  axios
    // .post("/api/promoters", user)
    .get("/api/judges")
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: JUDGES,
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
