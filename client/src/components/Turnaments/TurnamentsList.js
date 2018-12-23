import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TurnamentsRow from "./TurnamentsRow";
// import man from '../../public'

const TurnamentsList = ({ turnaments, edit }) => {
  return (
    <div>
      <h1>adfdf</h1>
      {turnaments.length > 0 &&
        turnaments.map(turnament => (
          <TurnamentsRow
            key={turnament._id}
            turnament={turnament}
            edit={edit}
          />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  turnaments: state.turnaments
  // judges: state.judges
});

// export default compose(
//   withStyles(styles, { withTheme: true }),
//   // MainFrameHOC
//   mapStateToProps
// )(TurnamentsList);

export default connect(
  mapStateToProps
  // actions
)(TurnamentsList);
