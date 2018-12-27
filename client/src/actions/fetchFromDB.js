import axios from "axios";
import {
  TURNAMENTS,
  JUDGES,
  GET_ERRORS,
  PROMOTERS,
  EDIT,
  PLAYERS
} from "./types";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";

export const fetchFromDB = (collection, filter, id) => dispatch => {
  let url;
  let type;

  console.log("fetchFromDB", collection, filter, id);

  switch (collection) {
    case "turnaments":
      url = `/api/turnaments`;
      type = TURNAMENTS;
      break;
    case "judges":
      url = `/api/judges`;
      type = JUDGES;
      break;
    case "promoters":
      url = `/api/promoters`;
      type = PROMOTERS;
      break;
    case "players":
      url = `/api/players/turnament/${id}`;
      type = PLAYERS;
      break;
    default:
  }
  // console.log("fetchFromDB()", collection, url, type);

  // console.log("fetchTurnaments");
  axios
    .get(url)
    .then(res => {
      dispatch({
        type,
        payload: res.data
      });
    })
    .then(() => {
      dispatch({
        type: EDIT,
        payload: null
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
