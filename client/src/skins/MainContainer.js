import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  darken,
  emphasize,
  lighten
} from "@material-ui/core/styles/colorManipulator";
import { BrowserRouter, Route } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { connect } from "react-redux";
import * as actions from "../actions/authentication";

import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import Promoters from "../components/Promoters";

import ButtonNavBar from "./ButtonNavBar";

let drawerWidth = 240;
let drawerClosedWidth = 72;
const path = window.location.pathname.split("/")[1];

export const mainStyles = theme => ({
  back: { background: "red", color: "yellow", fontWeight: "800" },
  rowBlock: {
    alignSelf: "center",
    justifySelf: "center",
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: "center"
  },
  rowTable: {
    display: "grid",
    minWidth: 900,
    color: theme.palette.text.primary,
    background: lighten(theme.palette.menu, 0.1),
    marginBottom: 6
  },
  rowName: {
    fontWeight: "600"
  },
  rowImg: {
    maxWidth: 60,
    maxHeight: 60,
    padding: 5
  },
  flex: {},
  container: {
    display: "flex",
    flexDirection: "column"
    // backgroundColor: "red"
  },
  appBar: {
    // flexGrow: 1,
    flex: 1,
    // overflow: "hidden",
    // position: "relative",
    // position: "fixed" /* Set the navbar to fixed position */,
    // top: 50 /* Position the navbar at the top of the page */,
    // width: 100%; /* Full width */
    // height: "100%",
    marginLeft: drawerClosedWidth,
    width: `calc(100% - ${drawerClosedWidth}px)`,
    backgroundColor: theme.palette.menu,
    // backgroundColor: lighten(theme.palette.menu, 0.3),
    zIndex: 0,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appBarShiftHide: {
    marginLeft: 0,
    width: `calc(100% - ${0}px)`
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  }
});

class MainContainer extends React.Component {
  componentDidMount() {
    document.title = this.props.title
      ? `Portal Strzelecki | ${this.props.title}`
      : `Portal Strzelecki`;
  }

  render() {
    const {
      classes,
      theme,
      auth,
      open,
      handleDrawerOpen,
      children
    } = this.props;
    return (
      <div className={classes.container}>
        <div
          // position="absolute"
          className={classNames(
            classes.appBar,
            open && classes.appBarShift,
            (path === "raport" || !auth.isAuthenticated) &&
              classes.appBarShiftHide
          )}
        >
          {children}
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(mainStyles, { withTheme: true })(
  connect(
    mapStateToProps,
    actions
  )(withRouter(MainContainer))
);

// export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
