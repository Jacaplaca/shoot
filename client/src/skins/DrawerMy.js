import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { connect } from "react-redux";
import * as actions from "../actions/authentication";

import DrawerLink from "./DrawerLink";
import ShowLinkToComp from "./ShowLinkToComp";
import Kontakt from "../components/Kontakt";

let drawerWidth = 240;
const path = window.location.pathname.split("/")[1];

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  flex: {
    flexGrow: 1
  },
  button: {
    border: 0,
    "font-weight": 600,
    height: 35,
    padding: "0 30px",
    "font-size": 25
    // $nest: {
    //   '&:hover': {
    //     color: 'red'
    //   }
    // }
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  drawerPaper: {
    overflow: "hidden",
    position: "fixed" /* Set the navbar to fixed position */,
    top: 0 /* Position the navbar at the top of the page */,
    backgroundColor: theme.palette.drawer,
    borderRightColor: theme.palette.drawer,
    // position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  drawerPaperHide: {
    width: 0
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
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class DrawerMy extends React.Component {
  render() {
    const { classes, theme, auth, open, handleDrawerClose } = this.props;
    // console.log("THEME", theme);
    const links = [
      {
        comp: "promoters",
        text: "Organizatorzy",
        link: "/organizatorzy",
        icon: "Person",
        rola: "admin"
      },
      {
        comp: "turnamets",
        text: "Zawody",
        link: "/zawody",
        icon: "Riffle",
        rola: "admin,promoter"
      },
      {
        comp: "competitions",
        text: "Konkurencje",
        link: "/konkurencje",
        icon: "ShootingShield",
        rola: "admin"
      },
      {
        comp: "players",
        text: "Zawodnicy",
        link: "/zawodnicy",
        icon: "People",
        rola: "admin,promoter"
      },
      {
        comp: "judges",
        text: "Sędziowie",
        link: "/sedziowie",
        icon: "Eye",
        rola: "admin"
      }
    ];
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose,
            (path === "raport" || !auth.isAuthenticated) &&
              classes.drawerPaperHide
          )
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          {/* {auth && auth.email.split("@")[0]} */}
          <span style={{ color: "white" }}>{auth.user.name}</span>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <div>
          {links.map((el, i) => {
            const { comp, text, link, icon, rola } = el;
            const userType = auth.user.rola;
            // console.log(userType);
            return rola.split(",").map(x => {
              // console.log(x);
              if (userType === x) {
                return (
                  // <ShowLinkToComp key={i} comp={comp}>
                  <DrawerLink key={text} text={text} link={link} icon={icon} />
                  // </ShowLinkToComp>
                );
              }
            });
          })}
        </div>
        <Kontakt width={drawerWidth} open={open} />
      </Drawer>
    );
  }
}

DrawerMy.propTypes = {
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
  )(DrawerMy)
);
