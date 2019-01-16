import React, { Component } from "react";
import PaginationRow from "./PaginationRow";

class Pagination extends Component {
  constructor(props) {
    super(props);

    // Create the ref
    this.paginationRef = React.createRef();
  }

  state = {
    matrixPaginated: [],
    page_size: 10,
    page_number: 1,
    howManyPages: 0
  };

  componentWillReceiveProps(nextProps) {
    console.log('pagination', nextProps);
    if (nextProps && nextProps.data && nextProps.data[0] && nextProps.data.length !== this.props && this.props.data && this.props.data[0] ) {
      this.setState({page_number:1}, () => {
        this.paginate(nextProps.data, this.state.page_size, this.state.page_number);
      })
    } else {
      this.paginate(nextProps.data, this.state.page_size, this.state.page_number);
    }
  }

  changePageSize = size => {
    this.paginate(this.props.data, size, 1);
    this.setState({ page_size: size, page_number: 1 });
  };

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
    const { children, data } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        rows: this.state.matrixPaginated
        // turnament: this.props.turnament
      })
    );
    return (
      <React.Fragment>
        {childrenWithProps}
        {data.length > 9 && (
          <PaginationRow
            changePageNumber={this.changePage}
            page={this.state.page_number}
            pages={this.state.howManyPages}
            size={this.changePageSize}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Pagination;
