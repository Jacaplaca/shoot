import React, { Component } from "react";
import { connect } from "react-redux";
import PromotersRow from "./PromotersRow";
import PromotersHeadRow from "./PromotersHeadRow";
import { simpleSortUpDown } from "../../functions/functions";
import Search from '../../inputs/Search'

class PromotersList extends Component {
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
    const { collection } = this.props;
    const {rows} = this.state
    const grid = "50px 1fr 1fr 1fr 1fr 70px 60px";
    return (
      <div>
      <Search data={this.props.rows} handleSearch={this.searching} columns={['name', 'email', 'adres', 'www' ]}/>
        <PromotersHeadRow grid={grid} row={rows[0]} sorting={this.sorting} />
        {rows.length > 0 &&
          rows.map(row => (
            <PromotersRow
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
  rows: state.promoters
});

export default connect(mapStateToProps)(PromotersList);
