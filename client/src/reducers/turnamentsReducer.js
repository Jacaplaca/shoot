import { TURNAMENTS } from "../actions/types";
// import isEmpty from '../validation/is-empty';

// const initialState = {
//     isAuthenticated: false,
//     user: {}
// }

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case TURNAMENTS:
      return action.payload;
    default:
      return state;
  }
}
