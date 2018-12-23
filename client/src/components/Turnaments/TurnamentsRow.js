import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
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

  render() {
    const { turnament, classes, edit } = this.props;
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
        <Confirmation
          open={confirmation}
          action={this.handleDelete}
          close={this.closeConfirmation}
        />
        <div className={classes.container}>
          <IconButton
            onClick={() => edit(turnament)}
            color="primary"
            className={classes.button}
            aria-label="Add to shopping cart"
            // disabled={wyslano ? true : false}
          >
            <Edit />
          </IconButton>
          <span className={classes.date}>{date}</span>
          <span className={classes.name}>{name}</span>
          <span className={classes.typical}>{facility}</span>
          <span className={classes.typical}>{`${judgeMain.name} ${
            judgeMain.surename
          }`}</span>
          <span className={classes.typical}>{`${judgeCounting.name} ${
            judgeCounting.surename
          }`}</span>
          <span className={classes.typical}>{`${judgeRTS.name} ${
            judgeRTS.surename
          }`}</span>
          <span className={classes.typical}>{lzss}</span>
          <span className={classes.typical}>{tech}</span>
          <span>
            <img className={classes.logo} src={require(`../../${logo}`)} />
          </span>
          <IconButton
            style={{
              position: "absolute",
              right: "20px"
            }}
            className={classes.button}
            aria-label="Delete"
            onClick={() => this.openConfirmation(_id)}
            // onClick={() => this.setState({ open: true, id })}
            // disabled={wyslano ? true : false}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    color: theme.palette.text.primary,
    background: lighten(theme.palette.menu, 0.1),
    marginBottom: 6
    // borderColor: theme.palette.text.primary,
    // borderStyle: "solid",
    // borderWidth: 1
  },
  date: {
    // width: 50,
    minWidth: "10%",
    // maxWidth: 50,
    padding: 5,
    paddingLeft: 10,
    display: "inline-block"
  },
  name: {
    // width: 100,
    minWidth: "10%",
    // maxWidth: 100,
    padding: 5,
    display: "inline-block"
  },
  typical: {
    // width: 100,
    minWidth: "10%",
    // maxWidth: 100,
    padding: 5,
    display: "inline-block"
  },
  logo: { width: 50, height: 50, padding: 10 },
  button: {
    margin: theme.spacing.unit,
    width: 30,
    height: 30
  }
  // leftIcon: {
  //   marginRight: theme.spacing.unit
  // },
  // rightIcon: {
  //   marginLeft: theme.spacing.unit
  // },
  // iconSmall: {
  //   fontSize: 20
  // }
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
    { fetchTurnaments }
  )
);

export default enhance(TurnamentsRow);
