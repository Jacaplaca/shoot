import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { rowStyles } from "../../skins/mainStyles";
import { combineStyles } from "../../functions/functions";
import * as actions from "../../actions";
import RowHOC from "../RowHOC";

const PlayersRow = ({ row, classes, grid }) => {
  const { name, surname, caliber, gun, scope, team, club, rank, rodo } = row;

  return (
    <React.Fragment>
      <span className={classNames(classes.rowBlock, classes.rowName)}>
        {`${rodo ? name : "rodo"} ${rodo ? surname : "rodo"}`}
      </span>
      <span className={classNames(classes.rowBlock)}>
        {rank.map(x => `${x} `)}
      </span>
      <span className={classNames(classes.rowBlock)}>{caliber}</span>
      <span className={classNames(classes.rowBlock)}>{gun}</span>
      <span className={classNames(classes.rowBlock)}>{scope}</span>
      <span className={classNames(classes.rowBlock)}>{team}</span>
      <span className={classNames(classes.rowBlock)}>{club}</span>
    </React.Fragment>
  );
};

const styles = theme => ({
  // table: {
  //   gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr  60px"
  // }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const combinedStyles = combineStyles(styles, rowStyles);

const enhance = compose(
  // withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  ),
  RowHOC
);

export default enhance(PlayersRow);
