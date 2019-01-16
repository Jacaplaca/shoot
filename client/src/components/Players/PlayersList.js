import React, { Component } from "react";
import { connect } from "react-redux";
import PlayersRow from "./PlayersRow";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import store from "../../store";
import * as actions from "../../actions";
import Pagination from "../../skins/Pagination";
import PlayersHeadRow from "./PlayersHeadRow";
import { simpleSortUpDown } from "../../functions/functions";
import Search from '../../inputs/Search'

class PlayersList extends Component {
  state = {
    rows: [],
    players: []
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.rows !== nextProps.rows) {
      this.setState({ rows: nextProps.rows, players: nextProps.rows  });
    }
  }

  sorting = (what, how) => {
    this.setState({ rows: simpleSortUpDown(this.state.players, what, how) });
  };

  searching = (search) => {
    console.log('search', search);
    this.setState({players: search})
  }


  render() {
    const { rows, collection, turnaments } = this.props;
    const {players} = this.state
    const grid = "50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 60px";
    return (
      <div>
        <div style={{ marginBottom: 15,
          display: 'grid',
          gridTemplateColumns: "50% 50%" }}>
          <InputSelectBaza
            object={turnaments}
            name="turnament"
            type="string"
            wybrano={e => {
              // console.log('eplyers list', e.target.value);
              store.dispatch(actions.showedTurnament(e.target.value || null));

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
          <Search data={rows} handleSearch={this.searching} columns={['name', 'surname', 'caliber', 'club', 'gun', 'scope', 'team', 'rank' ]}/>
        </div>
        {players.length > 0 && (
          <PlayersHeadRow grid={grid} row={players[0]} sorting={this.sorting} />
        )}
        <Pagination data={players}>
          <PlayersRows rows={players} collection={collection} grid={grid} />
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
