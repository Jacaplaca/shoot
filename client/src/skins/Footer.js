import React from "react";
import { withStyles } from "@material-ui/core/styles";

const Footer = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div>© SHOOTER STATS, 2019</div>
      <div style={{ fontSize: 13 }}>
        Shooter Stats powstaje przy współpracy ze{" "}
        <a href="https://swiadomafirma.pl/">
          {" "}
          <img
            src="/sf.jpg"
            alt="Świadoma Firma"
            style={{ width: 90, padding: 5 }}
          />{" "}
        </a>
        która oferuje skuteczne wsparcie analityczne oraz programistyczne dla
        biznesu.
      </div>
    </div>
  );
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
