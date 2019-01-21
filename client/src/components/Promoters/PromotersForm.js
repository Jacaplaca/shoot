import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { combineStyles } from "../../functions/functions";
import { formStyles } from "../../skins/mainStyles";
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
      resetForm,
      validationSchema,
      collection
    } = this.props;
    // console.log("editedObject", !!editedObject);
    // console.log("validationSchema", validationSchema);
    return (
      <Paper
        // style={formStyles.paper}
        className={classes.paper}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="name"
                label="Nazwa"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                clear={() => setFieldValue("name", "")}
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
                clear={() => setFieldValue("adres", "")}
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
                clear={() => setFieldValue("www", "")}
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
                clear={() => setFieldValue("email", "")}
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
            {!toEdit ? (
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
            subLabel={
              toEdit !== null ? "Edytuj organizatora" : "Dodaj organizatora"
            }
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

const validationSchemaStandard = props => {
  return {
    name: Yup.string().required("Podaj nazwę organizatora"),
    email: Yup.string()
      .email("Podaj prawidłowy e-mail")
      .required("Podaj e-mail organizatora")
      .test("a@a.com", "Podany e-mail jest już zarejestrowany", function(
        value
      ) {
        return axios
          .post("/api/email/", {
            email: props.toEdit
              ? value === props.toEdit.email
                ? ""
                : value
              : value
          })
          .then(response => {
            // console.log(response);
            // console.log(value);
            return response.data.free === true;
          });
      })
  };
};

const validationSchemaPass = {
  password: Yup.string()
    .min(6, "Hasło musi mieć conajmniej 6 znaków")
    .required("Podaj hasło"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Wpisane hasła muszą być indentyczne")
    .required("Password confirm is required")
};

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
    toEdit,
    collection
  }) {
    return {
      name: toEdit ? toEdit.name : name || "",
      logo: toEdit ? toEdit.logo : logo || "",
      www: toEdit ? toEdit.www : www || "",
      password: password || "",
      password2: password2 || "",
      adres: toEdit ? toEdit.adres : adres || "",
      email: toEdit ? toEdit.email : email || "",
      collection,
      toEdit
    };
  },
  // handleChange(e) {
  //   console.log("handle", e);
  // },
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
    const { collection, toEdit } = values;

    const adding = {
      post: `/api/${collection}/`,
      values,
      form,
      // get: `/api/${collection}/`,
      action: "add",
      collection: collection
    };

    const updating = {
      post: `/api/${collection}/update/${toEdit && toEdit._id}`,
      values,
      form,
      // get: `/api/${collection}/`,
      action: "update",
      collection: collection
    };
    store.dispatch(actions.addToDB(toEdit ? updating : adding));
    resetForm();
  },
  validationSchema: props =>
    Yup.object().shape(
      !props.toEdit
        ? { ...validationSchemaStandard(props), ...validationSchemaPass }
        : validationSchemaStandard(props)
    )
})(PromotersFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  toEdit: state.edit
});

const combinedStyles = combineStyles(formStyles);

const enhance = compose(
  withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
);

export default enhance(PromotersForm);

// export default connect(
//   mapStateToProps,
//   // { registerUser }
//   actions
// )(withRouter(PromotersForm));
