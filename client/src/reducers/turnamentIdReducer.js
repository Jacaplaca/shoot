import { SHOWEDTURNAMENT } from "../actions/types";
// import isEmpty from '../validation/is-empty';

// const initialState = {
//     isAuthenticated: false,
//     user: {}
// }

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOWEDTURNAMENT:
      return action.payload;
    default:
      return state;
  }
}
