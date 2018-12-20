import axios from "axios";
import { PROMOTERS, GET_ERRORS } from "./types";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";

export const fetchPromoters = user => dispatch => {
  console.log(user);
  axios
    // .post("/api/promoters", user)
    .get("/api/promoters")
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: PROMOTERS,
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
