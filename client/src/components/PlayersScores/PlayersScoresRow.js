import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import NumberFormat from "react-number-format";

import * as actions from "../../actions";
import { rowStyles } from "../../skins/mainStyles";
import { combineStyles } from "../../functions/functions";
import PlayersScoresForm from "./PlayersScoresForm";
import RowHOC from "../RowHOC";

const comps = (
  competitions,
  classes,
  playerId,
  turnament,
  finished,
  rowClicked,
  competitionClicked
) => {
  // console.log("comps", turnament, finished);
  return competitions.map(comp => {
    const { competition, competitionId, score } = comp;
    console.log("competitionClicked", competitionClicked);
    console.log("class", classes.highlightBlock);
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
        <PlayersScoresForm
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
      </span>
    );
  });
};

class PlayersScoresRow extends Component {
  state = { clickedPlayer: null };

  rowClicked = (player, competiton) => {
    // this.setState({ clickedPlayer: e });
    // console.log("rowClicked()", e);
    this.props.rowClick(player, competiton);
  };
  // console.log("PlayersScoresRow", props);
  render() {
    const {
      row,
      classes,
      turnament,
      finished,
      grid,
      playerClicked,
      competitionClicked
    } = this.props;
    const {
      playerName,
      playerSurname,
      playerId,
      competitions,
      rank,
      totalScore
    } = row;

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
            {`${playerName} ${playerSurname}`}
          </span>
          <span className={classNames(classes.rowBlock)}>
            {/* {Math.floor(totalScore)} */}
            <NumberFormat
              value={Math.floor(totalScore)}
              displayType={"text"}
              thousandSeparator={" "}
            />
          </span>
          {comps(
            competitions,
            classes,
            playerId,
            turnament,
            finished,
            this.rowClicked,
            competitionClicked
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
