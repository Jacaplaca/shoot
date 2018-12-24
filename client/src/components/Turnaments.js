import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import TurnamentsForm from "./Turnaments/TurnamentsForm";
import TurnamentsList from "./Turnaments/TurnamentsList";

const Turnaments = () => {
  return (
    <React.Fragment>
      <TurnamentsForm />
      <TurnamentsList />
    </React.Fragment>
  );
};

export default compose(
  withTheme(),
  MainFrameHOC
)(Turnaments);
