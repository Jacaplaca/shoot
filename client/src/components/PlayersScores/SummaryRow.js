import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as actions from "../../actions";
import { rowStyles } from "../../skins/mainStyles";
import { combineStyles } from "../../functions/functions";
import PlayersScoresForm from "./PlayersScoresForm";
import SortButtons from "../../skins/SortButtons";
import ButtonMy from "../../skins/ButtonMy";
import RowHOC from "../RowHOC";

let value = "";

const comps = (competitions, classes, sorting) => {
  // console.log("comps", competitions);
  return competitions.map(comp => {
    const { competition, competitionId, score } = comp;
    return (
      <span
        className={classNames(classes.rowBlock)}
        key={competitionId}
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          gridTemplateColumns: "25px 1fr"
        }}
      >
        <SortButtons click={e => sorting("competitions", e, competitionId)} />
        <span>{Math.floor(score)}</span>
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
class SummaryRow extends Component {
  state = { search: "" };

  handleSearching = () => {
    this.props.searching(["playerName", "playerSurname"], this.state.searching);
  };
  render() {
    const { row, classes, sorting, searching } = this.props;
    const { totalScore, competitions } = row;
    // console.log("summaryRow", row);

    return (
      <React.Fragment>
        {/* {row.competitions.length !== 0 ? ( */}
        <div
          className={classNames(classes.rowTable, classes.table)}
          style={{
            gridTemplateColumns: `50px 1fr 50px repeat(${
              competitions.length
            }, 100px)`,
            // justifyContent: "end"
            // marginLeft: "auto"
            alignItems: "center"
          }}
        >
          {/* <span className={classNames(classes.rowBlock)}>{rank}</span>
              <span className={classNames(classes.rowBlock, classes.rowName)}>
              {`${playerName} ${playerSurname}`}
            </span> */}
          <span className={classNames(classes.rowBlock)}>
            <SortButtons click={e => sorting("rank", e)} />
          </span>
          <span
            className={classNames(classes.rowBlock)}
            style={{
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "25px 1fr 2fr 25px"
            }}
          >
            <SortButtons click={e => sorting("playerSurname", e)} />
            <span>Zawodnik</span>
            <PlayersScoresForm
              // key={}
              className={classNames(classes.rowBlock)}
              // value={score}
              // classes={classes}
              label="Szukaj zawodnika"
              id="23sdf"
              score={""}
              player={"playerId"}
              turnament={"turnament"}
              sendValue={val => this.setState({ searching: val })}
              enterAction={this.handleSearching}
              button
            />
            <ButtonMy onClick={this.handleSearching} size="small">
              OK
            </ButtonMy>
          </span>
          <span className={classNames(classes.rowBlock)}>
            {Math.floor(totalScore)}
          </span>
          {/* <span className={classNames(classes.rowBlock)}> */}
          {row.competitions.length !== 0
            ? comps(competitions, classes, sorting)
            : null}
          {/* </span> */}
        </div>
        {/* ) : null} */}
      </React.Fragment>
    );
  }
}

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

export default enhance(SummaryRow);
