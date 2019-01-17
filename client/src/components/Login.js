import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";
import store from "../store";
import Key from "@material-ui/icons/VpnKey";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";

import InputComponent from "../inputs/InputComponent";
import ButtonMy from "../skins/ButtonMy";

class LoginFormik extends Component {
  componentDidMount() {
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
    return (
      <div
        style={{
          display: "grid",
          gridTemplateAreas:
            '"not not not" "sideleft login sideright" "foot foot foot"',
          gridTemplateRows: "1fr 300px 1fr",
          gridTemplateColumns: "1fr 500px 1fr",
          height: "100vh"
        }}
      >
        <span style={{ gridArea: "not", ...styles }} />
        <span style={{ gridArea: "sideleft", ...styles }} />
        <span style={{ gridArea: "sideright", ...styles }} />
        <span style={{ gridArea: "foot", ...styles }} />

        <span
          style={{
            gridArea: "login",
            textAlign: "center",
            padding: 10,
            ...styles
          }}
        >
          <Paper style={{ padding: 20 }}>
            <form onSubmit={handleSubmit}>
              <InputComponent
                name="email"
                label="Adres e-mail"
                type="email"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email ? errors.email : " "}
                onBlur={handleBlur}
                autoComplete="on"
              />
              <InputComponent
                name="password"
                label="Hasło"
                type="password"
                edytuj={handleChange}
                // edytuj={change.bind(null, "password")}
                value={password}
                error={touched.password && Boolean(errors.password)}
                helperText={
                  touched.password && errors.password ? errors.password : " "
                }
                onBlur={handleBlur}
                autoComplete="on"
              />
              <ButtonMy
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                Zaloguj się
                <Key style={{ marginLeft: 10 }} />
              </ButtonMy>
            </form>
          </Paper>
        </span>
      </div>
    );
  }
}

const styles = {
  background: "white"
};

const Login = withFormik({
  mapPropsToValue({ email, password }) {
    return {
      email: email || "",
      password: password || "",
      test: test || ""
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const user = {
      email: values.email,
      password: values.password
    };
    store.dispatch(loginUser(user));
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
