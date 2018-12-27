import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";
import PlayersForm from "./Players/PlayersForm";
import PlayersList from "./Players/PlayersList";

const collection = "players";

const Players = () => {
  return (
    <React.Fragment>
      <PlayersForm collection={collection} />
      <PlayersList collection={collection} />
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

export default enhance(Players);
