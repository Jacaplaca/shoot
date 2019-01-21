import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { rowStyles } from "./mainStyles";
import { combineStyles } from "../functions/functions";

const RowBlock = ({ classes, children }) => {
  return (
    <React.Fragment>
      <span className={classNames(classes.rowContainerBlock)}>
        <span className={classNames(classes.rowBlock, classes.date)}>
          {children}
        </span>
      </span>
    </React.Fragment>
  );
};

const styles = theme => ({
  table: {}
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const combinedStyles = combineStyles(styles, rowStyles);

const enhance = compose(
  // withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(mapStateToProps)
);

export default enhance(RowBlock);
