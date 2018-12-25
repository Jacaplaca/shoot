import React from "react";
import { connect } from "react-redux";
import TurnamentsRow from "./TurnamentsRow";

const TurnamentsList = ({ turnaments }) => {
  return (
    <div>
      {turnaments.length > 0 &&
        turnaments.map(turnament => (
          <TurnamentsRow key={turnament._id} row={turnament} />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  turnaments: state.turnaments
});

export default connect(mapStateToProps)(TurnamentsList);
