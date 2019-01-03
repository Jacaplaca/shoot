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

  render() {
    const { rows, collection } = this.props;
    const turnamentToDisplay = rows.filter(
      row => row._id === this.state.turnamentId
    );
    const competitions =
      turnamentToDisplay.length > 0 ? turnamentToDisplay[0].competitions : [];

    return (
      <div>
        <div
          style={{
            marginBottom: 15
          }}
        >
          <InputSelectBaza
            object={rows}
            name="turnament"
            type="string"
            wybrano={e => this.setState({ turnamentId: e.target.value })}
            label="Zawody"
          />
        </div>

        {competitions.length > 0 &&
          competitions.map(row => {
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
