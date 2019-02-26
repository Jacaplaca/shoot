import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import NumberFormat from "react-number-format";

import * as actions from "../../actions";
import { rowStyles } from "../../skins/mainStyles";
import { combineStyles, formatNumber } from "../../functions/functions";
import PlayersScoresForm from "./PlayersScoresForm";
import RowHOC from "../RowHOC";

// const focus = (x, y, horizontal, vertical) => {
//   console.log("cord", x, y, horizontal, vertical);
//   if (x === horizontal && y === vertical) {
//     return true;
//   } else {
//     return false;
//   }
// };

const comps = (
  competitions,
  classes,
  playerId,
  turnament,
  finished,
  rowClicked,
  competitionClicked,
  isAuthenticated,
  vertical,
  nextPos,
  factor,
  factorRow,
  // coordinates,
  x,
  y
) => {
  // console.log("comps", turnament, finished);
  return competitions.map((comp, i) => {
    const { competition, competitionId, score, factor: factorRow } = comp;
    // console.log("competitionClicked", competitionClicked);
    // console.log("factorRow", factorRow, "score", score, "factor", factor);
    return (
      <span
        key={competitionId}
        className={classNames(
          // classes.rowBlock,
          // competitionId === competitionClicked && classes.highlightBlock
          competitionId === competitionClicked && classes.highlightBlock
          // classes.highlightBlock
        )}
        style={{ textAlign: "center" }}
      >
        {isAuthenticated && !factor ? (
          <PlayersScoresForm
            // focus={() => focus(x, y, i, vertical)}
            // coordinates={(x, y) => coordinates(x, y)}
            // nextPos={nextPos}
            // horizontal={i}
            // vertical={vertical}
            // position={{ x, y }}
            className={
              classNames()
              // classes.rowBlock,
              // competitionId === competitionClicked && classes.highlightBlock
              // competitionId === competitionClicked && classes.highlightBlock
            }
            // value={score}
            // classes={classes}
            label={competition}
            id={competitionId}
            score={score ? score.toString() : "0"}
            player={playerId}
            turnament={turnament}
            rowClicked={rowClicked}
            // finished={finished}
            // aaa={finished}
          />
        ) : (
          <div style={{ marginTop: 8, marginBottom: 8 }}>
            <NumberFormat
              value={formatNumber(factor ? factorRow : score)}
              displayType={"text"}
              thousandSeparator={" "}
              decimalSeparator={","}
            />
          </div>
        )}
      </span>
    );
  });
};

class PlayersScoresRow extends Component {
  state = { clickedPlayer: null, x: null, y: null };

  coordinates = (x, y) => {
    this.setState(x, y);
  };

  rowClicked = (player, competiton) => {
    // this.setState({ clickedPlayer: e });
    // console.log("rowClicked()", e);
    this.props.rowClick(player, competiton);
  };

  nextPos = (x, y) => {
    // console.log("xy", x, y);
    this.setState({ x, y });
  };
  // console.log("PlayersScoresRow", props);
  render() {
    const { x, y } = this.state;
    const {
      row,
      classes,
      turnament,
      finished,
      grid,
      playerClicked,
      competitionClicked,
      auth: { isAuthenticated },
      vertical,
      factor
    } = this.props;
    const {
      playerName,
      playerSurname,
      playerId,
      competitions,
      rank,
      number,
      totalScore,
      factorTotal,
      rodo
    } = row;
    // console.log("PlayersScoresRow() ROW", row);
    // console.log("player", row.competitions[0]);
    return (
      <React.Fragment>
        {/* {console.log("playersscoresrow", row, finished)} */}
        <div
          className={classNames(
            classes.rowTable,
            classes.table,
            playerId === playerClicked && classes.rowHighlight
            // playerId !== this.state.clickedPlayer && classes.rowTable
          )}
          style={{
            gridTemplateColumns: grid
          }}
        >
          <span
            className={classNames(
              classes.rank,
              rank === 1 && classes.gold,
              rank === 2 && classes.silver,
              rank === 3 && classes.brown
            )}
          >
            {rank}
          </span>
          <span className={classNames(classes.rowBlock, classes.rowName)}>
            {rodo ? `${playerName} ${playerSurname}` : "RODO"}
          </span>
          <span className={classNames(classes.rowBlock, classes.rowBlock)}>
            {number}
          </span>
          <span className={classNames(classes.rowBlock)}>
            {/* {Math.floor(totalScore)} */}
            <NumberFormat
              value={formatNumber(factor ? factorTotal : totalScore)}
              displayType={"text"}
              thousandSeparator={" "}
              decimalSeparator={","}
            />
          </span>
          {comps(
            competitions,
            classes,
            playerId,
            turnament,
            finished,
            this.rowClicked,
            competitionClicked,
            isAuthenticated,
            vertical,
            this.nextPos,
            factor,
            x,
            y
          )}
        </div>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  table: {
    // gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
  },
  rank: {
    background: "white",
    fontWeight: "800",
    alignSelf: "center",
    justifySelf: "center",
    textAlign: "center",
    borderRadius: 30,
    width: 30,
    maxHeight: 30,
    fontSize: 20,
    color: theme.palette.menu
  },
  gold: {
    background: "gold"
  },
  silver: {
    background: "silver"
  },
  brown: {
    background: "brown",
    color: "white"
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
