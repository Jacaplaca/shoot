import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class InputSimpleSelect extends React.Component {
  state = {
    age: "",
    [this.props.name]: "",
    open: false,
    options: [{ _id: "all", name: "Wszystkie" }]
  };

  componentDidMount() {
    const opAll = this.props.options;
    // console.log("opAll", opAll);
    opAll.unshift({ _id: "all", name: "Wszystkie" });
    // console.log("options", options);
    this.setState({ options: opAll });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.action(event);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, name, label } = this.props;
    const { options } = this.state;

    return (
      <form autoComplete="off">
        {/* <Button className={classes.button} onClick={this.handleOpen}>
          Open the select
        </Button> */}
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state[name]}
            onChange={this.handleChange}
            inputProps={{
              name,
              id: "demo-controlled-open-select"
            }}
          >
            {options.length > 0 &&
              options.map(option => (
                <MenuItem
                  value={option._id}
                  key={option._id}
                  onClick={e => this.handleChange(e)}
                >
                  {option.name}
                </MenuItem>
              ))}

            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </form>
    );
  }
}

InputSimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputSimpleSelect);
