import { EDIT } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT:
      return action.payload;
    default:
      return state;
  }
}
