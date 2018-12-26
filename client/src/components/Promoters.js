import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import PromotersForm from "./Promoters/PromotersForm";
import PromotersList from "./Promoters/PromotersList";

const Promoters = () => {
  return (
    <React.Fragment>
      <PromotersForm />
      <PromotersList />
    </React.Fragment>
  );
};

export default compose(
  withTheme(),
  MainFrameHOC
)(Promoters);
