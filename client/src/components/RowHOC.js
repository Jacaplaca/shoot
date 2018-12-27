import React, { Component } from "react";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

const RowRowHOC = WrappedComponent => {
  const RowRowHOC = props => {
    const {
      row: { _id },
      collection,
      classes,
      edit,
      editFetch,
      theme,
      toDeleteAction
    } = props;
    return (
      <React.Fragment>
        <div className={classNames(classes.rowTable, classes.table)}>
          <span className={classes.main}>
            <IconButton
              onClick={() => editFetch(collection, _id)}
              color="primary"
              aria-label="Add to shopping cart"
            >
              <Edit />
            </IconButton>
          </span>
          <WrappedComponent {...props} />
          <span className={classNames(classes.rowBlock)}>
            <IconButton aria-label="Delete" onClick={() => toDeleteAction(_id)}>
              <DeleteIcon />
            </IconButton>
          </span>
        </div>
      </React.Fragment>
    );
  };
  return RowRowHOC;
};

export default RowRowHOC;
