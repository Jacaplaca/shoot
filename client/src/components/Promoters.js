import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";
import PromotersForm from "./Promoters/PromotersForm";
import PromotersList from "./Promoters/PromotersList";

const collection = "promoters";

const Promoters = () => {
  return (
    <React.Fragment>
      <PromotersForm collection={collection} />
      <PromotersList collection={collection} />
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

export default enhance(Promoters);
