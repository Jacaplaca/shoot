import React, { Component } from "react";
import { connect } from "react-redux";
import CompetitionsRow from "./CompetitionsRow";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import store from "../../store";
import * as actions from "../../actions";

class CompetitionsList extends Component {
  state = {
    turnamentId: null,
    competitions: []
  };

  // findCompetitions = turnamentId => {
  //   const rowToDisplay = this.props.rows.filter(row => row._id === turnamentId);
  //   console.log("rowToDisplay", rowToDisplay);
  //   this.setState({ competitions: rowToDisplay[0].competitions });
  // };

  render() {
    const { rows, collection } = this.props;
    const turnamentToDisplay = rows.filter(
      row => row._id === this.state.turnamentId
    );
    // console.log("rowToDisplay", turnamentToDisplay);
    const competitions =
      turnamentToDisplay.length > 0 ? turnamentToDisplay[0].competitions : [];
    // console.log("competitions", competitions);

    return (
      <div>
        <InputSelectBaza
          object={rows}
          name="turnament"
          type="string"
          // wybrano={e => this.findCompetitions(e.target.value)}
          wybrano={e => this.setState({ turnamentId: e.target.value })}
          label="Zawody"
        />

        {competitions.length > 0 &&
          competitions.map(row => {
            console.log(row);
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

// const CompetitionsList = ({ rows, collection }) => {
//
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  rows: state.turnaments
  // turnaments: state.turnaments
});

export default connect(mapStateToProps)(CompetitionsList);
