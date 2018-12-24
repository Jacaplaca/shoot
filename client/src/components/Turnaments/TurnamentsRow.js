import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import EventListener, { withOptions } from "react-event-listener";
import classNames from "classnames";
import {
  darken,
  emphasize,
  lighten
} from "@material-ui/core/styles/colorManipulator";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Confirmation from "../../skins/Confirmation";
import { fetchTurnaments } from "../../actions/turnaments";
import { editFetch } from "../../actions/edit";
// import { style } from "../../index";

// import obrazek from '../../'
class TurnamentsRow extends Component {
  state = {
    confirmation: false,
    toDelete: null
  };

  handleDelete = async () => {
    const id = this.state.toDelete;
    console.log("handleDelete", id);
    axios
      .post(`/api/turnaments/remove/${id}`)
      .then(response => {
        console.log(response);
        this.props.fetchTurnaments();
      })
      .catch(e => console.log(e));
    this.closeConfirmation();
  };

  openConfirmation = _id => [
    this.setState({ confirmation: true, toDelete: _id })
  ];
  closeConfirmation = () => [
    this.setState({ confirmation: false, toDelete: null })
  ];

  handleResize = () => {
    console.log("resize");
  };

  render() {
    console.log("row styles", styles);
    const { turnament, classes, edit, editFetch, theme } = this.props;
    const {
      _id,
      date,
      name,
      facility,
      judgeMain,
      judgeRTS,
      judgeCounting,
      lzss,
      tech,
      logo
    } = turnament;
    const { confirmation } = this.state;
    return (
      <React.Fragment>
        <EventListener
          target="window"
          onResize={this.handleResize}
          onScroll={withOptions(this.handleScroll, {
            passive: true,
            capture: false
          })}
        />
        <Confirmation
          open={confirmation}
          action={this.handleDelete}
          close={this.closeConfirmation}
        />
        <div className={classes.table}>
          <span className={classes.main}>
            <IconButton
              onClick={() => editFetch("turnaments", _id)}
              color="primary"
              aria-label="Add to shopping cart"
            >
              <Edit />
            </IconButton>
          </span>
          <span className={classNames(classes.main, classes.date)}>{date}</span>
          <span className={classNames(classes.main, classes.name)}>{name}</span>
          <span className={classNames(classes.main)}>{facility}</span>
          <span className={classNames(classes.main)}>{`${judgeMain.name} ${
            judgeMain.surename
          }`}</span>
          <span className={classNames(classes.main)}>{`${judgeCounting.name} ${
            judgeCounting.surename
          }`}</span>
          <span className={classNames(classes.main)}>{`${judgeRTS.name} ${
            judgeRTS.surename
          }`}</span>
          <span className={classNames(classes.main)}>{lzss}</span>
          <span className={classNames(classes.main)}>{tech}</span>
          <span className={classNames(classes.main)}>
            <img className={classes.logo} src={require(`../../${logo}`)} />
          </span>
          <span className={classNames(classes.main)}>
            <IconButton
              // className={classes.button}
              aria-label="Delete"
              onClick={() => this.openConfirmation(_id)}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export const styles = theme => ({
  back: { background: "red", color: "yellow", fontWeight: "800" },
  main: {
    alignSelf: "center",
    justifySelf: "center",
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: "center"
  },
  test: { fontWeight: "900", color: "red" },
  table: {
    display: "grid",
    minWidth: 900,
    gridTemplateColumns:
      "50px minmax(80px, 100px) 1fr 1fr 1fr 1fr 1fr 1fr 1fr 70px 60px",
    color: theme.palette.text.primary,
    background: lighten(theme.palette.menu, 0.1),
    marginBottom: 6
  },
  container: {
    color: theme.palette.text.primary,
    background: lighten(theme.palette.menu, 0.1),
    marginBottom: 6
  },
  date: {
    fontWeight: 600
  },
  name: {
    fontWeight: 600
  },
  logo: {
    width: 60,
    height: 60,
    padding: 5
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
  // promoters: state.promoters,
  // judges: state.judges
});

// export default TurnamentsRow;

// export default compose(
//   withStyles(styles, { withTheme: true }),
//   // MainFrameHOC
// )(TurnamentsRow);

// export default withStyles(styles, { withTheme: true })(
//   connect(
//     mapStateToProps,
//     { fetchTurnaments }
//   )(TurnamentsRow)
// );

const enhance = compose(
  // withRouter,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    { fetchTurnaments, editFetch }
  )
);

export default enhance(TurnamentsRow);
