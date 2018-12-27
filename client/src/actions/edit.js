import axios from "axios";
import { EDIT, GET_ERRORS } from "./types";

export const editFetch = (collection, id) => dispatch => {
  console.log("edit", collection, id);
  if (!collection) {
    dispatch({
      type: EDIT,
      payload: null
    });
  } else {
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
  }
};
