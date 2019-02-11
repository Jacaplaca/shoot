import React from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { connect } from "react-redux";
import * as actions from "../actions/authentication";

import LanguageSwitch from "./LanguageSwitch";

import ButtonNavBar from "./ButtonNavBar";

let drawerWidth = 240;
const path = window.location.pathname.split("/")[1];

const styles = theme => ({
  flex: {
    flexGrow: 1
  },
  appBar: {
    overflow: "hidden",
    position: "fixed" /* Set the navbar to fixed position */,
    top: 0 /* Position the navbar at the top of the page */,
    // width: 100%; /* Full width */
    backgroundColor: theme.palette.menu,
    zIndex: theme.zIndex.drawer + 1,
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

class TopNavBar extends React.Component {
  onLogout = e => {
    console.log("onLogout", e);
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    // this.props.logoutUser();
  };
  renderContent() {
    // const { classes } = this.props;
    console.log(this.props.auth);
    switch (this.props.auth.isAuthenticated) {
      case true:
        return [
          // <ButtonNavBar key="3b" link="/kontakt" text="Kontakt" />,
          <ButtonNavBar key={2} click={this.onLogout} text="Wyloguj się" />
          // <LanguageSwitch key={3} />
        ];
      // return [<ButtonNavBar key={2} link="/api/logout" text="Wyloguj się" />];
      case false:
        return [
          // <ButtonNavBar key="3b" link="/kontakt" text="Kontakt" />,
          <ButtonNavBar key="1a" link="/register" text="Rejestracja" />,
          <ButtonNavBar key="2b" link="/login" text="Logowanie" />
          // <LanguageSwitch key={3} />
        ];
      default:
        return;
    }
  }

  render() {
    const { classes, theme, auth, open, handleDrawerOpen } = this.props;
    return (
      <AppBar
        // position="absolute"
        className={classNames(
          classes.appBar,
          open && classes.appBarShift,
          !auth.isAuthenticated && classes.appBarShiftHide
        )}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div variant="title" color="inherit" className={classes.flex}>
            <Typography variant="title" color="inherit" noWrap>
              <a
                href={
                  !auth.isAuthenticated &&
                  (path === "wyniki" || path === "wyniki_zawodnikow")
                    ? "http://portalstrzelecki.pl/zawody-on-line/"
                    : "http://portalstrzelecki.pl"
                }
              >
                <img
                  // className={classes.rowImg}
                  style={{ height: 45 }}
                  src={require(`../images/ps_logo_biale.png`)}
                />
              </a>
            </Typography>
          </div>
          {!auth.isAuthenticated &&
          (path === "wyniki" || path === "wyniki_zawodnikow") ? null : (
            <ul className="right">{this.renderContent()}</ul>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

TopNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    actions
  )(withRouter(TopNavBar))
);

// export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
