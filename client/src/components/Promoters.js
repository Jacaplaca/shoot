import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PromotersForm from "./PromotersForm";
import PromotersList from "./PromotersList";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

const Promoters = props => {
  const { classes, promoters, auth } = props;
  console.log("promoter", promoters);
  console.log("user", auth);
  return (
    <div className={classes.root}>
      <PromotersForm />
      {/* <PromotersList /> */}
      {/* {promoters.length > 0 &&
        promoters.map(promoter => (
          <div key={promoter.email}>{promoter.name}</div>
        ))} */}
      {/* <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid> */}
    </div>
  );
};

// export default MainFrameHOC(Promoters);

export default compose(
  withStyles(styles, { withTheme: true }),
  MainFrameHOC
)(Promoters);
