import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TurnamentsForm from "./Turnaments/TurnamentsForm";
import TurnamentsList from "./Turnaments/TurnamentsList";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  }
});

class Turnaments extends Component {
  state = {
    toEdit: null
  };

  edit = toEdit => {
    this.setState({ toEdit });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TurnamentsForm toEdit={this.state.toEdit} />
        <TurnamentsList edit={this.edit} />
      </div>
    );
  }
}

// export default MainFrameHOC(Turnaments);

export default compose(
  withStyles(styles, { withTheme: true }),
  MainFrameHOC
)(Turnaments);
