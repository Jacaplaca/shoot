import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { loginUser } from "../actions/authentication";
import * as actions from "../../actions";
import store from "../../store";
import { withStyles } from "@material-ui/core/styles";
import Key from "@material-ui/icons/VpnKey";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import InputComponent from "../../inputs/InputComponent";
import ButtonMy from "../../skins/ButtonMy";
import Thumb from "../Thumb";
import UploadFile from "../../inputs/UploadFile";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import { nameSurnameSuggestion } from "../../inputs/Suggestions";
import FormButtons from "../../skins/FormButtons";

// const component = "turnaments";

class TurnamentsFormik extends Component {
  render() {
    const {
      values: {
        name,
        date,
        logo,
        promoter,
        facility,
        judgeMain,
        lzss,
        judgeCounting,
        judgeRTS,
        tech,
        add1,
        add2,
        add3
      },
      collection,
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
      resetForm
    } = this.props;
    // name = toEdit ? toEdit.name : name;

    // const { prepopulate } = this.state;
    // setFieldValue("name", "asdfsadf");
    // console.log(toEdit);

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
                name="date"
                label="Data"
                type="date"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={date}
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date ? errors.date : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                // initialValues="asdfsadfasdf"
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
              <InputSelectBaza
                object={this.props.promoters}
                name="promoter"
                type="string"
                wybrano={handleChange}
                // wybrano={e => onChange(e)}
                value={promoter}
                label="Organizator"
                // placeholder="Organizator"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="facility"
                label="Strzelnica"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                // edytuj={e => console.log(e)}
                value={facility}
                error={touched.facility && Boolean(errors.facility)}
                helperText={
                  touched.facility && errors.facility ? errors.facility : " "
                }
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelectBaza
                object={this.props.judges}
                name="judgeMain"
                type="string"
                wybrano={handleChange}
                suggestion={nameSurnameSuggestion}
                names={["name", "surname"]}
                // wybrano={e => onChange(e)}
                value={judgeMain}
                label="Sędzia główny"
                // placeholder="Organizator"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="lzss"
                label="Obserwator LZSS"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={lzss}
                error={touched.lzss && Boolean(errors.lzss)}
                helperText={touched.lzss && errors.lzss ? errors.lzss : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelectBaza
                object={this.props.judges}
                name="judgeCounting"
                type="string"
                wybrano={handleChange}
                suggestion={nameSurnameSuggestion}
                names={["name", "surname"]}
                // wybrano={e => onChange(e)}
                value={judgeCounting}
                label="Sędzia liczący"
                // placeholder="Organizator"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelectBaza
                object={this.props.judges}
                name="judgeRTS"
                type="string"
                wybrano={handleChange}
                suggestion={nameSurnameSuggestion}
                names={["name", "surname"]}
                // wybrano={e => onChange(e)}
                value={judgeRTS}
                label="Sędzia RTS"
                // placeholder="Organizator"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="tech"
                label="Kontrola technicza"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={tech}
                error={touched.tech && Boolean(errors.tech)}
                helperText={touched.tech && errors.tech ? errors.tech : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <UploadFile
                title="Załącz logo zawodów"
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
            subLabel={toEdit ? "Edytuj zawody" : "Dodaj zawody"}
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

const TurnamentsForm = withFormik({
  enableReinitialize: true,
  // mapPropsToValues: () => ({ email: "foo@bar.de" }),
  mapPropsToValues: ({
    name,
    date,
    logo,
    promoter,
    facility,
    judgeMain,
    lzss,
    judgeCounting,
    judgeRTS,
    tech,
    toEdit,
    collection
  }) => {
    return {
      name: toEdit ? toEdit.name : name || "",
      date: toEdit ? toEdit.date : date || "",
      logo: toEdit ? toEdit.logo : logo || "",
      promoter: toEdit ? toEdit.promoter : promoter || "",
      facility: toEdit ? toEdit.facility : facility || "",
      judgeMain: toEdit ? toEdit.judgeMain : judgeMain || "",
      lzss: toEdit ? toEdit.lzss : lzss || "",
      judgeCounting: toEdit ? toEdit.judgeCounting : judgeCounting || "",
      judgeRTS: toEdit ? toEdit.judgeRTS : judgeRTS || "",
      tech: toEdit ? toEdit.tech : tech || "",
      collection,
      toEdit
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const form = {
      name: values.name,
      date: values.date,
      logo: "",
      promoter: values.promoter,
      judgeMain: values.judgeMain,
      facility: values.facility,
      lzss: values.lzss,
      judgeCounting: values.judgeCounting,
      judgeRTS: values.judgeRTS,
      tech: values.tech
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
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj nazwę organizatora")
  })
})(TurnamentsFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  promoters: state.promoters,
  judges: state.judges,
  toEdit: state.edit
});

export default connect(
  mapStateToProps,
  // { fetchTurnaments }
  actions
)(withRouter(TurnamentsForm));
