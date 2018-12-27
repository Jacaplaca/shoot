import React from "react";
import { connect } from "react-redux";
import JudgesRow from "./JudgesRow";

const JudgesList = ({ rows, collection }) => {
  return (
    <div>
      {rows.length > 0 &&
        rows.map(row => (
          <JudgesRow key={row._id} row={row} collection={collection} />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  rows: state.judges
});

export default connect(mapStateToProps)(JudgesList);
