import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";
import { fetchPromoters } from "./actions/promoters";

// import Navbar from "./components/Navbar";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import Home from "./components/Home";
// import Promoters from "./components/Promoters";

import MiniDrawer from "./skins/MiniDrawer";

import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  // store.dispatch(fetchPromoters(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
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
        <Router>
          <React.Fragment>
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
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
