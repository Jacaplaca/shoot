import React, { Component } from "react";
import { connect } from "react-redux";
import PlayersRow from "./PlayersRow";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import store from "../../store";
import * as actions from "../../actions";
import Pagination from "../../skins/Pagination";
import PlayersHeadRow from "./PlayersHeadRow";
import { simpleSortUpDown } from "../../functions/functions";

class PlayersList extends Component {
  state = {
    rows: []
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.rows !== nextProps.rows) {
      this.setState({ rows: nextProps.rows });
    }
  }

  sorting = (what, how) => {
    this.setState({ rows: simpleSortUpDown(this.state.rows, what, how) });
  };

  render() {
    const { rows, collection, turnaments } = this.props;
    const grid = "50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 60px";
    return (
      <div>
        <div style={{ marginBottom: 15 }}>
          <InputSelectBaza
            object={turnaments}
            name="turnament"
            type="string"
            wybrano={e => {
              store.dispatch(actions.showedTurnament(e.target.value));

              store.dispatch(
                actions.fetchFromDB(
                  collection,
                  `/api/${collection}/turnament/${e.target.value}`
                )
              );
            }}
            // value={{ value: "st" }}
            label="Zawody"
          />
        </div>
        {rows.length > 0 && (
          <PlayersHeadRow grid={grid} row={rows[0]} sorting={this.sorting} />
        )}
        <Pagination data={rows}>
          <PlayersRows rows={rows} collection={collection} grid={grid} />
        </Pagination>
      </div>
    );
  }
}

const PlayersRows = ({ rows, collection, grid, sorting }) => {
  return (
    rows.length > 0 &&
    rows.map(row => (
      <PlayersRow
        key={row._id}
        row={row}
        collection={collection}
        grid={grid}
        sorting={sorting}
      />
    ))
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  rows: state.players,
  turnaments: state.turnaments
});

export default connect(
  mapStateToProps,
  actions
)(PlayersList);
