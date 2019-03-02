import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import SortButtons from "../../skins/SortButtons";
import HeadRowField from "../../skins/HeadRowField";
import * as actions from "../../actions";
import { tableHeadStyles } from "../../skins/mainStyles";
import { combineStyles } from "../../functions/functions";
import RowHOC from "../RowHOC";

const TurnamentsRow = ({ classes, grid, sorting }) => {
  return (
    <div
      className={classNames(classes.headTable, classes.table)}
      style={{ gridTemplateColumns: grid }}
    >
      <span className={classNames(classes.headBlock)} />

      <HeadRowField
        title="Zawodnik"
        classes={classes}
        click={e => sorting("surname", e)}
        sort
      />
      <HeadRowField
        title="Nr startowy"
        classes={classes}
        click={e => sorting("number", e)}
        sort
      />
      <HeadRowField
        title="Klasa"
        classes={classes}
        click={e => sorting("klasa", e)}
        sort
      />

      <HeadRowField
        title="Kaliber"
        classes={classes}
        click={e => sorting("caliber", e)}
        sort
      />
      <HeadRowField
        title="Broń"
        classes={classes}
        click={e => sorting("gun", e)}
        sort
      />
      <HeadRowField
        title="Luneta"
        classes={classes}
        click={e => sorting("scope", e)}
        sort
      />
      <HeadRowField
        title="Drużyna"
        classes={classes}
        click={e => sorting("team", e)}
        sort
      />
      <span className={classNames(classes.headBlock)} />
    </div>
  );
};

const styles = theme => ({
  table: {
    // gridTemplateColumns:
    //   "50px minmax(80px, 100px) 1fr 1fr 1fr 1fr 1fr 1fr 1fr 70px 60px"
    // height: 44
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const combinedStyles = combineStyles(styles, tableHeadStyles);

const enhance = compose(
  // withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
  // RowHOC
);

export default enhance(TurnamentsRow);
