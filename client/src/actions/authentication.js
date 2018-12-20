import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, PROMOTERS } from "./types";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (user, history) => dispatch => {
  console.log("registerUser");
  axios
    .post("/api/users/register", user)
    .then(res => {
      axios.get("/api/promoters/").then(response => {
        // console.log("axios register promoters", response);
        dispatch({ type: PROMOTERS, payload: response.data });
      });
    })
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .then(res => {
      axios.get("/api/promoters/").then(response => {
        // console.log(response);
        dispatch({ type: PROMOTERS, payload: response.data });
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => dispatch => {
  // console.log("decoded", decoded);
  if (decoded.rola === "admin") {
    console.log("kto jest", decoded.rola);
    axios.get("/api/promoters/").then(response => {
      // console.log(response);
      dispatch({ type: PROMOTERS, payload: response.data });
    });
  }
  console.log("setCurrentUser po adminie");
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
  // return {
  //   type: SET_CURRENT_USER,
  //   payload: decoded
  // };
};

export const logoutUser = history => dispatch => {
  console.log(history);
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history && history.push("/login");
};
