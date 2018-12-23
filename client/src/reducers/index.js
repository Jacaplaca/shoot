import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import promotersReducer from "./promotersReducer";
import judgesReducer from "./judgesReducer";
import turnamentsReducer from "./turnamentsReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  promoters: promotersReducer,
  turnaments: turnamentsReducer,
  judges: judgesReducer
});
