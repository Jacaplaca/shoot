import React, { Component } from "react";
import { connect } from "react-redux";
import CompetitionsRow from "./CompetitionsRow";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import store from "../../store";
import * as actions from "../../actions";
import Search from "../../inputs/Search";

class CompetitionsList extends Component {
  state = {
    turnamentId: null,
    competitions: [],
    competitionsFiltered: []
  };

  searching = search => {
    console.log("search", search);
    this.setState({ competitionsFiltered: search });
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.turnamentId && this.props.rows !== nextProps.rows) {
      this.chooseTurnament(this.state.turnamentId, nextProps.rows);
      console.log(
        "otrzymal inne propsy czy nie",
        this.state.turnamentId,
        this.props.rows !== nextProps.rows
      );
    }
  }

  chooseTurnament = (turnamentId, rows) => {
    console.log("chooseTurnament", turnamentId);
    // const { rows } = this.props;
    const turnament = rows.filter(row => row._id === turnamentId);
    const turnamentCompetitions =
      turnament &&
      turnament.length > 0 &&
      turnament[0] &&
      turnament[0].competitions;
    this.setState({
      turnamentId,
      competitions: turnamentCompetitions,
      competitionsFiltered: turnamentCompetitions
    });
  };

  render() {
    const { rows, collection } = this.props;
    const { competitions, competitionsFiltered } = this.state;
    console.log("competitions rows", competitionsFiltered);
    // const turnamentToDisplay = rows.filter(
    //   row => row._id === this.state.turnamentId
    // );
    // const competitions =
    //   turnamentToDisplay.length > 0 ? turnamentToDisplay[0].competitions : [];

    return (
      <div>
        <div
          style={{
            marginBottom: 15,
            display: "grid",
            gridTemplateColumns: "50% 50%"
          }}
        >
          <InputSelectBaza
            object={rows}
            name="turnament"
            type="string"
            // wybrano={e => this.setState({ turnamentId: e.target.value })}
            wybrano={e => this.chooseTurnament(e.target.value, this.props.rows)}
            label="Zawody"
          />
          <Search
            data={competitions}
            handleSearch={this.searching}
            columns={["name", "judge[name,surname,judgeClass]"]}
          />
        </div>

        {competitionsFiltered.length > 0 &&
          competitionsFiltered.map(row => {
            return (
              <CompetitionsRow
                key={row._id}
                row={row}
                collection={collection}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  rows: state.turnaments
});

export default connect(mapStateToProps)(CompetitionsList);
