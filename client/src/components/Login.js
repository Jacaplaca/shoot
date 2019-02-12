import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";
import store from "../store";
import { getString } from "../strings";
import Key from "@material-ui/icons/VpnKey";
import Paper from "@material-ui/core/Paper";
import * as Yup from "yup";

import InputComponent from "../inputs/InputComponent";
import ButtonMy from "../skins/ButtonMy";

class LoginFormik extends Component {
  componentDidMount() {
    if (this.props.auth.user.rola === "admin") {
      this.props.history.push("/organizatorzy");
    } else if (this.props.auth.user.rola === "promoter") {
      this.props.history.push("/zawody");
    }

    document.title = `Portal Strzelecki | Logowanie`;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user.rola === "admin") {
      nextProps.history.push("/organizatorzy");
    } else if (nextProps.auth.user.rola === "promoter") {
      nextProps.history.push("/zawody");
    }
  }

  render() {
    let { errors } = this.props;
    const {
      values: { email, password, test },
      // errors,
      touched,
      handleSubmit,
      handleChange,
      isValid,
      setFieldTouched,
      handleBlur,
      language,
      errorsRedux
    } = this.props;
    // errors = Object.assign(errors, errorsRedux);
    // console.log("err formi", errors);
    // console.log("err redux", errorsRedux);
    // console.log("emial i pas", email, password);
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
                label={getString("LOGIN_EMAIL", language)}
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
                label={getString("LOGIN_PASS", language)}
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
                {getString("LOGIN_BUTTON", language)}
                <Key style={{ marginLeft: 10 }} />
              </ButtonMy>
            </form>
            {!email && !password && (
              <div style={{ color: "white", marginTop: 10, fontSize: 13 }}>
                <div>
                  {errorsRedux.email
                    ? getString("LOGIN_WRONG_EMAIL", language)
                    : ""}
                </div>
                <div>
                  {errorsRedux.password
                    ? getString("LOGIN_WRONG_PASS", language)
                    : ""}
                </div>
              </div>
            )}
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
  mapPropsToValue({ email, password, errorsRedux }) {
    console.log("mapspropstovalue", errorsRedux);
    return {
      email: email || "",
      password: password || "",
      test: test || "",
      errorsRedux
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
  errorsRedux: state.errors,
  language: state.language
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
