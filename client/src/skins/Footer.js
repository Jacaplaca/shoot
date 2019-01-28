import React from "react";
import { withStyles } from "@material-ui/core/styles";

const Footer = ({ classes }) => {
  return <div className={classes.root}>© SHOOTER STATS, 2019</div>;
};

const styles = theme => ({
  root: {
    color: "white",
    overflow: "hidden",
    position: "fixed" /* Set the navbar to fixed position */,
    bottom: 0 /* Position the navbar at the top of the page */,
    width: "100%" /* Full width */,
    backgroundColor: theme.palette.menu,
    zIndex: theme.zIndex.drawer + 1,
    padding: 5,
    textAlign: "center"
  }
});

export default withStyles(styles, { withTheme: true })(Footer);
