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

const comps = (competitions, classes, sorting, competitionClicked) => {
  // console.log("comps", competitions);
  return competitions.map(comp => {
    const { competition, competitionId, score } = comp;
    // console.log(competition);
    return (
      <span
        className={classNames(
          classes.headBlock,
          competitionId === competitionClicked && classes.headBlockHighlight
        )}
        key={competitionId}
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          gridTemplateColumns: "1fr",
          width: "100%",
          height: "100%"
        }}
      >
        {/* <SortButtons click={e => sorting("competitions", e, competitionId)} /> */}
        <span>{competition}</span>
      </span>
      // <PlayersScoresForm
      //   key={competitionId}
      //   className={classNames(classes.rowBlock)}
      //   // value={score}
      //   // classes={classes}
      //   label={competition}
      //   id={competitionId}
      //   score={score ? score.toString() : "0"}
      //   player={playerId}
      //   turnament={turnament}
      // />
    );
  });
};

const PlayersScoresHead = ({
  classes,
  grid,
  sorting,
  row,
  competitionClicked
}) => {
  return (
    <div
      className={classNames(classes.headTable, classes.table)}
      style={{ gridTemplateColumns: grid }}
    >
      <span className={classNames(classes.headBlock)} />

      <HeadRowField
        title="Nazwa"
        classes={classes}
        // click={e => sorting("name", e)}
        // sort
      />

      <HeadRowField
        title="Suma"
        classes={classes}
        // click={e => sorting("email", e)}
        // sort
      />
      {row && row.competitions && row.competitions.length !== 0
        ? comps(row.competitions, classes, sorting, competitionClicked)
        : null}
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

export default enhance(PlayersScoresHead);
