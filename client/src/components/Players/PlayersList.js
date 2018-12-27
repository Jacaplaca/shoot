import React from "react";
import { connect } from "react-redux";
import PlayersRow from "./PlayersRow";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import store from "../../store";
import * as actions from "../../actions";

const PlayersList = ({ rows, collection, turnaments }) => {
  return (
    <div>
      <InputSelectBaza
        object={turnaments}
        name="turnament"
        type="string"
        wybrano={e =>
          store.dispatch(
            actions.fetchFromDB(collection, "turnament", e.target.value)
          )
        }
        // wybrano={handleChange}
        // wybrano={e => onChange(e)}
        // value={turnament}
        label="Zawody"
        // placeholder="Organizator"
      />
      {rows.length > 0 &&
        rows.map(row => (
          <PlayersRow key={row._id} row={row} collection={collection} />
        ))}
    </div>
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
