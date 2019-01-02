import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ButtonMy from "../../skins/ButtonMy";
import * as actions from "../../actions";

class PlayersScoresForm extends React.Component {
  state = {
    value: ""
  };

  componentDidMount() {
    this.setState({ value: this.props.score });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    this.props.button && this.props.sendValue(event.target.value);
  };

  save = (value, compId, playerId, turnament) => {
    const form = { value, compId, playerId, turnament };

    const adding = {
      post: `/api/score/`,
      // values: null,
      form,
      get: `/api/players/turnament/${turnament}`,
      action: "add",
      collection: "score"
    };
    console.log(adding);
    this.props.addToDB(adding);

    console.log("save", value, compId, playerId, turnament);
  };

  // handleKeyPress = event => {
  //   const { id, player, turnament, button } = this.props;
  //   if (event.key == "Enter") {
  //     console.log("enter press here! ");
  //   } else if (event.key == 9) {
  //     !button && this.save(this.state.value, id, player, turnament);
  //   }
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
      enterAction
    } = this.props;

    return (
      <React.Fragment>
        <form
          // className={classes.container}
          style={{ display: "inline-block" }}
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
            InputProps={{ className: classes.input }}
            inputProps={{ className: classes.inputNative }}
            style={{
              marginTop: 10,
              marginBottom: 3,
              marginLeft: 5,
              marginRight: 5
            }}
            value={this.state.value}
            InputLabelProps={{ shrink: true, className: classes.label }}
            id="outlined-name"
            label={label}
            // className={classes.textField}
            // value={this.state.value}
            // placeholder={score}
            onChange={this.handleChange("value")}
            onBlur={() => {
              !button && this.save(this.state.value, id, player, turnament);
            }}
            // margin="normal"
            variant="outlined"
            className={classes.textField}
            // onKeyPress={this.handleKeyPress}
          />
        </form>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  textField: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  },
  label: {
    color: "gray"
  },
  input: {
    // color: "red"
    // background: "red",
    // padding: 0
  },
  inputNative: {
    // background: "white",
    padding: 10
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
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
