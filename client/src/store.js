// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";
import { env } from "./env";

// const inititalState = {};

// const store = createStore(
//         rootReducer,
//         inititalState,
//         compose(applyMiddleware(thunk),
//                 window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

// export default store;

// const store = createStore(reducers, {}, composeWithDevTools((applyMiddleware(reduxThunk)));

const store =
  env === "dev"
    ? createStore(
        reducers,
        composeWithDevTools(
          applyMiddleware(reduxThunk)
          // other store enhancers if any
        )
      )
    : createStore(reducers, applyMiddleware(reduxThunk));

export default store;
