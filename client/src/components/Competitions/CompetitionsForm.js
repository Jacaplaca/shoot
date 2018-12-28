import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import axios from "axios";
// import { loginUser } from "../actions/authentication";
import { registerUser } from "../../actions/authentication";
import store from "../../store";
import { withStyles } from "@material-ui/core/styles";
import Key from "@material-ui/icons/VpnKey";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as Yup from "yup";
import * as actions from "../../actions";
import InputComponent from "../../inputs/InputComponent";
import { nameSurnameSuggestion } from "../../inputs/Suggestions";
import ButtonMy from "../../skins/ButtonMy";
import Thumb from "../Thumb";
import UploadFile from "../../inputs/UploadFile";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import DatePickerMy from "../../inputs/DatePickerMy";
import FormButtons from "../../skins/FormButtons";
const axios = require("axios");

// const endpoint = "/api/upload";

class CompetitionsFormik extends Component {
  // componentDidMount() {
  //   this.props.setFieldValue("email", "ccc@ccc.com");
  // }

  render() {
    const {
      values: { name, judge, turnament },
      errors,
      touched,
      handleSubmit,
      handleChange,
      isValid,
      setFieldTouched,
      handleBlur,
      classes,
      setFieldValue,
      onChange,
      toEdit,
      resetForm,
      collection
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
                label="Nazwa/nr"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name ? errors.name : " "}
                onBlur={handleBlur}
              />
            </Grid>
            {!toEdit ? (
              <Grid item xs={12} sm={6} md={4}>
                <InputSelectBaza
                  object={this.props.turnaments}
                  name="turnament"
                  type="string"
                  wybrano={handleChange}
                  // wybrano={e => onChange(e)}
                  value={turnament}
                  label="Zawody"
                  // placeholder="Organizator"
                />
              </Grid>
            ) : null}
            <Grid item xs={12} sm={6} md={4}>
              <InputSelectBaza
                object={this.props.judges}
                name="judge"
                type="string"
                wybrano={handleChange}
                suggestion={nameSurnameSuggestion}
                names={["name", "surname"]}
                // wybrano={e => onChange(e)}
                value={judge}
                label="Sędzia stanowiskowy"
                // placeholder="Organizator"
              />
            </Grid>
          </Grid>

          <FormButtons
            subDisable={!isValid}
            subLabel={toEdit ? "Edytuj konkurencje" : "Dodaj konkurencje"}
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

const CompetitionsForm = withFormik({
  enableReinitialize: true,
  // mapPropsToValues: () => ({ email: "foo@bar.de" }),
  mapPropsToValues({ name, judge, turnament, toEdit, collection }) {
    console.log("mapPropsToValues", name, judge);
    return {
      name: toEdit ? toEdit.name : name || "",
      judge: toEdit ? toEdit.judge : judge || "",
      turnament: turnament || "",
      toEdit,
      collection
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const form = {
      name: values.name,
      judge: values.judge,
      turnament: values.turnament
    };
    console.log("handleSubmit", values);

    const { collection, toEdit } = values;

    const adding = {
      post: `/api/${collection}/`,
      values,
      form,
      // get: `/api/turnaments/`,
      action: "add",
      collection: collection
    };

    const updating = {
      post: `/api/${collection}/update/${toEdit && toEdit._id}`,
      values,
      form,
      // get: `/api/turnaments/`,
      action: "update",
      collection: collection
    };
    store.dispatch(actions.addToDB(toEdit ? updating : adding));
    // store.dispatch(actions.addToDB(values.collection, values, form, id));
    resetForm();

    // if (values.logo) {
    //   const data = new FormData();
    //   data.append("file", values.logo, values.logo.name);
    //   axios
    //     .post(endpoint, data, {
    //       onUploadProgress: ProgressEvent => {
    //         console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
    //       }
    //     })
    //     .then(res => {
    //       // console.log(res.data.file);
    //       Object.assign(competitions, { logo: res.data.file });
    //       console.log(competitions);
    //       axios
    //         .post("/api/competitions/", competitions)
    //         .then(resp => console.log(resp));
    //       // store.dispatch(registerUser(competitions));
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // } else {
    //   console.log(competitions);
    //   axios
    //     .post("/api/competitions/", competitions)
    //     .then(resp => console.log(resp));
    //   // store.dispatch(registerUser(competitions));
    // }
    // resetForm();
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj nazwę/nr konkurencji")
  })
})(CompetitionsFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  promoters: state.promoters,
  judges: state.judges,
  turnaments: state.turnaments,
  toEdit: state.edit
});

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(withRouter(CompetitionsForm));

export default connect(
  mapStateToProps,
  actions
)(withRouter(CompetitionsForm));
