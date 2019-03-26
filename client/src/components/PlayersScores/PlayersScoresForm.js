import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import NumberFormat from "react-number-format";

import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ButtonMy from "../../skins/ButtonMy";
import * as actions from "../../actions";

class PlayersScoresForm extends React.Component {
  state = {
    value: "",
    finished: false,
    center: ""
    // focus: false
  };

  componentDidMount() {
    this.setState({ value: this.props.score, center: this.props.center });
    // console.log("PlayersScoresForm", this.props.score);
    const thisTurnament = this.props.turnaments.filter(
      turnam => turnam._id === this.props.turnament
    );
    // console.log("players scores form", thisTurnament);
    const finished =
      thisTurnament && thisTurnament[0] && thisTurnament[0].finished;
    // console.log("players scores form", finished);
    this.setState({ finished });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    this.props.button && this.props.sendValue(event.target.value);
  };

  save = (field, value, compId, playerId, turnament) => {
    let form;

    if (field === "score") {
      form = {
        score: value,
        center: this.state.center,
        compId,
        playerId,
        turnament
      };
      // const score = value.replace(",", ".");
    } else if (field === "center") {
      form = {
        score: this.state.value,
        center: value,
        compId,
        playerId,
        turnament
      };
    }

    // form.value = score;

    const adding = {
      post: `/api/score/`,
      // values: null,
      form,
      get: `/api/players/turnament/${turnament}`,
      action: "add",
      collection: "score"
    };
    // console.log(adding);
    if (field === "score") {
      this.props.score !== value && this.props.addToDB(adding);
    } else if (field === "center") {
      this.props.center !== value && this.props.addToDB(adding);
    }

    // console.log("save", value, compId, playerId, turnament);
  };

  // focusUsernameInputField = input => {
  //   const { horizontal, vertical, position } = this.props;
  //   // console.log("horizontal", horizontal, vertical, position);
  //   if (horizontal === position.x && vertical === position.y) {
  //     console.log("focus");
  //     input.focus();
  //   }
  //   // input && input.focus();
  //   // // console.log(horizontal, vertical);
  //   // if (this.state.focus) {
  //   //   console.log("value,", this.state.value);
  //   //   input.focus();
  //   // }
  //   // // console.log(input);
  // };

  // handleKeyPress = event => {
  //   const { horizontal, vertical, nextPos } = this.props;
  //   const key = event.key;
  //   console.log("key", event.key);
  //   if (key === "ArrowLeft") {
  //     console.log("jakie przycisk", key);
  //     const newHor = horizontal - 1;
  //     const newVert = vertical;
  //     nextPos(newHor, vertical);
  //     // if (horizontal === newHor && vertical === newVert) {
  //     //   this.setState({ focus: true });
  //     // }
  //   }
  //   // console.log(focusUsernameInputField);
  //   // const { id, player, turnament, button } = this.props;
  //   // if (event.key == "Enter") {
  //   //   console.log("enter press here! ");
  //   // } else if (event.key == 9) {
  //   //   !button && this.save(this.state.value, id, player, turnament);
  //   // }
  // };

  // finished = () => {
  //
  // }

  // afocus = () => {
  //   const { horizontal, vertical, position } = this.props;
  //   console.log("dd", horizontal, vertical, position);
  //   // if (horizontal === position.x && vertical === position.y) {
  //   //   console.log("focus");
  //   //   // input.focus();
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  //   return "on";
  // };

  render() {
    const {
      classes,
      id,
      label,
      score,
      player,
      turnament,
      button,
      enterAction,
      // finished,
      turnaments,
      enable,
      auth: { user, isAuthenticated },
      isFactor
    } = this.props;

    // console.log("PlayersScoresForm", typeof this.state.value);

    return (
      <React.Fragment>
        <div style={{ display: "flex", textAlign: "center" }}>
          <form
            // className={classes.container}
            style={{
              // display: "inline-block",
              // textAlign: "center",
              // minWidth: 100,
              width: !isFactor ? "70%" : "100%"
            }}
            noValidate
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
              !button
                ? this.save("score", this.state.value, id, player, turnament)
                : enterAction();
            }}
          >
            <TextField
              // autoFocus={() => false}
              // inputRef={this.focusUsernameInputField}
              // inputStyle={{ backgroundColor: "red" }}
              // type="number"
              disabled={
                user.rola === "admin" || this.state.finished || enable
                  ? true
                  : false
              }
              // InputProps={{ className: classes.input }}
              style={{
                marginTop: 3,
                marginBottom: 3,
                marginLeft: 5,
                marginRight: 5
              }}
              // value={this.state.value}
              value={
                this.state.value === "0"
                  ? ""
                  : this.state.value.replace(".", ",")
              }
              InputLabelProps={{ shrink: true, className: classes.label }}
              id="outlined-name"
              // label={label.slice(0, 12)}
              // className={classes.textField}
              // value={this.state.value}
              // placeholder={score}
              onClick={() => {
                // console.log("click", this.state.value, id, player, turnament);
                return this.props.rowClicked(player, id);
              }}
              onChange={this.handleChange("value")}
              onBlur={() => {
                !button &&
                  this.save("score", this.state.value, id, player, turnament);
              }}
              // margin="normal"
              variant="outlined"
              className={classes.textField}
              // onKeyDown={this.handleKeyPress}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              inputProps={{
                className: classes.input
              }}
            />
          </form>
          {!isFactor && (
            <form
              // className={classes.container}
              style={{
                // display: "inline-block",
                // textAlign: "center",
                // maxWidth: 150
                minWidth: 50,
                width: "30%"
              }}
              noValidate
              autoComplete="off"
              onSubmit={e => {
                e.preventDefault();
                !button
                  ? this.save(
                      "center",
                      this.state.center,
                      id,
                      player,
                      turnament
                    )
                  : enterAction();
              }}
            >
              <TextField
                // disabled={true}
                disabled={
                  user.rola === "admin" || this.state.finished || enable
                    ? true
                    : false
                }
                style={{
                  marginTop: 3,
                  marginBottom: 3,
                  marginLeft: 5,
                  marginRight: 5
                }}
                value={
                  this.state.center === "0"
                    ? ""
                    : this.state.center.replace(".", ",")
                }
                InputLabelProps={{ shrink: true, className: classes.label }}
                id="outlined-name"
                onClick={() => {
                  return this.props.rowClicked(player, id);
                }}
                onChange={this.handleChange("center")}
                onBlur={() => {
                  !button &&
                    this.save(
                      "center",
                      this.state.center,
                      id,
                      player,
                      turnament
                    );
                }}
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  inputComponent: NumberFormatCustom
                }}
                inputProps={{
                  className: classes.input
                }}
              />
            </form>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  textField: {
    // width: "90%",
    // marginLeft: "auto",
    // marginRight: "auto",
    // paddingBottom: 0,
    // marginTop: 0,
    // fontWeight: 500
    // padding: 2
  },
  label: {
    color: "gray"
  },
  input: {
    // color: "red",
    // paddingTop: 3
    // background: "red",
    // padding: "0!important"
    paddingTop: 9,
    paddingBottom: 6,
    paddingLeft: 6,
    paddingRight: 4,
    textAlign: "center"
    // margin: 10
  },
  inputNative: {
    background: "white"
  }
});

function NumberFormatCustom(props) {
  // console.log("NumberFormatCustom", props);
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            // value: values.value
            value: values.formattedValue.replace(/ /g, "")
          }
        });
      }}
      decimalSeparator=","
      thousandSeparator=" "
      decimalScale={2}
      // thousandSeparator
      // prefix="$"
    />
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  turnaments: state.turnaments
});

// export default withStyles(styles, { withTheme: true })(PlayersScoresForm);

const enhance = compose(
  // withRouter,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
  // RowHOC
);

export default enhance(PlayersScoresForm);
