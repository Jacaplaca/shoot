import { LOADING, GET_ERRORS } from "./types";

export const loadingAction = state => dispatch => {
  console.log("LOADING", state);
  dispatch({
    type: LOADING,
    payload: state
  });
};
