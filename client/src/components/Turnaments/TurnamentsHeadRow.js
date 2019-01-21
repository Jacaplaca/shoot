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

const TurnamentsHeadRow = ({ classes, grid, sorting, auth: { user } }) => {
  return (
    <div
      className={classNames(classes.headTable, classes.table)}
      style={{ gridTemplateColumns: grid }}
    >
      <span className={classNames(classes.headBlock)} />

      <HeadRowField
        title="Termin"
        classes={classes}
        click={e => sorting("date", e)}
        sort
      />
      {/* <span className={classNames(classes.headBlock)}>Organizacja</span> */}
      {user.rola === "admin" && (
        <HeadRowField
          title="Organizacja"
          classes={classes}
          click={e => sorting("promoterName", e)}
          sort
        />
      )}

      <HeadRowField
        title="Nazwa"
        classes={classes}
        click={e => sorting("name", e)}
        sort
      />
      <HeadRowField
        title="Lokalizacja"
        classes={classes}
        click={e => sorting("facility", e)}
        sort
      />
      <span className={classNames(classes.headBlock)}>Sędzia główny</span>
      {/* <span className={classNames(classes.headBlock)}>Sędzia liczący</span> */}
      {/* <span className={classNames(classes.headBlock)}>Sędzia RTS</span> */}
      <span className={classNames(classes.headBlock)}>Obserwator lzss</span>
      {/* <span className={classNames(classes.headBlock)}>Techniczny</span> */}
      <span className={classNames(classes.headBlock)}>
        {/* <img className={classes.rowImg} src={require(`../../${logo}`)} /> */}
      </span>
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

export default enhance(TurnamentsHeadRow);
