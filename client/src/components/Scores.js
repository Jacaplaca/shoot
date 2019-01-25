import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Turnaments from "./Turnaments";
import * as actions from "../actions";

class Scores extends Component {
  componentWillMount() {
    this.props.fetchFromDB("turnamentsOpen");
  }

  render() {
    return <Turnaments />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  confirmation: state.confirmation
});

const enhance = compose(
  // withRouter,
  // withTheme(),
  connect(
    mapStateToProps,
    actions
  )
  // MainFrameHOC({ collection })
);

export default enhance(Scores);
