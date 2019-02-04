import React, { Component } from "react";
import { connect } from "react-redux";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TurnamentsRow from "./TurnamentsRow";
import TurnamentsHeadRow from "./TurnamentsHeadRow";
import { simpleSortUpDown } from "../../functions/functions";
import Search from "../../inputs/Search";

class TurnamentsList extends Component {
  state = {
    rows: [],
    zaplanowane: true,
    zakonczone: true,
    www: false
  };

  componentDidMount() {
    this.setState({ rows: this.props.rows });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.rows !== nextProps.rows) {
      this.setState({ rows: nextProps.rows });
    }
  }

  handleChange = name => event => {
    const { zaplanowane, zakonczone, www } = this.state;
    let rows = [];
    if (name === "www" && www) {
      rows = this.props.rows;
      this.setState({ zaplanowane: true, zakonczone: true });
    } else if (name === "www" && !www) {
      rows = this.props.rows.filter(row => row.www === true);
      this.setState({ zaplanowane: true, zakonczone: true });
    }

    if (zaplanowane && zakonczone) {
      this.setState({ www: false });
      if (name === "zaplanowane") {
        rows = this.props.rows.filter(row => row.finished === true);
      } else if (name === "zakonczone") {
        rows = this.props.rows.filter(row => row.finished === false);
      }
    } else if (zaplanowane && !zakonczone) {
      this.setState({ www: false });
      if (name === "zaplanowane") {
        rows = [];
      } else if (name === "zakonczone") {
        rows = this.props.rows;
      }
    } else if (!zaplanowane && zakonczone) {
      this.setState({ www: false });
      if (name === "zaplanowane") {
        rows = this.props.rows;
      } else if (name === "zakonczone") {
        rows = [];
      }
    } else if (!zaplanowane && !zakonczone) {
      this.setState({ www: false });
      if (name === "zaplanowane") {
        rows = this.props.rows.filter(row => row.finished === false);
      } else if (name === "zakonczone") {
        rows = this.props.rows.filter(row => row.finished === true);
      }
    }

    // if (!zaplanowane && !zakonczone) {
    //   if (name === "zaplanowane") {
    //     rows = this.props.rows.filter(
    //       row => row.finished === !event.target.checked
    //     );
    //   } else if (name === "zakonczone") {
    //     rows = this.props.rows.filter(
    //       row => row.finished === event.target.checked
    //     );
    //   }
    // } else if ((zaplanowane && !zakonczone) && ()) {
    //   if (name === 'zaplanowane') {
    //     rows = []
    //   } else {
    //     rows = this.props.rows
    //   }
    // } else if (!zaplanowane && zakonczone) {
    //   if (name === 'zaplanowane') {
    //     rows = this.props.rows
    //   } else {
    //     rows = []
    //   }
    // } else if (true) {
    //
    // }

    this.setState({ [name]: event.target.checked, rows });
  };

  sorting = (what, how) => {
    this.setState({ rows: simpleSortUpDown(this.state.rows, what, how) });
  };

  searching = search => {
    console.log("search", search);
    this.setState({ rows: search });
  };

  render() {
    const {
      collection,
      auth: { user, isAuthenticated }
    } = this.props;
    const { rows } = this.state;
    const grid =
      user.rola === "admin"
        ? "50px minmax(80px, 100px) 1fr 1fr 1fr 1fr 1fr 70px 60px"
        : "5px minmax(80px, 100px) 1fr 1fr 1fr 1fr 70px 60px";
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.zaplanowane}
                  onChange={this.handleChange("zaplanowane")}
                  value="zaplanowane"
                />
              }
              label="Zaplanowane"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.zakonczone}
                  onChange={this.handleChange("zakonczone")}
                  value="zakonczone"
                  // color="primary"
                />
              }
              label="Zakończone"
            />
            {isAuthenticated && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.www}
                    onChange={this.handleChange("www")}
                    value="www"
                    // color="primary"
                  />
                }
                label="Tylko opublikowane"
              />
            )}
          </FormGroup>
          <Search
            data={this.props.rows}
            handleSearch={this.searching}
            columns={[
              "name",
              "facility",
              "date",
              "lzss",
              "tech",
              "judgeMain[name,surname]",
              "judgeCounting[name,surname]",
              "judgeRTS[name,surname]"
            ]}
          />
        </div>
        <TurnamentsHeadRow grid={grid} row={rows[0]} sorting={this.sorting} />
        {rows.length > 0 &&
          rows.map(row => {
            if (isAuthenticated) {
              return (
                <TurnamentsRow
                  key={row._id}
                  row={row}
                  collection={collection}
                  grid={grid}
                />
              );
            } else {
              if (row.www) {
                return (
                  <TurnamentsRow
                    key={row._id}
                    row={row}
                    collection={collection}
                    grid={grid}
                  />
                );
              } else {
                return null;
              }
            }
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

export default connect(mapStateToProps)(TurnamentsList);
