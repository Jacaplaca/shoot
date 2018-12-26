import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import axios from "axios";
// import { loginUser } from "../actions/authentication";
import { registerUser } from "../../actions/authentication";
import store from "../../store";
import * as actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import Key from "@material-ui/icons/VpnKey";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as Yup from "yup";

import InputComponent from "../../inputs/InputComponent";
import ButtonMy from "../../skins/ButtonMy";
import Thumb from "../Thumb";
import UploadFile from "../../inputs/UploadFile";
const axios = require("axios");

const endpoint = "/api/upload";
const component = "promoters";

// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit
//   },
//   leftIcon: {
//     marginRight: theme.spacing.unit
//   },
//   rightIcon: {
//     marginLeft: theme.spacing.unit
//   },
//   iconSmall: {
//     fontSize: 20
//   }
// });

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
      setFieldValue,
      toEdit
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

            <Grid item xs={12} sm={6} md={4}>
              <UploadFile
                title="Załącz logo organizatora"
                onChange={event => {
                  setFieldValue("logo", event.currentTarget.files[0]);
                }}
              />
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
  enableReinitialize: true,
  // mapPropsToValues: () => ({ email: "foo@bar.de" }),
  mapPropsToValues({
    name,
    adres,
    password,
    www,
    logo,
    email,
    password2,
    toEdit
  }) {
    return {
      name: toEdit ? toEdit.name : name || "",
      logo: toEdit ? toEdit.logo : logo || "",
      www: toEdit ? toEdit.www : www || "",
      password: password || "",
      password2: password2 || "",
      adres: toEdit ? toEdit.adres : adres || "",
      email: toEdit ? toEdit.email : email || ""
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const form = {
      name: values.name,
      adres: values.adres,
      password: values.password,
      // password2: values.password2,
      logo: "",
      www: values.www,
      email: values.email,
      rola: "promoter"
    };
    store.dispatch(actions.addToDB(component, values, form));
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
  errors: state.errors,
  toEdit: state.edit
});

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(withRouter(PromotersForm));

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(PromotersForm));
