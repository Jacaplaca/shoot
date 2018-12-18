import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import * as actions from "../actions/authentication";

import TopNavBar from "./TopNavBar";
import DrawerMy from "./DrawerMy";
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
    height: "100%",
    // minHeight: "100%",
    // zIndex: 1,
    // overflow: "hidden",
    // position: "relative",
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    // flexGrow: 1,
    display: "flex",
    flex: 1,
    // backgroundColor: "yellow"
    backgroundColor: theme.palette.background.default
    //padding: theme.spacing.unit * 3
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: true
  };

  componentDidMount = () => {
    drawerWidth = this.props.auth.isAuthenticated !== false ? 240 : 0;
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
    const { classes, theme, auth } = this.props;
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
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <TopNavBar
            open={this.state.open}
            handleDrawerOpen={this.handleDrawerOpen}
          />
          <DrawerMy
            open={this.state.open}
            handleDrawerClose={this.handleDrawerClose}
          />
          <main className={classes.content}>
            {/* <div className={classes.toolbar} /> */}
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
            {this.props.children}
            {/* <div>
              lorem alskdjfla skdflaksjd lfkasjdfl ksjadlfk jasdlfk jasdlkfj
              alsdkfj alsdkfj laskdfj laksdjflaskjdflaskdjflaksdjf aksdjflaksdjf
              laksdjflkasdjflkasdjflkasdjflkas laskdjf laskdjflaskdfjlasdkjf
              alsdkfjasldkfjalsdkfjlasdkfjalsdkfjalsdkfj alskdjflaskdfj lasdkf
              lorem alskdjfla skdflaksjd lfkasjdfl ksjadlfk jasdlfk jasdlkfj
              alsdkfj alsdkfj laskdfj laksdjflaskjdflaskdjflaksdjf aksdjflaksdjf
              laksdjflkasdjflkasdjflkasdjflkas laskdjf laskdjflaskdfjlasdkjf
              alsdkfjasldkfjalsdkfjlasdkfjalsdkfjalsdkfj alskdjflaskdfj lasdkf
              lorem alskdjfla skdflaksjd lfkasjdfl ksjadlfk jasdlfk jasdlkfj
              alsdkfj alsdkfj laskdfj laksdjflaskjdflaskdjflaksdjf aksdjflaksdjf
              laksdjflkasdjflkasdjflkasdjflkas laskdjf laskdjflaskdfjlasdkjf
              alsdkfjasldkfjalsdkfjlasdkfjalsdkfjalsdkfj alskdjflaskdfj lasdkf
              lorem alskdjfla skdflaksjd lfkasjdfl ksjadlfk jasdlfk jasdlkfj
              alsdkfj alsdkfj laskdfj laksdjflaskjdflaskdjflaksdjf aksdjflaksdjf
              laksdjflkasdjflkasdjflkasdjflkas laskdjf laskdjflaskdfjlasdkjf
              alsdkfjasldkfjalsdkfjlasdkfjalsdkfjalsdkfj alskdjflaskdfj lasdkf
            </div> */}
          </main>
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
