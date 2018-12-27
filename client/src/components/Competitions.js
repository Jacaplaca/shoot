import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";
import CompetitionsForm from "./Competitions/CompetitionsForm";
import CompetitionsList from "./Competitions/CompetitionsList";

const collection = "competitions";

const Competitions = () => {
  return (
    <React.Fragment>
      <CompetitionsForm collection={collection} />
      <CompetitionsList collection={collection} />
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

export default enhance(Competitions);
