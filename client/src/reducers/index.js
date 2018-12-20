import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import promotersReducer from "./promotersReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  promoters: promotersReducer
});
