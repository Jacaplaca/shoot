import React from "react";
import { connect } from "react-redux";
import CompetitionsRow from "./CompetitionsRow";

const CompetitionsList = ({ rows, collection }) => {
  return (
    <div>
      {rows.length > 0 &&
        rows.map(row => (
          <CompetitionsRow key={row._id} row={row} collection={collection} />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  rows: state.competitions
});

export default connect(mapStateToProps)(CompetitionsList);
