import { TODELETE } from "../actions/types";

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case TODELETE:
      return action.payload;
    default:
      return state;
  }
}
