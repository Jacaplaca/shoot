import { TODELETE, GET_ERRORS, CONFIRMATION } from "./types";

export const toDeleteAction = id => dispatch => {
  console.log("toDeleteAction", id);
  if (id !== null) {
    dispatch({
      type: CONFIRMATION,
      payload: true
    });
  }
  dispatch({
    type: TODELETE,
    payload: id
  });
};
