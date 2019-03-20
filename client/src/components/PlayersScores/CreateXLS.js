import React from "react";
import ReactExport from "react-data-export";
import { connect } from "react-redux";
import ButtonMy from "../../skins/ButtonMy";
// import { data } from "./dummy";
import * as actions from "../../actions";
import { arr_diff, latinize } from "../../functions/functions";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class CreateXLS extends React.Component {
  state = {
    data: []
  };

  // componentWillMount() {
  //
  // }

  createData = (data, compets) => {
    console.log("create", data, compets);

    if (compets.length > 0) {
      let modPlayers = [];
      let competitions = [];
      for (let comp of compets) {
        competitions.push(comp._id);
      }

      for (let player of data) {
        let modPlayer = { ...player };
        let competsPlayerArr = [];
        const competsInPlayer = player.competitions;

        for (let compInPlayer of competsInPlayer) {
          competsPlayerArr.push(compInPlayer.compId);
        }

        const emptyComps = arr_diff(competitions, competsPlayerArr);

        for (let empty of emptyComps) {
          competsInPlayer.push({ compId: empty, score: 0 });
        }

        for (let compInPlayer of competsInPlayer) {
          const thisCompName = compets.filter(
            x => x._id === compInPlayer.compId
          )[0].name;
          Object.assign(compInPlayer, { name: thisCompName });
          Object.assign(modPlayer, { [thisCompName]: compInPlayer.score });
        }
        modPlayers.push(modPlayer);
      }

      console.log("modPlayers", modPlayers);
      this.props.onClose();
      this.props.nulling("players");
      return modPlayers;
    } else {
      this.props.onClose();
      this.props.nulling("players");
      return data;
    }
  };

  render() {
    const { data, compets, name, onClose } = this.props;
    return (
      <ExcelFile
        // element={<button>Pobierz plik excel</button>}
        hideElement={true}
        filename={latinize(name).replace(" ", "_")}
      >
        {/* <ExcelFile> */}
        <ExcelSheet
          data={() => this.createData(data, compets)}
          name={latinize(name).replace(" ", "_")}
        >
          <ExcelColumn label="Numer startowy" value="number" />
          <ExcelColumn label="Imię" value="name" width="20" />
          <ExcelColumn label="Nazwisko" value="surname" width="20" />

          <ExcelColumn label="Klasa" value="klasa" />
          <ExcelColumn label="Team" value="team" />
          <ExcelColumn label="Klub" value="club" />
          <ExcelColumn label="Kaliber" value="caliber" />
          <ExcelColumn label="Broń" value="gun" />
          <ExcelColumn label="Luneta" value="scope" />

          {this.props.compets.map((x, i) => (
            <ExcelColumn
              key={i}
              label={`${x.name}`}
              value={`${x.name}`}
              // value="BirdBox"
            />
          ))}
          {/* <ExcelColumn label="Wallet Money" value="amount" />
          <ExcelColumn label="Gender" value="sex" />
          <ExcelColumn
            label="Marital Status"
            value={col => (col.is_married ? "Married" : "Single")}
          /> */}
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

const enhance = connect(
  null,
  actions
);

export default enhance(CreateXLS);
