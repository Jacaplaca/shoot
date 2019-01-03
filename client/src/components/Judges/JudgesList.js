import React, { Component } from "react";
import { connect } from "react-redux";
import JudgesHeadRow from "./JudgesHeadRow";
import { simpleSortUpDown } from "../../functions/functions";
import JudgesRow from "./JudgesRow";

class JudgesList extends Component {
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

  render() {
    const grid = "50px 1fr 1fr  60px";
    const { collection } = this.props;
    const { rows } = this.state;
    return (
      <div>
        {rows.length > 0 && (
          <div>
            <JudgesHeadRow grid={grid} row={rows[0]} sorting={this.sorting} />
            {rows.map(row => (
              <JudgesRow
                key={row._id}
                row={row}
                collection={collection}
                grid={grid}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  rows: state.judges
});

export default connect(mapStateToProps)(JudgesList);
