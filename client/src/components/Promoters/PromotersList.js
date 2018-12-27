import React from "react";
import { connect } from "react-redux";
import PromotersRow from "./PromotersRow";

const PromotersList = ({ rows, collection }) => {
  return (
    <div>
      {rows.length > 0 &&
        rows.map(row => (
          <PromotersRow key={row._id} row={row} collection={collection} />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  rows: state.promoters
});

export default connect(mapStateToProps)(PromotersList);
