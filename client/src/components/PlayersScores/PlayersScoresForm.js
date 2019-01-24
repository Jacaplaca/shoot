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
    finished: false
  };

  componentDidMount() {
    this.setState({ value: this.props.score });
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

  save = (value, compId, playerId, turnament) => {
    const form = { value, compId, playerId, turnament };
    const score = value.replace(",", ".");
    form.value = score;

    const adding = {
      post: `/api/score/`,
      // values: null,
      form,
      get: `/api/players/turnament/${turnament}`,
      action: "add",
      collection: "score"
    };
    // console.log(adding);
    this.props.addToDB(adding);

    // console.log("save", value, compId, playerId, turnament);
  };

  // handleKeyPress = event => {
  //   const { id, player, turnament, button } = this.props;
  //   if (event.key == "Enter") {
  //     console.log("enter press here! ");
  //   } else if (event.key == 9) {
  //     !button && this.save(this.state.value, id, player, turnament);
  //   }
  // };

  // finished = () => {
  //
  // }

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
      auth: { user }
    } = this.props;

    // console.log("PlayersScoresForm", typeof this.state.value);

    return (
      <React.Fragment>
        <form
          // className={classes.container}
          style={{ display: "inline-block", textAlign: "center" }}
          noValidate
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            !button
              ? this.save(this.state.value, id, player, turnament)
              : enterAction();
          }}
        >
          <TextField
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
            value={this.state.value.replace(".", ",")}
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
              !button && this.save(this.state.value, id, player, turnament);
            }}
            // margin="normal"
            variant="outlined"
            className={classes.textField}
            // onKeyPress={this.handleKeyPress}
            InputProps={{
              inputComponent: NumberFormatCustom
            }}
            inputProps={{
              className: classes.input
            }}
          />
        </form>
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
