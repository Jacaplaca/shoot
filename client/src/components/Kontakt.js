import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";

const Kontakt = ({ classes, width, open }) => {
  return (
    <React.Fragment>
      <div
        className={classes.root}
        style={{
          // backgroundColor: "red",
          marginTop: 35,
          padding: 7,
          borderTop: open ? "1px solid grey" : "0px solid grey"
        }}
      >
        <div
          style={{
            // overflow: "hidden",
            // position: "fixed" /* Set the navbar to fixed position */,
            width: open ? width - 10 : 0,
            whiteSpace: "initial",
            display: open ? "inline" : "none",
            fontSize: 14
            // marginTop: 20
          }}
        >
          <h5 style={{ fontWeight: 600 }}>Kontakt</h5>
          <p>
            tel 048 514 800 874
            <br />
            info@portalstrzelecki.pl
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

const styles = theme => ({
  root: {
    color: theme.palette.text.primary

    // gridTemplateColumns: "1fr 2fr",
    // display: "flex"
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  confirmation: state.confirmation
});

const enhance = compose(
  // withRouter,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
  // MainFrameHOC()
);

export default enhance(Kontakt);
