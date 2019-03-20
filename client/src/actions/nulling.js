import {
  TURNAMENTS,
  JUDGES,
  GET_ERRORS,
  PROMOTERS,
  EDIT,
  PLAYERS,
  LOADING
} from "./types";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";

export const nulling = collection => dispatch => {
  console.log("nulling", collection);
  let payload = [];
  let type;

  switch (collection) {
    case "turnaments":
      console.log("jest turnaments?");
      payload = [];
      type = TURNAMENTS;
      break;
    case "turnamentsOpen":
      payload = [];
      type = TURNAMENTS;
      break;
    case "competitions":
      console.log("jest competitions?");
      payload = [];
      type = TURNAMENTS;
      break;
    case "judges":
      payload = [];
      type = JUDGES;
      // (url = get), (type = collection.toUpperCase());
      break;
    case "promoters":
      payload = [];
      type = PROMOTERS;
      break;
    case "players":
      // console.log("fetchFromDB");
      payload = [];
      type = PLAYERS;
      break;
    case "playersopen":
      // console.log("fetchFromDB");
      payload = [];
      type = PLAYERS;
      break;
    case "score":
      // console.log("fetchFromDB");
      payload = [];
      type = PLAYERS;
      break;
    default:
  }
  // console.log("fetchFromDB()", collection, url, type);

  // console.log("fetchTurnaments");

  dispatch({
    type,
    payload
  });
};
