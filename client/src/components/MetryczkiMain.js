import React, { Component } from "react";
import { withTheme } from "@material-ui/core/styles";
import { compose } from "redux";
import axios from "axios";
import { connect } from "react-redux";
import MainFrameHOC from "../skins/MainFrameHOC";
import * as actions from "../actions";
import * as jsPDF from "jspdf";
import { dynamicSort, addRank, searchingInArray } from "../functions/functions";
// import PlayersScoresForm from "./PlayersScores/PlayersScoresForm";
// import PlayersScoresList from "./PlayersScores/PlayersScoresList";

const collection = "playersScores";

class MetryczkiMain extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  demoFromHTML = () => {
    var pdf = new jsPDF("p", "mm", "a4");
    const source = this.myRef.current;
    console.log(source);
    // const specialElementHandlers = {
    //   // element with id of "bypass" - jQuery style selector
    //   "#bypassme": function(element, renderer) {
    //     // true = "handled elsewhere, bypass text extraction"
    //     return true;
    //   }
    // };
    const margins = {
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
      // width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top,
      {
        // y coord
        width: margins.width // max width of content on PDF
        // elementHandlers: specialElementHandlers
      },

      function(dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        pdf.save("Test.pdf");
      },
      margins
    );
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.demoFromHTML()}>PDF</button>
        <div
          ref={this.myRef}
          style={{
            background: "gray",
            // width: 333,
            // height: 45,
            display: "grid",
            gridTemplateColumns: "1fr 1fr"
          }}
        >
          <table>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>
                Alfreds Futterkiste asdf sadfsdfasd asdfasdf asdfasdfasdfasf
              </td>
              <td>Maria Anderssadf sadfsadfsd sdfsadfsadf sadfasdfasdf </td>
              <td>Germanysadf asdf asdfa sdfasdfsadf asdfasdfa</td>
            </tr>
          </table>
        </div>
      </React.Fragment>
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

const enhance = compose(
  // withRouter,
  withTheme(),
  connect(
    mapStateToProps,
    actions
  ),
  MainFrameHOC({ collection })
);

export default enhance(MetryczkiMain);
