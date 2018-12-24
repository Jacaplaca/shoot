import axios from "axios";
import { TURNAMENTS, EDIT, GET_ERRORS } from "./types";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";

export const editFetch = (collection, id) => dispatch => {
  console.log("edit");

  // let dispatchType;
  //
  // switch (collection) {
  //   case "turnaments":
  //     dispatchType = TURNAMENTS;
  //     break;
  //   default:
  // }

  const url = `/api/${collection}/${id}`;
  axios
    .get(url)
    .then(res => {
      dispatch({
        type: EDIT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });

  // axios
  //   // .post("/api/promoters", user)
  //   .get("/api/turnaments")
  //   .then(res => {
  //     // console.log(res.data);
  //     dispatch({
  //       type: TURNAMENTS,
  //       payload: res.data
  //     });
  //   })
  //   // .then(res => history.push("/login"))
  //   .catch(err => {
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     });
  //   });
};
