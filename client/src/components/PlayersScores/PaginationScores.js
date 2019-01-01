import React, { Component } from "react";
import PlayersScoresRow from "./PlayersScoresRow";
import PaginationRow from "./PaginationRow";
// import { withTheme } from "@material-ui/core/styles";
// import { compose } from "redux";
// import { connect } from "react-redux";
// import MainFrameHOC from "../skins/MainFrameHOC";
// import * as actions from "../actions";
// import PlayersForm from "./Players/PlayersForm";
// import PlayersList from "./Players/PlayersList";

// const collection = "players";

class PaginationScores extends Component {
  state = {
    matrixPaginated: [],
    page_size: 4,
    page_number: 1,
    howManyPages: 0
  };

  // componentDidMount() {
  //   this.paginate(
  //     this.props.data,
  //     this.state.page_size,
  //     this.state.page_number
  //   );
  // }

  componentWillReceiveProps(nextProps) {
    this.paginate(nextProps.data, this.state.page_size, this.state.page_number);
  }

  paginate = (array, page_size, page_number) => {
    console.log(array, page_size, page_number);
    --page_number; // because pages logically start with 1, but technically with 0

    this.setState({
      howManyPages: Math.ceil(array.length / page_size),
      matrixPaginated: array.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      )
    });
    // return array.slice(page_number * page_size, (page_number + 1) * page_size);
  };

  changePage = e => {
    const { page_number, matrixPaginated, howManyPages } = this.state;
    const { data } = this.props;
    // const howManyPages = Math.ceil(data.length / page_size);
    let newPage = page_number;
    if (e === "left" && page_number > 1) {
      newPage = newPage - 1;
      this.setState({ page_number: newPage });
      this.paginate(data, this.state.page_size, newPage);
    } else if (e === "right" && page_number < howManyPages) {
      newPage = newPage + 1;
      this.setState({ page_number: newPage });
      this.paginate(data, this.state.page_size, newPage);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.matrixPaginated.map(player => (
          <PlayersScoresRow
            key={player.playerId}
            row={player}
            turnament={this.props.turnament}
          />
        ))}
        <PaginationRow
          changePageNumber={this.changePage}
          page={this.state.page_number}
          pages={this.state.howManyPages}
        />
      </React.Fragment>
    );
  }
}

export default PaginationScores;
