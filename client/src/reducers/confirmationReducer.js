import { CONFIRMATION } from "../actions/types";

const initialState = false;

export default function(state = initialState, action) {
  switch (action.type) {
    case CONFIRMATION:
      return action.payload;
    default:
      return state;
  }
}
