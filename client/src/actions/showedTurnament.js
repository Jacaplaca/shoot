import { SHOWEDTURNAMENT } from "./types";

export const showedTurnament = id => dispatch => {
  console.log("showedTurnament", id);

  dispatch({
    type: SHOWEDTURNAMENT,
    payload: id
  });
};
