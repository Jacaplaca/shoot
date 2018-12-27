import React from "react";
import { connect } from "react-redux";
import TurnamentsRow from "./TurnamentsRow";

const TurnamentsList = ({ rows, collection }) => {
  return (
    <div>
      {rows.length > 0 &&
        rows.map(row => (
          <TurnamentsRow key={row._id} row={row} collection={collection} />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  rows: state.turnaments
});

export default connect(mapStateToProps)(TurnamentsList);
