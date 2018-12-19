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

import ButtonNavBar from "./ButtonNavBar";

let drawerWidth = 240;

const styles = theme => ({
  flex: {
    flexGrow: 1
  },
  appBar: {
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
          <ButtonNavBar key={2} click={this.onLogout} text="Wyloguj się" />
        ];
      // return [<ButtonNavBar key={2} link="/api/logout" text="Wyloguj się" />];
      case false:
        return [
          <ButtonNavBar key="1a" link="/register" text="Rejestracja" />,
          <ButtonNavBar key="2b" link="/login" text="Logowanie" />
        ];
      default:
        return;
    }
  }

  render() {
    const { classes, theme, auth, open, handleDrawerOpen } = this.props;
    return (
      <AppBar
        position="absolute"
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
              <NavLink
                activeStyle={{
                  color: "white",
                  fontWeight: "600",
                  textDecoration: "none"
                }}
                to="/"
              >
                Shooter Stats
              </NavLink>
            </Typography>
          </div>
          <ul className="right">{this.renderContent()}</ul>
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
