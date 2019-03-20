import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";
// import { env } from "./env";
//testowanie
// import localStorage from "./localStorage";
// import { fetchPromoters } from "./actions/promoters";
// import * as actions from './actions'

// import Navbar from "./components/Navbar";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import Home from "./components/Home";
// import Promoters from "./components/Promoters";

// window.localStorage = localStorage;
//koniec testowania

import MiniDrawer from "./skins/MiniDrawer";

import "bootstrap/dist/css/bootstrap.min.css";

// const token =
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMWI4YzFiMGNjZTdiMmY2MDIzMzJhYyIsIm5hbWUiOiJhYWEiLCJyb2xhIjoiYWRtaW4iLCJpYXQiOjE1NDc4MDk4OTgsImV4cCI6MTU1MDQwMTg5OH0.k3jObuPvEFu9MJm5nx06qOoN2gBigCyn6r9tjFUKR6I";
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  //dobre 2 linijki
  setAuthToken(token);
  const decoded = jwt_decode(token);
  //testowanie
  // setAuthToken(localStorage.jwtToken);
  // const decoded = jwt_decode(localStorage.jwtToken);
  //koniec testu
  console.log(decoded);

  store.dispatch(setCurrentUser(decoded));
  // store.dispatch(fetchPromoters(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  componentDidMount() {
    document.title = `Portal Strzelecki`;
  }

  render() {
    return (
      // <div
      //   style={{
      //     height: "100%",
      //     // minHeight: "100%",
      //     // zIndex: 1,
      //     // overflow: "hidden",
      //     // position: "relative",
      //     display: "flex"
      //   }}
      // >
      //   <div
      //     style={{
      //       display: "flex",
      //       backgroundColor: "yellow",
      //       flex: 1
      //     }}
      //   >
      //     sdsd
      //     </div>
      // </div>
      <Provider store={store}>
        <React.Fragment>
          <Router>
            {/* <Navbar /> */}
            {/* <div className="container"> */}
            <MiniDrawer>
              {/* <Route exact path="/" component={Promoters} /> */}
              {/* <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/organizatorzy"
                render={() => <Promoters title="Organizatorzy" />}
              /> */}
            </MiniDrawer>
            {/* </div> */}
          </Router>
          {/* <div
            style={{
              color: "white",
              zIndex: 34345,
              position: "sticky",
              bottom: 0
            }}
          >
            laksdjf
          </div> */}
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
