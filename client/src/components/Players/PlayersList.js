import React from "react";
import { connect } from "react-redux";
import PlayersRow from "./PlayersRow";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import store from "../../store";
import * as actions from "../../actions";
import Pagination from "../../skins/Pagination";

const PlayersList = ({ rows, collection, turnaments }) => {
  return (
    <div>
      <InputSelectBaza
        object={turnaments}
        name="turnament"
        type="string"
        wybrano={e => {
          store.dispatch(actions.showedTurnament(e.target.value));

          store.dispatch(
            actions.fetchFromDB(
              collection,
              `/api/${collection}/turnament/${e.target.value}`
            )
          );
        }}
        // value={{ value: "st" }}
        label="Zawody"
      />
      <Pagination data={rows}>
        <PlayersRows rows={rows} collection={collection} />
      </Pagination>
    </div>
  );
};

const PlayersRows = ({ rows, collection }) => {
  return (
    rows.length > 0 &&
    rows.map(row => (
      <PlayersRow key={row._id} row={row} collection={collection} />
    ))
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  rows: state.players,
  turnaments: state.turnaments
});

export default connect(
  mapStateToProps,
  actions
)(PlayersList);
