import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";

const Kontakt = ({ classes, width, open }) => {
  return (
    <React.Fragment>
      <div className={classes.root}>
        <div
          style={{
            // overflow: "hidden",
            // position: "fixed" /* Set the navbar to fixed position */,
            width: open ? width - 10 : 0,
            whiteSpace: "initial",
            display: open ? "inline" : "none"
          }}
        >
          <h5>Kontakty</h5>
          <p>
            Singulis quorum quis proident quid. Duis excepteur an
            comprehenderit, o ullamco exquisitaque e incurreret id excepteur,
            tamen ab ad anim mandaremus. No
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
  ),
  MainFrameHOC()
);

export default enhance(Kontakt);
