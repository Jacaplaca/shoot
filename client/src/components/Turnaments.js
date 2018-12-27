import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";
import TurnamentsForm from "./Turnaments/TurnamentsForm";
import TurnamentsList from "./Turnaments/TurnamentsList";

const collection = "turnaments";

const Turnaments = () => {
  return (
    <React.Fragment>
      <TurnamentsForm collection={collection} />
      <TurnamentsList collection={collection} />
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

export default enhance(Turnaments);
