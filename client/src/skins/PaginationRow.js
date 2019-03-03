import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as actions from "../actions";
import { rowStyles } from "./mainStyles";
import { combineStyles } from "../functions/functions";
// import PlayersScoresForm from "./PlayersScoresForm";
import SortButtons from "./SortButtons";
import PaginationButtons from "./PaginationButtons";
import PagingJump from "./PagingJump";
// import ButtonMy from "../skins/ButtonMy";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import RowHOC from "../RowHOC";

let value = "";

// const comps = (competitions, classes, sorting) => {
//   // console.log("comps", competitions);
//   return competitions.map(comp => {
//     const { competition, competitionId, score } = comp;
//     return (
//       <span
//         className={classNames(classes.rowBlock)}
//         key={competitionId}
//         style={{
//           display: "grid",
//           alignItems: "center",
//           justifyContent: "center",
//           gridTemplateColumns: "25px 1fr"
//         }}
//       >
//         <SortButtons click={e => sorting("competitions", e, competitionId)} />
//         <span>{score}</span>
//       </span>
//       // <PlayersScoresForm
//       //   key={competitionId}
//       //   className={classNames(classes.rowBlock)}
//       //   // value={score}
//       //   // classes={classes}
//       //   label={competition}
//       //   id={competitionId}
//       //   score={score ? score.toString() : "0"}
//       //   player={playerId}
//       //   turnament={turnament}
//       // />
//     );
//   });
// };
class PaginationRow extends Component {
  state = { search: "", anchorEl: null };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    // console.log("handluje closa na menu");
    this.setState({ anchorEl: null });
  };

  handleSearching = () => {
    this.props.searching(["playerName", "playerSurname"], this.state.searching);
  };
  render() {
    const { row, classes, changePageNumber, page, pages, size } = this.props;
    // const { totalScore, competitions } = row;
    // console.log("summaryRow", row);

    return (
      <React.Fragment>
        {/* {row.competitions.length !== 0 ? ( */}
        <div
          className={classNames(classes.rowTable, classes.table)}
          style={{
            gridTemplateColumns: `50px 50px 50px 50px`,
            justifyContent: "end",
            // marginLeft: "auto"
            alignItems: "center"
          }}
        >
          {/* <span className={classNames(classes.rowBlock)}>{rank}</span>
              <span className={classNames(classes.rowBlock, classes.rowName)}>
              {`${playerName} ${playerSurname}`}
            </span> */}

          <span className={classNames(classes.rowBlock)}>
            {/* <SortButtons click={e => sorting("rank", e)} /> */}
            <IconButton
              color="primary"
              aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
          </span>
          <span className={classNames(classes.rowBlock)}>
            {/* <SortButtons click={e => sorting("rank", e)} /> */}
            <PaginationButtons left click={e => changePageNumber(e)} />
          </span>
          <span className={classNames(classes.rowBlock)}>
            {/* <SortButtons click={e => sorting("rank", e)} /> */}
            {`${page}/${pages}`}
          </span>
          {/* <span
            className={classNames(classes.rowBlock)}
            style={{
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "25px 1fr 2fr 25px"
            }}
          >
            <SortButtons click={e => sorting("playerName", e)} />
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
          </span> */}
          <span className={classNames(classes.rowBlock)}>
            <PaginationButtons right click={e => changePageNumber(e)} />
          </span>
          {/* <span className={classNames(classes.rowBlock)}> */}
          {/* {row.competitions.length !== 0
            ? comps(competitions, classes, sorting)
            : null} */}
          {/* </span> */}
        </div>
        {/* ) : null} */}
        <PagingJump
          // turnamentId={_id}
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          pageSize={this.props.pageSize}
          action={e => {
            size(e), this.handleClose();
          }}
        />
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

export default enhance(PaginationRow);
