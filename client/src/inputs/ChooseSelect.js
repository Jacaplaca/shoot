import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonMy from "../skins/ButtonMy";

class ChooseSelect extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    // this.handleClose();
  };

  handleChange = competitionId => {
    // console.log("handleClick", event);
    this.handleClose();
    this.props.action(competitionId);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { options } = this.props;

    return (
      <div>
        <ButtonMy
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          // onClick={this.addProtocol}
          style={{ fontSize: 11.3 }}
        >
          Dodaj konkurencję
        </ButtonMy>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map(option => (
            <MenuItem
              key={option._id}
              onClick={() => this.handleChange(option._id)}
            >
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default ChooseSelect;

// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import Button from "@material-ui/core/Button";
//
// const styles = theme => ({
//   button: {
//     display: "block",
//     marginTop: theme.spacing.unit * 2
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//     minWidth: 200
//   }
// });
//
// class ControlledOpenSelect extends React.Component {
//   state = {
//     age: "",
//     open: false
//   };
//
//   // componentDidMount() {
//   //   this.handleChange({
//   //     target: { name: "age", value: this.props.options[this.props.order]._id }
//   //   });
//   // }
//   //
//   // componentWillReceiveProps(nextProps) {
//   //   console.log("ChooseSelect", nextProps);
//   //   if (nextProps !== this.props) {
//   //     this.handleChange({
//   //       target: { name: "age", value: nextProps.options[nextProps.order]._id }
//   //     });
//   //   }
//   // }
//
//   handleChange = event => {
//     // this.setState({ [event.target.name]: event.target.value });
//     this.props.change(event.target.value);
//   };
//
//   handleClose = () => {
//     this.setState({ open: false });
//   };
//
//   handleOpen = () => {
//     this.setState({ open: true });
//   };
//
//   render() {
//     const { classes, label, options, order, value } = this.props;
//
//     return (
//       <form autoComplete="off">
//         <FormControl className={classes.formControl}>
//           <InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
//           <Select
//             open={this.state.open}
//             onClose={this.handleClose}
//             onOpen={this.handleOpen}
//             // value={this.state.age}
//             value={value}
//             onChange={this.handleChange}
//             inputProps={{
//               name: "age",
//               id: "demo-controlled-open-select"
//             }}
//           >
//             {options.map(protocol => (
//               <MenuItem value={protocol._id}>{protocol.name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </form>
//     );
//   }
// }
//
// ControlledOpenSelect.propTypes = {
//   classes: PropTypes.object.isRequired
// };
//
// export default withStyles(styles)(ControlledOpenSelect);
