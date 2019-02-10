import { LANGUAGE } from "../actions/types";

// const initialState = false;

export default function(state = "pl", action) {
  switch (action.type) {
    case LANGUAGE:
      return action.payload;

    default:
      return state;
  }
}
