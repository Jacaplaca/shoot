import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as actions from "../../actions";
import { rowStyles } from "../../skins/mainStyles";
import { combineStyles } from "../../functions/functions";
import RowHOC from "../RowHOC";
import RowBlock from "../../skins/RowBlock";

const TurnamentsRow = ({ row, classes, grid, auth: { user } }) => {
  const {
    date,
    name,
    facility,
    judgeMain,
    judgeRTS,
    judgeCounting,
    lzss,
    tech,
    logo,
    promoterName
  } = row;
  let isImage = false;
  try {
    var image = require(`../../${logo}`);
    isImage = true;
    // do stuff
    // console.log("img ok");
  } catch (e) {
    // console.log("e", e);
    isImage = false;
    // console.log(ex);
  }
  // const isImage = typeof require(`../../${logo}`);
  // console.log(
  //   "image",
  //   require(`../../${logo}`),
  //   "type",
  //   typeof require(`../../${logo}`)
  // );
  // console.log("image", );
  // console.log("image", isImage);
  return (
    <React.Fragment>
      <RowBlock>{date}</RowBlock>
      {user.rola === "admin" && <RowBlock>{promoterName}</RowBlock>}
      <RowBlock>{name}</RowBlock>
      <RowBlock>{facility}</RowBlock>
      <RowBlock>
        {judgeMain ? `${judgeMain.name} ${judgeMain.surname}` : "usunięto"}
      </RowBlock>
      {/* <span className={classNames(classes.rowBlock)}>
        {judgeCounting
          ? `${judgeCounting.name} ${judgeCounting.surname}`
          : "usnięto"}
      </span>
      <span className={classNames(classes.rowBlock)}>
        {judgeRTS ? `${judgeRTS.name} ${judgeRTS.surname}` : "usunięto"}
      </span> */}
      <RowBlock>{lzss}</RowBlock>
      {/* <span className={classNames(classes.rowBlock)}>{tech}</span> */}
      <RowBlock>
        {isImage && (
          <img className={classes.rowImg} src={require(`../../${logo}`)} />
        )}
      </RowBlock>
    </React.Fragment>
  );
};

const styles = theme => ({
  table: {
    // gridTemplateColumns: grid
    // gridTemplateColumns:
    //   "50px minmax(80px, 100px) 1fr 1fr 1fr 1fr 1fr 1fr 1fr 70px 60px"
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const combinedStyles = combineStyles(styles, rowStyles);

const enhance = compose(
  // withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  ),
  RowHOC
);

export default enhance(TurnamentsRow);
