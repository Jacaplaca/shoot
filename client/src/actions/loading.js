import { LOADING, GET_ERRORS } from "./types";

export const confirmationAction = state => dispatch => {
  console.log("LOADING", state);
  dispatch({
    type: LOADING,
    payload: state
  });
};
