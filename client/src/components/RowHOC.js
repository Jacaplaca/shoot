import React, { Component } from "react";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";
import MenuContextTurnament from "../skins/MenuContextTurnament";

const RowRowHOC = WrappedComponent => {
  class RowRowHOC extends Component {
    state = {
      anchorEl: null
    };

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
      // console.log("handluje closa na menu");
      this.setState({ anchorEl: null });
    };

    render() {
      const {
        row: { _id },
        collection,
        classes,
        edit,
        editFetch,
        theme,
        toDeleteAction,
        auth: { user }
      } = this.props;
      const { anchorEl } = this.state;
      // console.log("RowRowHOC", this.props);
      // console.log("RowRowHOC", user);
      return (
        <React.Fragment>
          <div className={classNames(classes.rowTable, classes.table)}>
            <span className={classNames(classes.rowBlock)}>
              {user.rola === "admin" ? (
                <IconButton
                  onClick={() => editFetch(collection, _id)}
                  color="primary"
                  aria-label="Add to shopping cart"
                >
                  <Edit />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => editFetch(collection, _id)}
                  color="primary"
                  aria-label="Add to shopping cart"
                >
                  <Search />
                </IconButton>
              )}
            </span>
            <WrappedComponent {...this.props} />
            <span className={classNames(classes.rowBlock)}>
              {user.rola === "admin" ? (
                <IconButton
                  aria-label="Delete"
                  onClick={() => toDeleteAction(_id)}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="primary"
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </span>
          </div>
          <MenuContextTurnament
            turnamentId={_id}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          />
        </React.Fragment>
      );
    }
  }
  return RowRowHOC;
};

export default RowRowHOC;