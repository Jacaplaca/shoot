import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as actions from "../../actions";
import { rowStyles } from "../../skins/mainStyles";
import { combineStyles } from "../../functions/functions";
import RowHOC from "../RowHOC";

const CompetitionsRow = ({ row, classes }) => {
  const { name, judge } = row;
  return (
    <React.Fragment>
      <span className={classNames(classes.rowBlock, classes.rowName)}>
        {`${name}`}
      </span>
      <span className={classNames(classes.rowBlock)}>
        {judge
          ? `${judge.name} ${judge.surname} ${judge.judgeClass}`
          : "usunięto sędziego"}
      </span>
    </React.Fragment>
  );
};

const styles = theme => ({
  table: {
    gridTemplateColumns: "50px 1fr 3fr  60px"
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

export default enhance(CompetitionsRow);
