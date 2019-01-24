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

export const fetchFromDB = (collection, get, id) => dispatch => {
  let url;
  let type;

  // console.log("fetchFromDB", collection, get, id);

  switch (collection) {
    case "turnaments":
      url = get || `/api/turnaments`;
      type = TURNAMENTS;
      break;
    case "competitions":
      console.log("jest competitions?");
      url = get || `/api/turnaments`;
      type = TURNAMENTS;
      break;
    case "judges":
      url = get || `/api/judges`;
      type = JUDGES;
      // (url = get), (type = collection.toUpperCase());
      break;
    case "promoters":
      url = get || `/api/promoters`;
      type = PROMOTERS;
      break;
    case "players":
      // console.log("fetchFromDB");
      url = get || `/api/${collection}/turnament/${id}`;
      type = PLAYERS;
      break;
    case "score":
      // console.log("fetchFromDB");
      url = get;
      type = PLAYERS;
      break;
    default:
  }
  // console.log("fetchFromDB()", collection, url, type);

  // console.log("fetchTurnaments");
  axios
    .get(url)
    .then(res => {
      let fromDB = [];
      if (collection === "turnaments") {
        fromDB = res.data.map(turn =>
          Object.assign(turn, {
            promoterName: turn.promoter.name
          })
        );
      } else {
        fromDB = res.data;
      }
      dispatch({
        type,
        payload: fromDB
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
