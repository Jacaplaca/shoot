import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";

const Kontakt = ({ classes }) => {
  return (
    <React.Fragment>
      <div className={classes.root}>
        <div>
          <h3>Kontakty</h3>
          <p>
            Singulis quorum quis proident quid. Duis excepteur an
            comprehenderit, o ullamco exquisitaque e incurreret id excepteur,
            tamen ab ad anim mandaremus. Non enim comprehenderit, quo illum
            illum do cernantur.Laborum tamen commodo quibusdam, mentitum esse
            sed possumus exercitation. Offendit veniam noster cupidatat tempor
            ea cupidatat ita consequat. Ingeniis quae fugiat ne sunt. Summis a
            possumus id esse an malis ullamco ea irure quorum.
          </p>
        </div>
        <div>
          <h3>Kontakty</h3>
          <p>
            Singulis quorum quis proident quid. Duis excepteur an
            comprehenderit, o ullamco exquisitaque e incurreret id excepteur,
            tamen ab ad anim mandaremus. Non enim comprehenderit, quo illum
            illum do cernantur.Laborum tamen commodo quibusdam, mentitum esse
            sed possumus exercitation. Offendit veniam noster cupidatat tempor
            ea cupidatat ita consequat. Ingeniis quae fugiat ne sunt. Summis a
            possumus id esse an malis ullamco ea irure quorum.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

const styles = theme => ({
  root: {
    color: theme.palette.text.primary,
    gridTemplateColumns: "1fr 2fr",
    display: "flex"
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
