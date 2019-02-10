import { LANGUAGE, GET_ERRORS } from "./types";

export const languageChange = state => dispatch => {
  console.log("LANGUAGE", state);
  dispatch({
    type: LANGUAGE,
    payload: state
  });
};
