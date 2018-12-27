import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Confirmation from "../../skins/Confirmation";
import * as actions from "../../actions";
// import { mainStyles } from "../../skins/MainContainer";
import { rowStyles } from "../../skins/mainStyles";
import { combineStyles } from "../../functions/functions";

const component = "promoters";

const PromotersRow = props => {
  const {
    row,
    classes,
    edit,
    editFetch,
    theme,
    toDeleteAction,
    confirmationAction,
    confirmation,
    deleteIdAndFetch
  } = props;
  const { _id, name, email, adres, logo, www } = row;
  return (
    <React.Fragment>
      <Confirmation
        open={confirmation}
        action={() => deleteIdAndFetch(component)}
        close={() => {
          confirmationAction(false);
          toDeleteAction(null);
        }}
      />
      <div className={classNames(classes.rowTable, classes.table)}>
        <span className={classes.main}>
          <IconButton
            onClick={() => editFetch(component, _id)}
            color="primary"
            aria-label="Add to shopping cart"
          >
            <Edit />
          </IconButton>
        </span>

        <span className={classNames(classes.rowBlock, classes.rowName)}>
          {name}
        </span>
        <span className={classNames(classes.rowBlock)}>{email}</span>
        <span className={classNames(classes.rowBlock)}>{adres}</span>
        <span className={classNames(classes.rowBlock)}>{www}</span>
        <span className={classNames(classes.rowBlock)}>
          <img className={classes.rowImg} src={require(`../../${logo}`)} />
        </span>

        <span className={classNames(classes.rowBlock)}>
          <IconButton aria-label="Delete" onClick={() => toDeleteAction(_id)}>
            <DeleteIcon />
          </IconButton>
        </span>
      </div>
    </React.Fragment>
  );
};

const styles = theme => ({
  table: {
    gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 70px 60px"
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  confirmation: state.confirmation
});

const combinedStyles = combineStyles(styles, rowStyles);

const enhance = compose(
  // withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
);

export default enhance(PromotersRow);
