import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import promotersReducer from "./promotersReducer";
import judgesReducer from "./judgesReducer";
import turnamentsReducer from "./turnamentsReducer";
import editReducer from "./editReducer";
import toDeleteReducer from "./toDeleteReducer";
import confirmationReducer from "./confirmationReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  promoters: promotersReducer,
  turnaments: turnamentsReducer,
  judges: judgesReducer,
  edit: editReducer,
  delete: toDeleteReducer,
  confirmation: confirmationReducer
});
