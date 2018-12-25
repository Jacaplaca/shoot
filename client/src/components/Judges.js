import React from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import JudgesForm from "./Judges/JudgesForm";
import JudgesList from "./Judges/JudgesList";

const Judges = () => {
  return (
    <React.Fragment>
      <JudgesForm />
      <JudgesList />
    </React.Fragment>
  );
};

export default compose(
  withTheme(),
  MainFrameHOC
)(Judges);
