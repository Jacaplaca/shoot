import { CONFIRMATION, GET_ERRORS } from "./types";

export const confirmationAction = state => dispatch => {
  console.log("CONFIRMATION", state);
  dispatch({
    type: CONFIRMATION,
    payload: state
  });
};
