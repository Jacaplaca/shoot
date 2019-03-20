import React from "react";
import ReactExport from "react-data-export";
import { connect } from "react-redux";
import ButtonMy from "../../skins/ButtonMy";
import * as actions from "../../actions";
import CreateXLS from "./CreateXLS";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
    name: "Johson",
    amount: 30000,
    sex: "M",
    is_married: true
  },
  {
    name: "Monika",
    amount: 355000,
    sex: "F",
    is_married: false
  },
  {
    name: "John",
    amount: 250000,
    sex: "M",
    is_married: false
  },
  {
    name: "Josef",
    amount: 450500,
    sex: "M",
    is_married: true
  }
];

var dataSet2 = [
  {
    name: "Johnson",
    total: 25,
    remainig: 16
  },
  {
    name: "Josef",
    total: 25,
    remainig: 7
  }
];

class ExportExcel extends React.Component {
  state = {
    competitions: [],
    turnament: {},
    players: [],
    data: null
  };

  // componentWillMount() {
  //
  // }

  fetchCompetitions = (turnaments, players) => {
    // console.log("fetchCompetitions()");
    const {
      // turnaments,
      id: turnamentId
    } = this.props;
    const turnament = turnaments.filter(x => x._id === turnamentId);
    const competitions =
      turnaments && turnaments[0] && turnament[0].competitions;
    this.setState({
      turnament: turnament[0],
      competitions,
      players
    });
  };

  createDataSet = () => {
    const { id: turnamentId, fetchFromDB, turnaments, players } = this.props;
    fetchFromDB("players", null, turnamentId);
    this.fetchCompetitions(turnaments, players);
    // console.log("props.", this.props.players);
  };

  render() {
    // console.log("data", data);
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        onClick={this.createDataSet}
      >
        <span>Export do Excela</span>
        {this.props.players.length > 0 &&
          this.state.competitions.length > 0 &&
          this.state.turnament.name && (
            <CreateXLS
              data={this.props.players}
              compets={this.state.competitions}
              name={this.state.turnament.name}
              onClose={this.props.onClose}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  confirmation: state.confirmation,
  turnaments: state.turnaments,
  players: state.players
});

const enhance = connect(
  mapStateToProps,
  actions
);

export default enhance(ExportExcel);
