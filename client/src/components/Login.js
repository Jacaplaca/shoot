import React, { Component } from "react";
import { withFormik, Formik } from "formik";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";
import store from "../store";
import Button from "@material-ui/core/Button";
import Key from "@material-ui/icons/VpnKey";
// import { loginUser } from "../actions/authentication";
// import { LoginFormik } from "./LoginFormik";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";

import InputComponent from "../inputs/InputComponent";

class LoginFormik extends Component {
  componentDidMount() {
    console.log("componentDidMount login");
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const {
      values: { email, password, test },
      errors,
      touched,
      handleSubmit,
      handleChange,
      isValid,
      setFieldTouched,
      handleBlur
    } = this.props;
    // console.log("touched", touched);
    // console.log("errors", errors);
    // console.log("isValid", isValid);
    return (
      <div
        style={
          {
            // height: "50%",
            // width: "100%",
            // background: "#666",
            // clear: "both"
            // textAlign: "center",
            // //padding: 20
            // height: "100%",
            // position: "relative"
            // overflow: "auto"
          }
        }
      >
        <div>sdfasdf</div>
        <Paper
          style={{
            textAlign: "center",
            width: 500,
            padding: 30,
            margin: 0,
            position: "absolute",
            top: "40%",
            left: "50%",
            // -ms-transform: "translate(-50%, -50%)";
            transform: "translate(-40%, -50%)"
          }}
        >
          <form onSubmit={handleSubmit}>
            <InputComponent
              name="email"
              label="Email"
              type="email"
              // edytuj={change.bind(null, "email")}
              edytuj={handleChange}
              value={email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email ? errors.email : ""}
              onBlur={handleBlur}
            />
            <InputComponent
              name="password"
              label="Password"
              type="password"
              edytuj={handleChange}
              // edytuj={change.bind(null, "password")}
              value={password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password ? errors.password : ""}
              onBlur={handleBlur}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid}
            >
              Zaloguj się
              <Key style={{ marginLeft: 10 }} />
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const Login = withFormik({
  mapPropsToValue({ email, password }) {
    return {
      email: email || "",
      password: password || "",
      test: test || ""
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    // e.preventDefault();
    // console.log("values", values);
    const user = {
      email: values.email,
      password: values.password
    };
    // loginUser(user);
    store.dispatch(loginUser(user));
    // this.props.history.push("/");
    resetForm();
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Podaj prawidłowy email")
      .required("Podaj email"),
    password: Yup.string()
      .min(6, "Hasło musi mieć conajmniej 6 znaków")
      .required("Podaj hasło")
  })
})(LoginFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));

// export default Login;
