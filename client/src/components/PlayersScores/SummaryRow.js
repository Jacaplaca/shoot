import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";

import classNames from "classnames";
import * as actions from "../../actions";

import { rowStyles, tableHeadStyles } from "../../skins/mainStyles";
import { combineStyles, formatNumber } from "../../functions/functions";
import PlayersScoresForm from "./PlayersScoresForm";
import SortButtons from "../../skins/SortButtons";
import ButtonMy from "../../skins/ButtonMy";
import RowHOC from "../RowHOC";
import Search from "../../inputs/Search";

let value = "";

const comps = (competitions, classes, sorting, competitionClicked, factor) => {
  // console.log("comps", competitions);
  return competitions.map(comp => {
    const { competition, competitionId, score } = comp;
    return (
      <span
        className={classNames(
          classes.rowBlock,
          competitionId === competitionClicked && classes.headBlockHighlight
        )}
        key={competitionId}
        style={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          gridTemplateColumns: "25px 1fr",
          // width: "100%"
          height: "100%"
          // display: "block"
        }}
      >
        <SortButtons click={e => sorting("competitions", e, competitionId)} />
        <span>
          {/* {Math.floor(score)} */}
          {!factor && (
            <NumberFormat
              value={formatNumber(score)}
              displayType={"text"}
              thousandSeparator={" "}
              decimalSeparator={","}
            />
          )}
        </span>
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

  searching = search => {
    console.log("search", search);
    // this.setState({ rows: search });
    this.props.searched(search);
  };

  render() {
    const {
      row,
      classes,
      sorting,
      searching,
      grid,
      rows,
      competitionClicked,
      factor
    } = this.props;
    const { totalScore, competitions, number } = row;
    // console.log("summaryRow", row);

    return (
      <React.Fragment>
        {/* {row.competitions.length !== 0 ? ( */}
        <div
          className={classNames(classes.headTable, classes.table)}
          style={{
            gridTemplateColumns: grid
            // position: "fixed"
            // justifyContent: "end"
            // marginLeft: "auto"
            // alignItems: "center"
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
              justifyContent: "start",
              justifySelf: "start",
              textAlign: "left",
              gridTemplateColumns: "25px 225px "
            }}
          >
            <SortButtons click={e => sorting("playerSurname", e)} />
            {/* <span>Zawodnik</span> */}
            <Search
              data={rows}
              handleSearch={this.searching}
              columns={["playerName", "playerSurname"]}
            />
            {/* <PlayersScoresForm
              // key={}
              // disabled={false}
              className={classNames(classes.rowBlock)}
              // value={this.state.val}
              // classes={classes}
              label="Szukaj zawodnika"
              id="23sdf"
              score={""}
              player={"playerId"}
              turnament={"turnament"}
              sendValue={val => this.setState({ searching: val })}
              enterAction={this.handleSearching}
              button
              enable
            />
            <ButtonMy onClick={this.handleSearching} size="small">
              OK
            </ButtonMy> */}
          </span>
          <span className={classNames(classes.rowBlock)}>
            <SortButtons click={e => sorting("number", e)} />
          </span>
          <span className={classNames(classes.rowBlock)}>
            {/* {Math.floor(totalScore)} */}
            {!factor && (
              <NumberFormat
                value={formatNumber(totalScore)}
                displayType={"text"}
                thousandSeparator={" "}
                decimalSeparator={","}
              />
            )}
          </span>
          {/* <span className={classNames(classes.rowBlock)}> */}
          {row.competitions.length !== 0
            ? comps(competitions, classes, sorting, competitionClicked, factor)
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

const combinedStyles = combineStyles(styles, rowStyles, tableHeadStyles);

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
