import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as actions from "../../actions";
import { rowStyles } from "../../skins/mainStyles";
import { combineStyles } from "../../functions/functions";
import PlayersScoresForm from "./PlayersScoresForm";
import RowHOC from "../RowHOC";

const comps = (competitions, classes, playerId, turnament) => {
  return competitions.map(comp => {
    const { competition, competitionId, score } = comp;
    return (
      <PlayersScoresForm
        key={competitionId}
        className={classNames(classes.rowBlock)}
        // value={score}
        // classes={classes}
        label={competition}
        id={competitionId}
        score={score ? score.toString() : "0"}
        player={playerId}
        turnament={turnament}
      />
    );
  });
};

const PlayersScoresRow = ({ row, classes, turnament }) => {
  const {
    playerName,
    playerSurname,
    playerId,
    competitions,
    rank,
    totalScore
  } = row;
  // console.log(turnament);

  return (
    <React.Fragment>
      <div
        className={classNames(classes.rowTable, classes.table)}
        style={{
          gridTemplateColumns: `50px 1fr 50px repeat(${
            competitions.length
          }, 100px)`
        }}
      >
        <span className={classNames(classes.rowBlock)}>{rank}</span>
        <span className={classNames(classes.rowBlock, classes.rowName)}>
          {`${playerName} ${playerSurname}`}
        </span>
        <span className={classNames(classes.rowBlock)}>{totalScore}</span>
        {comps(competitions, classes, playerId, turnament)}
      </div>
    </React.Fragment>
  );
};

const styles = theme => ({
  table: {
    // gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
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
  )
  // RowHOC
);

export default enhance(PlayersScoresRow);
