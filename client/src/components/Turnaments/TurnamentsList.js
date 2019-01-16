import React, { Component } from "react";
import { connect } from "react-redux";
import TurnamentsRow from "./TurnamentsRow";
import TurnamentsHeadRow from "./TurnamentsHeadRow";
import { simpleSortUpDown } from "../../functions/functions";
import Search from '../../inputs/Search'

class TurnamentsList extends Component {
  state = {
    rows: []
  };

  componentDidMount() {
    this.setState({ rows: this.props.rows });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.rows !== nextProps.rows) {
      this.setState({ rows: nextProps.rows });
    }
  }

  sorting = (what, how) => {
    this.setState({ rows: simpleSortUpDown(this.state.rows, what, how) });
  };

  searching = (search) => {
    console.log('search', search);
    this.setState({rows: search})
  }

  render() {
    const grid =
      "50px minmax(80px, 100px) 1fr 1fr 1fr 1fr 1fr 1fr 1fr 70px 60px";
    const { collection } = this.props;
    const { rows } = this.state;
    return (
      <div>
        <Search data={this.props.rows} handleSearch={this.searching} columns={['name', 'facility', 'date', 'lzss', 'tech', 'judgeMain[name,surname]',  'judgeCounting[name,surname]',  'judgeRTS[name,surname]' ]}/>
        <TurnamentsHeadRow grid={grid} row={rows[0]} sorting={this.sorting} />
        {rows.length > 0 &&
          rows.map(row => (
            <TurnamentsRow
              key={row._id}
              row={row}
              collection={collection}
              grid={grid}
            />
          ))}
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
