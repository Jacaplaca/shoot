import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";
import JudgesForm from "./Judges/JudgesForm";
import JudgesList from "./Judges/JudgesList";

const collection = "judges";

const Judges = () => {
  return (
    <React.Fragment>
      <JudgesForm collection={collection} />
      <JudgesList collection={collection} />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  confirmation: state.confirmation
});

const enhance = compose(
  // withRouter,
  withTheme(),
  connect(
    mapStateToProps,
    actions
  ),
  MainFrameHOC({ collection })
);

export default enhance(Judges);
