import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import promotersReducer from "./promotersReducer";
import judgesReducer from "./judgesReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  promoters: promotersReducer,
  judges: judgesReducer
});
