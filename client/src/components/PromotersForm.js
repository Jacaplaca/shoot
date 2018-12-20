import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import axios from "axios";
// import { loginUser } from "../actions/authentication";
import { registerUser } from "../actions/authentication";
import store from "../store";
import { withStyles } from "@material-ui/core/styles";
import Key from "@material-ui/icons/VpnKey";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as Yup from "yup";

import InputComponent from "../inputs/InputComponent";
import ButtonMy from "../skins/ButtonMy";
const axios = require("axios");

const endpoint = "/api/upload";

class Thumb extends Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }
    if (nextProps.file !== this.props.file) {
      this.setState({ loading: true }, () => {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };

        reader.readAsDataURL(nextProps.file);
      });
    }
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <img
        src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class PromotersFormik extends Component {
  // componentDidMount() {
  //   this.props.setFieldValue("email", "ccc@ccc.com");
  // }

  render() {
    const {
      values: { name, adres, password, logo, www, email, password2 },
      errors,
      touched,
      handleSubmit,
      handleChange,
      isValid,
      setFieldTouched,
      handleBlur,
      classes,
      setFieldValue
    } = this.props;
    // setFieldValue("email", "ccc@ccc.com");
    return (
      <Paper
        style={{
          padding: 30
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="name"
                label="Nazwa"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name ? errors.name : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="adres"
                label="Adres"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={adres}
                error={touched.adres && Boolean(errors.adres)}
                helperText={touched.adres && errors.adres ? errors.adres : " "}
                onBlur={handleBlur}
              />
            </Grid>

            {/* <InputComponent
                name="logo"
                label="Logo"
                type="file"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={logo}
                error={touched.logo && Boolean(errors.logo)}
                helperText={touched.logo && errors.logo ? errors.logo : " "}
                onBlur={handleBlur}
              /> */}
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="www"
                label="Strona internetowa"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={www}
                error={touched.www && Boolean(errors.www)}
                helperText={touched.www && errors.www ? errors.www : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="email"
                label="E-mail"
                type="string"
                edytuj={handleChange}
                // edytuj={change.bind(null, "password")}
                value={email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email ? errors.email : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="password2"
                label="Potwierdź hasło"
                type="password"
                edytuj={handleChange}
                // edytuj={change.bind(null, "password")}
                value={password2}
                error={touched.password2 && Boolean(errors.password2)}
                helperText={
                  touched.password2 && errors.password2 ? errors.password2 : " "
                }
                onBlur={handleBlur}
              />
            </Grid>
            {/* <div className="form-group">
              <label htmlFor="file">File upload</label>
              <input
                id="file"
                name="logo"
                type="file"
                onChange={event => {
                  setFieldValue("logo", event.currentTarget.files[0]);
                }}
                className="form-control"
              />
              <Thumb file={logo} />
            </div> */}
            <Grid item xs={12} sm={6} md={4}>
              <input
                accept="image/*"
                // className={classes.input}
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={event => {
                  setFieldValue("logo", event.currentTarget.files[0]);
                }}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  color="default"
                  component="span"
                  className={classes.button}
                >
                  Załącz logo organizatora
                  <CloudUploadIcon className={classes.rightIcon} />
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Thumb file={logo} />
            </Grid>
          </Grid>

          <ButtonMy
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
          >
            Dodaj organizatora
            <Key style={{ marginLeft: 10 }} />
          </ButtonMy>
        </form>
      </Paper>
    );
  }
}

const PromotersForm = withFormik({
  // mapPropsToValues: () => ({ email: "foo@bar.de" }),
  mapPropsToValues({ name, adres, password, www, logo, email, password2 }) {
    return {
      name: name || "namepromoter",
      logo: logo || "",
      www: www || "www",
      password: password || "aaaaaa",
      password2: password2 || "aaaaaa",
      adres: adres || "adres",
      email: email || "ccc@ccc.co"
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const promoter = {
      name: values.name,
      adres: values.adres,
      password: values.password,
      // password2: values.password2,
      logo: "",
      www: values.www,
      email: values.email,
      rola: "promoter"
    };
    if (values.logo) {
      const data = new FormData();
      data.append("file", values.logo, values.logo.name);
      axios
        .post(endpoint, data, {
          onUploadProgress: ProgressEvent => {
            console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
          }
        })
        .then(res => {
          // console.log(res.data.file);
          Object.assign(promoter, { logo: res.data.file });
          // console.log(promoter);
          store.dispatch(registerUser(promoter));
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      store.dispatch(registerUser(promoter));
    }
    resetForm();
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj nazwę organizatora"),
    email: Yup.string()
      .email("Podaj prawidłowy e-mail")
      .required("Podaj e-mail organizatora")
      .test("a@a.com", "Podany e-mail jest już zarejestrowany", function(
        value
      ) {
        // console.log(value);
        return axios.post("/api/email/", { email: value }).then(response => {
          // console.log(response);
          return response.data.free === true;
        });
        // return fetch("/api/email" + value).then(
        //   response => response.responseText === "true"
        // );
      }),
    password: Yup.string()
      .min(0, "Hasło musi mieć conajmniej 6 znaków")
      .required("Podaj hasło"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Wpisane hasła muszą być indentyczne")
      .required("Password confirm is required")
  })
})(PromotersFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(withRouter(PromotersForm));

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(PromotersForm))
);
