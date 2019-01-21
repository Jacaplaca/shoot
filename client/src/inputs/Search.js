import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ButtonMy from "../skins/ButtonMy";
import Clear from "@material-ui/icons/Clear";

class Search extends Component {
  state = {
    value: ""
  };

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  getSuggestions = (fetchowane, value, names) => {
    const regex = new RegExp(this.escapeRegexCharacters(value).toLowerCase());
    let filtered = [];

    for (let field of names) {
      const main = field.split("[")[0];
      const subs = field.split("[")[1] && field.split("[")[1].slice(0, -1);
      const subsArr = subs && subs.split(",");
      filtered.push(
        ...fetchowane.filter(suggestion => {
          if (!subs) {
            return regex.test(suggestion[field].toString().toLowerCase());
          } else {
            const subsValues = [];
            for (let sub of subsArr) {
              subsValues.push(`${suggestion[main][sub]} `);
            }
            return regex.test(subsValues.toString().toLowerCase());
          }
        })
      );
    }
    return filtered.reduce((x, y) => (x.includes(y) ? x : [...x, y]), []);
  };

  handleChange = e => {
    console.log("dodaje do stata", e.target.value);
    this.setState({ value: e.target.value });
  };

  handleKeyPress = e => {
    console.log("key", e.key);
    // console.log('handlekeypress', e.target.value);
    if (e.key == "Enter") {
      console.log("to jest enter");
      this.handleSearching();
    } else if (e.key == 27) {
      console.log("jest escape");
    }
  };

  handleSearching = () => {
    console.log("handleSearching", this.state.value, this.props.data);
    this.props.handleSearch(
      this.getSuggestions(this.props.data, this.state.value, this.props.columns)
    );
  };

  emptyValue = () => {
    this.setState({ value: "" }, () => {
      this.props.handleSearch(
        this.getSuggestions(
          this.props.data,
          this.state.value,
          this.props.columns
        )
      );
    });
  };

  escFunction = event => {
    if (event.keyCode === 27) {
      this.emptyValue();
    }
  };

  render() {
    return (
      <div style={{ display: "grid", marginTop: 8, marginBottom: 8 }}>
        <div
          style={{
            justifySelf: "end",
            // marginTop: 13,
            // marginBottom: 13,
            justifyItems: "center"
            // marginLeft: 5,
            // marginRight: 5
          }}
        >
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.emptyValue}
                  >
                    {this.state.value.length !== 0 && <Clear />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            autoComplete="off"
            // inputStyle={{ backgroundColor: "red" }}
            // InputProps={{ className: classes.input }}
            // inputProps={{ className: classes.inputNative }}
            // value={this.state.value}
            // InputLabelProps={{ shrink: true, className: classes.label }}
            id="outlined-name"
            placeholder="Szukaj..."
            // label={label.slice(0,12)}
            // className={classes.textField}
            value={this.state.value}
            // placeholder={score}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            // onBlur={() => {
            //   !button && this.save(this.state.value, id, player, turnament);
            // }}
            margin="small"
            variant="outlined"
            // className={classes.textField}
            // onKeyPress={this.handleKeyPress}
            inputProps={{ style: { padding: 9 } }}
          />
          <ButtonMy onClick={this.handleSearching} size="normal">
            OK
          </ButtonMy>
        </div>
      </div>
    );
  }
}
export default Search;
