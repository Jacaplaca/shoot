import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as actions from "../../actions";
import { rowStyles } from "../../skins/mainStyles";
import { combineStyles } from "../../functions/functions";
import RowHOC from "../RowHOC";

const TurnamentsRow = ({ row, classes, grid }) => {
  const {
    date,
    name,
    facility,
    judgeMain,
    judgeRTS,
    judgeCounting,
    lzss,
    tech,
    logo
  } = row;
  // console.log("image", require(`../../${logo}`));
  return (
    <React.Fragment>
      <span className={classNames(classes.rowBlock, classes.date)}>{date}</span>
      <span className={classNames(classes.rowBlock, classes.rowName)}>
        {name}
      </span>
      <span className={classNames(classes.rowBlock)}>{facility}</span>
      <span className={classNames(classes.rowBlock)}>
        {judgeMain ? `${judgeMain.name} ${judgeMain.surname}` : "usunięto"}
      </span>
      <span className={classNames(classes.rowBlock)}>
        {judgeCounting
          ? `${judgeCounting.name} ${judgeCounting.surname}`
          : "usnięto"}
      </span>
      <span className={classNames(classes.rowBlock)}>
        {judgeRTS ? `${judgeRTS.name} ${judgeRTS.surname}` : "usunięto"}
      </span>
      <span className={classNames(classes.rowBlock)}>{lzss}</span>
      <span className={classNames(classes.rowBlock)}>{tech}</span>
      <span className={classNames(classes.rowBlock)}>
        <img className={classes.rowImg} src={require(`../../${logo}`)} />
      </span>
    </React.Fragment>
  );
};

const styles = theme => ({
  table: {
    // gridTemplateColumns: grid
    // gridTemplateColumns:
    //   "50px minmax(80px, 100px) 1fr 1fr 1fr 1fr 1fr 1fr 1fr 70px 60px"
  }
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

export default enhance(TurnamentsRow);
