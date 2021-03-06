import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import * as actions from "../actions/authentication";

import TopNavBar from "./TopNavBar";
import DrawerMy from "./DrawerMy";
import MainContainer from "./MainContainer";

import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import Promoters from "../components/Promoters";
import Turnaments from "../components/Turnaments";
import Judges from "../components/Judges";
import Competitions from "../components/Competitions";
import Players from "../components/Players";
import PlayersScoresMain from "../components/PlayersScoresMain";
import MetryczkiMain from "../components/MetryczkiMain";
import Raport from "../components/Raport";
import Statement from "../components/Statement";
import Scores from "../components/Scores";
import Kontakt from "../components/Kontakt";
import Footer from "./Footer";
// import Players from "../components/Players";
//
// import Costs from "./Costs";
// import Planer from "./Planer";
// import PlanerRaport from "./PlanerRaporty";
// import Login from "./Login";
// import PromowaneProdukty from "./PromowaneProdukty";
// import NextReports from "./NextReports";

let drawerWidth = 240;

const styles = theme => ({
  root: {
    // flexGrow: 1,
    // height: 1000,
    // minHeight: "100%",
    // zIndex: 1,
    // overflow: "hidden",
    // position: "relative",
    // display: "flex",
    // backgroundColor: "red"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flex: 1,
    backgroundColor: "yellow"
    // backgroundColor: theme.palette.background.default
    //padding: theme.spacing.unit * 3
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: true
  };

  componentDidMount = () => {
    drawerWidth = this.props.auth.isAuthenticated !== false ? 240 : 0;
    document.title = `Portal Strzelecki`;
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickWhere = where => {
    this.props.clicked(where);
  };

  render() {
    // return <div>{this.props.children}</div>;
    const {
      classes,
      theme,
      auth: { user, isAuthenticated }
    } = this.props;
    // const routes = [
    //   {
    //     comp: "costs",
    //     path: "/costs",
    //     component: Costs,
    //     title: "Dodaj koszty"
    //   },
    //   {
    //     comp: "planer",
    //     path: "/planer",
    //     component: Planer,
    //     title: "Zaplanuj aktywności"
    //   },
    //   {
    //     comp: "raporty",
    //     path: "/raporty",
    //     component: PlanerRaport,
    //     title: "Dodaj raport z aktywności"
    //   },
    //   {
    //     comp: "nextReports",
    //     path: "/nextreports",
    //     component: NextReports,
    //     title: ""
    //   }
    // ];
    // console.log("domain", window.location.href);
    // console.log("pathname", window.location.pathname.split("/"));
    // console.log("user", auth.user);
    const path = window.location.pathname.split("/")[1];
    return (
      <BrowserRouter>
        <div className={classes.root}>
          {/* <Route exact path="/register" component={Register} /> */}
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/kontakt"
            render={() => (
              <MainContainer
                open={this.state.open}
                handleDrawerOpen={this.handleDrawerOpen}
              >
                <Kontakt title="Kontakt" />
              </MainContainer>
            )}
          />
          {(!isAuthenticated && path === "wyniki") ||
          path === "raport" ? null : (
            <TopNavBar
              // style={{ position: "absolute", righ: 34, top: 334 }}
              open={this.state.open}
              handleDrawerOpen={this.handleDrawerOpen}
            />
          )}

          <DrawerMy
            open={this.state.open}
            handleDrawerClose={this.handleDrawerClose}
          />

          <Route
            exact
            path="/wyniki"
            render={() => (
              // <MainContainer
              //   open={this.state.open}
              //   handleDrawerOpen={this.handleDrawerOpen}
              // >
              // </MainContainer>
              <Scores title="Zawody" />
            )}
          />

          {user.rola === "admin" && (
            <Route
              exact
              path="/organizatorzy"
              render={() => (
                <MainContainer
                  title={"Organizatorzy"}
                  open={this.state.open}
                  handleDrawerOpen={this.handleDrawerOpen}
                >
                  <Promoters title="Organizatorzy" />
                </MainContainer>
              )}
            />
          )}
          {/* {auth.user.rola === "admin" && (
            <Route
              exact
              path="/zawody"
              render={() => (
                <MainContainer
                  open={this.state.open}
                  handleDrawerOpen={this.handleDrawerOpen}
                >
                  <Turnaments title="Zawody" />
                </MainContainer>
              )}
            />
          )} */}
          {(user.rola === "admin" || user.rola === "promoter") && (
            <Route
              exact
              path="/zawody"
              render={() => (
                <MainContainer
                  title={"Zawody"}
                  open={this.state.open}
                  handleDrawerOpen={this.handleDrawerOpen}
                >
                  <Turnaments title="Zawody" />
                </MainContainer>
              )}
            />
          )}
          {user.rola === "admin" && (
            <Route
              exact
              path="/sedziowie"
              render={() => (
                <MainContainer
                  title={"Sędziowie"}
                  open={this.state.open}
                  handleDrawerOpen={this.handleDrawerOpen}
                >
                  <Judges title="Sędziowie" />
                </MainContainer>
              )}
            />
          )}
          <Route
            exact
            path="/wyniki_zawodnikow/:id"
            render={props => {
              console.log("route /wyniki_zawodnikow/", props);
              return (
                <MainContainer
                  title={"Wyniki"}
                  open={this.state.open}
                  handleDrawerOpen={this.handleDrawerOpen}
                >
                  <PlayersScoresMain
                    // title={props.match.params.id}
                    add={props.location.state}
                  />
                </MainContainer>
              );
            }}
          />
          <Route
            exact
            path="/komunikat/:id"
            render={props => {
              console.log("route /komunikat/", props);
              return (
                <MainContainer
                  title={"Komunikat z zawodów"}
                  open={this.state.open}
                  handleDrawerOpen={this.handleDrawerOpen}
                >
                  <Statement title="Komunikat" add={props.location.state} />
                </MainContainer>
              );
            }}
          />
          <Route
            exact
            path="/metryczki_zawodnikow/:id"
            render={props => {
              console.log("route", props);
              return (
                <MainContainer
                  open={this.state.open}
                  handleDrawerOpen={this.handleDrawerOpen}
                >
                  <MetryczkiMain
                    title={props.match.params.id}
                    add={props.location.state}
                  />
                </MainContainer>
              );
            }}
          />
          {user.rola === "admin" && (
            <Route
              exact
              path="/konkurencje"
              render={() => (
                <MainContainer
                  title={"Konkurencje"}
                  open={this.state.open}
                  handleDrawerOpen={this.handleDrawerOpen}
                >
                  <Competitions title="Konkurencje" />
                </MainContainer>
              )}
            />
          )}
          <Route
            exact
            path="/zawodnicy"
            render={() => (
              <MainContainer
                title={"Zawodnicy"}
                open={this.state.open}
                handleDrawerOpen={this.handleDrawerOpen}
              >
                <Players title="Zawodnicy" />
              </MainContainer>
            )}
          />
          {/* <main className={classes.content}>
            <div className={classes.toolbar} /> */}
          {/* {!auth ? (
              <Route path="/" exact component={Login} />
            ) : (
              <Route
                path="/"
                exact
                render={() => <PromowaneProdukty title="Produkty promowane" />}
              />
            )} */}
          {/* {routes.map((route, i) => {
              const { comp, path, component, title } = route;
              return auth && auth[comp] ? (
                <Route
                  key={i}
                  path={path}
                  render={() => (
                    <MyComponent title={title} component={component} />
                  )}
                />
              ) : null;
            })} */}
          {/* <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {auth.user.rola === "admin" && (
              <Route
                exact
                path="/organizatorzy"
                render={() => <Promoters title="Organizatorzy" />}
              />
            )} */}
          {/* {this.props.children} */}

          {/* </main> */}
          {/* <Route exact path="/register" component={Register} /> */}
          {(!isAuthenticated && path === "wyniki") || path === "raport" || (
            <Footer />
          )}
        </div>
      </BrowserRouter>
    );
  }
}

MiniDrawer.propTypes = {
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    actions
  )(MiniDrawer)
);
