import React from "react";
import { connect } from "react-redux";
import JudgesRow from "./JudgesRow";

const JudgesList = ({ judges }) => {
  return (
    <div>
      {judges.length > 0 &&
        judges.map(judge => <JudgesRow key={judge._id} row={judge} />)}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  judges: state.judges
});

export default connect(mapStateToProps)(JudgesList);
