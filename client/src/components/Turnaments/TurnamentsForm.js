import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { combineStyles } from "../../functions/functions";
// import { loginUser } from "../actions/authentication";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as actions from "../../actions";
import store from "../../store";
import Key from "@material-ui/icons/VpnKey";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import { formStyles } from "../../skins/mainStyles";

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
        factor,
        sponsor1,
        sponsor2,
        sponsor3
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
    // console.log("TurnamentsForm", this.props.values.promoter);
    return (
      <Paper
        // style={formStyles.paper}
        className={classes.paper}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="date"
                clear={() => setFieldValue("date", "")}
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
                clear={() => setFieldValue("name", "")}
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
                // wybrano={handleChange}
                wybrano={e => {
                  handleChange({
                    target: {
                      name: e.target.name,
                      value:
                        e.target.value === "" ? e.target.text : e.target.value
                    }
                  });
                }}
                // wybrano={e => onChange(e)}
                value={promoter}
                label="Organizator"
                // placeholder="Organizator"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                clear={() => setFieldValue("facility", "")}
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
                // wybrano={handleChange}
                wybrano={e => {
                  handleChange({
                    target: {
                      name: e.target.name,
                      value:
                        e.target.value === "" ? e.target.text : e.target.value
                    }
                  });
                }}
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
                clear={() => setFieldValue("lzss", "")}
                name="lzss"
                label="Obserwator PZSS"
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
                // wybrano={handleChange}
                wybrano={e => {
                  handleChange({
                    target: {
                      name: e.target.name,
                      value:
                        e.target.value === "" ? e.target.text : e.target.value
                    }
                  });
                }}
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
                // wybrano={handleChange}
                wybrano={e => {
                  handleChange({
                    target: {
                      name: e.target.name,
                      value:
                        e.target.value === "" ? e.target.text : e.target.value
                    }
                  });
                }}
                suggestion={nameSurnameSuggestion}
                names={["name", "surname"]}
                // wybrano={e => onChange(e)}
                value={judgeRTS}
                label="Sędzia RTS"
                // placeholder="Organizator"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InputComponent
                name="tech"
                clear={() => setFieldValue("tech", "")}
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
            <Grid item xs={12} sm={6} md={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="factor"
                    checked={factor}
                    onChange={handleChange}
                    // value="zaplanowane"
                  />
                }
                label="Faktor"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              // style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}
            >
              <UploadFile
                name="0"
                title="Załącz logo zawodów"
                onChange={event => {
                  setFieldValue("logo", event.currentTarget.files[0]);
                }}
              />
              <Thumb
                key={1}
                file={logo}
                name="0"
                clear={() => setFieldValue("logo", "")}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              // style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}
              // style={{ display: "block" }}
            >
              <UploadFile
                name="1"
                title="Logo sponsora nr 1"
                onChange={event => {
                  setFieldValue("sponsor1", event.currentTarget.files[0]);
                }}
              />
              <Thumb
                key={2}
                file={sponsor1}
                name="1"
                clear={() => setFieldValue("sponsor1", "")}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              // style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}
            >
              <UploadFile
                name="2"
                title="Logo sponsora nr 2"
                onChange={event => {
                  setFieldValue("sponsor2", event.currentTarget.files[0]);
                }}
              />
              <Thumb
                key={3}
                file={sponsor2}
                name="2"
                clear={() => setFieldValue("sponsor2", "")}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              // style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}
            >
              <UploadFile
                name="3"
                title="Logo sponsora nr 3"
                onChange={event => {
                  setFieldValue("sponsor3", event.currentTarget.files[0]);
                }}
              />
              <Thumb
                key={4}
                file={sponsor3}
                name="3"
                clear={() => setFieldValue("sponsor3", "")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} />
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
    collection,
    sponsor1,
    sponsor2,
    sponsor3,
    factor
  }) => {
    return {
      name: toEdit ? toEdit.name : name || "",
      date: toEdit ? toEdit.date : date || "",
      logo: toEdit ? toEdit.logo : logo || "",
      sponsor1: toEdit ? toEdit.sponsor1 : sponsor1 || "",
      sponsor2: toEdit ? toEdit.sponsor2 : sponsor2 || "",
      sponsor3: toEdit ? toEdit.sponsor3 : sponsor3 || "",
      promoter: toEdit ? toEdit.promoter : promoter || "",
      facility: toEdit ? toEdit.facility : facility || "",
      judgeMain: toEdit ? toEdit.judgeMain : judgeMain || "",
      lzss: toEdit ? toEdit.lzss : lzss || "",
      judgeCounting: toEdit ? toEdit.judgeCounting : judgeCounting || "",
      judgeRTS: toEdit ? toEdit.judgeRTS : judgeRTS || "",
      tech: toEdit ? toEdit.tech : tech || "",
      factor: toEdit ? toEdit.factor : factor || false,
      collection,
      toEdit
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const form = {
      name: values.name,
      date: values.date,
      logo: values.logo,
      promoter: values.promoter,
      judgeMain: values.judgeMain,
      facility: values.facility,
      lzss: values.lzss,
      judgeCounting: values.judgeCounting,
      judgeRTS: values.judgeRTS,
      tech: values.tech,
      sponsor1: values.sponsor1,
      sponsor2: values.sponsor2,
      sponsor3: values.sponsor3,
      factor: values.factor
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
    name: Yup.string().required("Podaj nazwę imprezy"),
    promoter: Yup.string().required("Podaj nazwę organizatora"),
    judgeMain: Yup.string().required("Podaj sędziego głównego"),
    // facility: Yup.string().required("Podaj nazwę organizatora"),
    // lzss: Yup.string().required("Podaj nazwę organizatora"),
    judgeCounting: Yup.string().required("Podaj sędziego liczącego"),
    judgeRTS: Yup.string().required("Podaj sędziego RTS")
  })
})(TurnamentsFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  promoters: state.promoters,
  judges: state.judges,
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

export default enhance(TurnamentsForm);

// export default connect(
//   mapStateToProps,
//   // { fetchTurnaments }
//   actions
// )(withRouter(TurnamentsForm));
