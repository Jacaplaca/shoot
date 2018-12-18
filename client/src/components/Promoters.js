import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import MainFrameHOC from "../skins/MainFrameHOC";

const Promoters = ({}) => <div>AAA</div>;

// export default MainFrameHOC(Promoters);

const styles = theme => ({
  flex: {
    flexGrow: 1
  }
});

export default compose(
  withStyles(styles, { withTheme: true }),
  MainFrameHOC
)(Promoters);
