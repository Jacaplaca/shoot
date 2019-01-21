import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import NumberFormat from "react-number-format";
import ClearButton from "./ClearButton";
import { textFieldStyles } from "../skins/mainStyles";
import { combineStyles } from "../functions/functions";

function NumberFormatCustom(props) {
  const { inputRef, onChange, name, ...other } = props;

  return (
    <NumberFormat
      {...other}
      name={name}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.formattedValue.replace(/ /g, ""),
            name: name
          }
        });
      }}
      decimalSeparator=","
      thousandSeparator=" "
      decimalScale={2}
      suffix="  zł"
    />
  );
}
class InputSelectTextField extends Component {
  state = {
    // visible: true
    visible: this.props.type === "password" ? false : true
  };

  changeVisibility = () => {
    console.log("changeVisibility()");
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const {
      value,
      isloading,
      name,
      onChange,
      password,
      passwordVisibility,
      type,
      clear,
      classes
    } = this.props;
    const endAdornment = () => {
      if (value.length > 0 && type !== "password") {
        return (
          <InputAdornment position="end">
            <ClearButton
              value={value}
              isloading={isloading}
              name={name}
              // onChange={onChange}
              clear={clear}
            />
          </InputAdornment>
        );
      } else if (value.length > 0 && type === "password") {
        return (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={this.changeVisibility}
            >
              {this.state.visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            {/* <ClearButton
              value={value}
              isloading={isloading}
              name={name}
              onChange={onChange}
            /> */}
          </InputAdornment>
          // <PasswordVisibility />
          // <InputAdornment position="end">
          //   <IconButton
          //     aria-label="Toggle password visibility"
          //     onClick={passwordVisibility}
          //   >
          //     {password ? <VisibilityOff /> : <Visibility />}
          //   </IconButton>
          //   {/* <ClearButton
          //     value={value}
          //     isloading={isloading}
          //     name={name}
          //     onChange={onChange}
          //   /> */}
          // </InputAdornment>
        );
      } else {
        return <div />;
      }
    };

    const thisCompInputProps = {
      inputComponent: kwota && NumberFormatCustom,
      endAdornment: endAdornment()
    };

    const {
      // //value
      // // disabled,
      // clearvalue,
      // kwota,
      // //error,
      // classes,
      inputRef = () => {},
      ref,
      kwota,
      autoComplete,
      // type,
      // classes,
      // isloading,
      ...other
    } = this.props;

    return (
      <TextField
        InputProps={{
          inputRef: node => {
            ref && ref(node);
            inputRef(node);
          },
          ...thisCompInputProps,
          // style: { color: "red" }
          className: classes.input
        }}
        {...other}
        type={
          this.state.visible && this.props.type === "password"
            ? "string"
            : this.props.type
        }
        name={name}
        autoComplete={autoComplete}
        // margin="none"
        // style={{ margin: 0, padding: 0, backgroundColor: "red" }}
        // inputProps={{ style: { fontSize: 50 } }}
        InputLabelProps={{
          className: classes.label,
          shrink: type === "date" || value !== "" ? true : false
        }}
        // className={classes.input}
      />
    );
  }
}

InputSelectTextField.defaultProps = {
  autoComplete: "off"
};
// const InputSelectTextFieldOld = props => {
//   const {
//     // //value
//     // // disabled,
//     // clearvalue,
//     // kwota,
//     // //error,
//     // classes,
//     inputRef = () => {},
//     ref,
//     kwota,
//     isloading,
//     name,
//     // isloading,
//     ...other
//   } = props;
//
//   const endAdornment = () => {
//     const {
//       value,
//       isloading,
//       name,
//       onChange,
//       password,
//       passwordVisibility
//     } = props;
//     if (value.length > 0 && name !== "password") {
//       return (
//         <InputAdornment position="end">
//           <ClearButton
//             value={value}
//             isloading={isloading}
//             name={name}
//             onChange={onChange}
//           />
//         </InputAdornment>
//       );
//     } else if (value.length > 0 && name === "password") {
//       return (
//         <PasswordVisibility />
//         // <InputAdornment position="end">
//         //   <IconButton
//         //     aria-label="Toggle password visibility"
//         //     onClick={passwordVisibility}
//         //   >
//         //     {password ? <VisibilityOff /> : <Visibility />}
//         //   </IconButton>
//         //   {/* <ClearButton
//         //     value={value}
//         //     isloading={isloading}
//         //     name={name}
//         //     onChange={onChange}
//         //   /> */}
//         // </InputAdornment>
//       );
//     } else {
//       return <div />;
//     }
//   };
//
//   const thisCompInputProps = {
//     inputComponent: kwota && NumberFormatCustom,
//     endAdornment: endAdornment()
//   };
//
//   return (
//     <TextField
//       InputProps={{
//         inputRef: node => {
//           ref && ref(node);
//           inputRef(node);
//         },
//         ...thisCompInputProps
//       }}
//       {...other}
//       type="string"
//       name={name}
//     />
//   );
// };

const combinedStyles = combineStyles(textFieldStyles);

const enhance = compose(
  // withRouter,
  withStyles(combinedStyles, { withTheme: true })
  // connect(
  //   mapStateToProps,
  //   actions
  // ),
  // RowHOC
);

export default enhance(InputSelectTextField);

// export default InputSelectTextField;
