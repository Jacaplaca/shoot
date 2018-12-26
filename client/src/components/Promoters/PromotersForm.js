import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import axios from "axios";
// import { loginUser } from "../actions/authentication";
import { registerUser } from "../../actions/authentication";
import store from "../../store";
import * as actions from "../../actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import InputComponent from "../../inputs/InputComponent";
import Thumb from "../Thumb";
import UploadFile from "../../inputs/UploadFile";
import FormButtons from "../../skins/FormButtons";
const axios = require("axios");

const component = "promoters";

class PromotersFormik extends Component {
  // componentDidMount() {

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
      toEdit,
      resetForm
    } = this.props;
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
            {!editedObject ? (
              <React.Fragment>
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
                      touched.password && errors.password
                        ? errors.password
                        : " "
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
                      touched.password2 && errors.password2
                        ? errors.password2
                        : " "
                    }
                    onBlur={handleBlur}
                  />
                </Grid>
              </React.Fragment>
            ) : null}

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

          <FormButtons
            subDisable={!isValid}
            subLabel={toEdit ? "Edytuj organizatora" : "Dodaj organizatora"}
            cancelLabel={"Anuluj"}
            cancelAction={() => {
              store.dispatch(actions.editFetch());
              resetForm();
            }}
          />
        </form>
      </Paper>
    );
  }
}

const validationSchemaStandard = {
  name: Yup.string().required("Podaj nazwę organizatora"),
  email: Yup.string()
    .email("Podaj prawidłowy e-mail")
    .required("Podaj e-mail organizatora")
    .test("a@a.com", "Podany e-mail jest już zarejestrowany", function(value) {
      return axios
        .post("/api/email/", {
          email: editedObject
            ? value === editedObject.email
              ? ""
              : value
            : value
        })
        .then(response => {
          // console.log(response);
          console.log(value);
          return response.data.free === true;
        });
    })
};

const validationSchemaPass = {
  password: Yup.string()
    .min(0, "Hasło musi mieć conajmniej 6 znaków")
    .required("Podaj hasło"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Wpisane hasła muszą być indentyczne")
    .required("Password confirm is required")
};

let editedObject;
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
    editedObject = toEdit;
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
    let id;
    if (editedObject) {
      id = editedObject._id;
    }
    store.dispatch(actions.addToDB(component, values, form, id));
    resetForm();
  },
  validationSchema: Yup.object().shape(
    !editedObject
      ? validationSchemaStandard
      : { ...validationSchemaStandard, ...validationSchemaPass }
  )
})(PromotersFormik);

// const validationSchemaEdit = { ... };

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
