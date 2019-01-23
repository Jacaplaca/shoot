import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { combineStyles } from "../../functions/functions";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import XLSX from "xlsx";
// import axios from "axios";
// import { loginUser } from "../actions/authentication";
import store from "../../store";
import * as actions from "../../actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import UploadFile from "../../inputs/UploadFile";
import axios from "axios";

import { formStyles } from "../../skins/mainStyles";
import InputComponent from "../../inputs/InputComponent";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import FormButtons from "../../skins/FormButtons";

class PlayersFormik extends Component {
  importExcel = (file, turnament, collection) => {
    console.log(file, turnament);

    var reader = new FileReader();
    console.log(reader);

    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary"
      });

      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        XL_row_object.map(x => {
          Object.assign(x, { turnament });
        });

        const adding = {
          post: `/api/${collection}/upload_many`,
          values: null,
          form: XL_row_object,
          get: `/api/${collection}/turnament/${turnament}`,
          action: "add",
          collection: collection
        };
        console.log("add", adding);
        store.dispatch(actions.addToDB(adding));

        // console.log("XL_row_object", XL_row_object);
        // axios.post("/api/players/upload_many", XL_row_object);
        // console.log("wihtTurnament", wihtTurnament);
        // var json_object = JSON.stringify(XL_row_object);
        // console.log(json_object);
      });
    };

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };

  render() {
    const {
      values: {
        turnament,
        name,
        surname,
        caliber,
        gun,
        scope,
        team,
        rank,
        club,
        rodo
      },
      auth: { user },
      turnaments,
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
      collection,
      toEdit,
      resetForm,
      turnamentId
    } = this.props;
    // console.log("turn", turnament.length);
    // setFieldValue("email", "ccc@ccc.com");
    // console.log("rodo", rodo);
    return (
      <Paper className={classes.paper}>
        <form autoComplete="new-password" onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} md={4}>
              <InputSelectBaza
                object={turnaments}
                name="turnament"
                type="string"
                wybrano={handleChange}
                // wybrano={e => onChange(e)}
                value={turnament}
                label="Zawody"
                // placeholder="Organizator"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InputComponent
                name="rank"
                clear={() => setFieldValue("rank", "")}
                label="Numer startowy"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={rank}
                error={touched.rank && Boolean(errors.rank)}
                helperText={touched.rank && errors.rank ? errors.rank : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InputComponent
                clear={() => setFieldValue("name", "")}
                name="name"
                label="Imię"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name ? errors.name : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rodo"
                    checked={rodo}
                    onChange={handleChange}
                    // value="zaplanowane"
                  />
                }
                label="RODO"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="surname"
                clear={() => setFieldValue("surname", "")}
                label="nazwisko"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                // edytuj={e => console.log(e)}
                value={surname}
                error={touched.surname && Boolean(errors.surname)}
                helperText={
                  touched.surname && errors.surname ? errors.surname : " "
                }
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="caliber"
                clear={() => setFieldValue("caliber", "")}
                label="Kaliber"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={caliber}
                error={touched.caliber && Boolean(errors.caliber)}
                helperText={
                  touched.caliber && errors.caliber ? errors.caliber : " "
                }
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="gun"
                clear={() => setFieldValue("gun", "")}
                label="Broń"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={gun}
                error={touched.gun && Boolean(errors.gun)}
                helperText={touched.gun && errors.gun ? errors.gun : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="scope"
                clear={() => setFieldValue("scope", "")}
                label="Luneta"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={scope}
                error={touched.scope && Boolean(errors.scope)}
                helperText={touched.scope && errors.scope ? errors.scope : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="team"
                clear={() => setFieldValue("team", "")}
                label="Team"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={team}
                error={touched.team && Boolean(errors.team)}
                helperText={touched.team && errors.team ? errors.team : " "}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="club"
                clear={() => setFieldValue("club", "")}
                label="Klub"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={club}
                error={touched.club && Boolean(errors.club)}
                helperText={touched.club && errors.club ? errors.club : " "}
                onBlur={handleBlur}
              />
              {/* <span
                style={{ color: "white" }}
                onClick={() => console.log("import")}
              >
                Importuj zawodników z pliku EXCELa
              </span> */}
            </Grid>
          </Grid>
          {user.rola === "admin" && turnament && turnament.length > 0 && (
            <UploadFile
              title="Importuj zawodników"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={event => {
                // setFieldValue("logo", event.currentTarget.files[0]);
                this.importExcel(
                  event.currentTarget.files[0],
                  turnament,
                  collection
                );
              }}
            />
          )}
          <FormButtons
            subDisable={!isValid}
            subLabel={toEdit ? "Edytuj Zawodnika" : "Dodaj Zawodnika"}
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

const PlayersForm = withFormik({
  enableReinitialize: true,
  // mapPropsToValues: () => ({ email: "foo@bar.de" }),
  mapPropsToValues({
    turnament,
    name,
    surname,
    caliber,
    gun,
    scope,
    team,
    rank,
    club,
    toEdit,
    collection,
    turnamentId,
    turnaments,
    rodo
  }) {
    console.log("maps to props", turnament);
    // console.log("maps to props", turnament);
    // console.log("maps to props turnaments", turnaments);
    return {
      turnament: toEdit ? toEdit.turnament : turnament || "",
      name: toEdit ? toEdit.name : name || "",
      surname: toEdit ? toEdit.surname : surname || "",
      caliber: toEdit ? toEdit.caliber : caliber || "",
      gun: toEdit ? toEdit.gun : gun || "",
      scope: toEdit ? toEdit.scope : scope || "",
      team: toEdit ? toEdit.team : team || "",
      rank: toEdit ? toEdit.rank : rank || "",
      club: toEdit ? toEdit.club : club || "",
      rodo: toEdit ? toEdit.rodo : rodo || false,
      toEdit,
      collection,
      turnamentId,
      turnaments
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting, setFieldValue }) {
    // console.log("handleSubmit", values);
    const form = {
      turnament: values.turnament,
      name: values.name,
      surname: values.surname,
      caliber: values.caliber,
      gun: values.gun,
      scope: values.scope,
      team: values.team,
      rank: values.rank,
      club: values.club,
      rodo: values.rodo
    };

    const { collection, toEdit, turnamentId, turnaments } = values;
    const adding = {
      post: `/api/${collection}/`,
      values,
      form,
      get: `/api/${collection}/turnament/${turnamentId}`,
      action: "add",
      collection: collection
    };

    const updating = {
      post: `/api/${collection}/update/${toEdit && toEdit._id}`,
      values,
      form,
      get: `/api/${collection}/turnament/${turnamentId}`,
      action: "update",
      collection: collection
    };
    // console.log("form", form);
    // console.log("values", values);
    console.log("turnaments", turnaments);
    const turnamentFormer = {
      _id: form.turnament,
      name: turnaments.filter(x => x._id === form.turnament)[0].name
    };
    store.dispatch(actions.addToDB(toEdit ? updating : adding));
    resetForm();
    setFieldValue("turnament", turnamentFormer);
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj imię")
  })
})(PlayersFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  turnaments: state.turnaments,
  toEdit: state.edit,
  turnamentId: state.turnamentId
});

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(withRouter(PlayersForm));

const combinedStyles = combineStyles(formStyles);

const enhance = compose(
  withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
);

export default enhance(PlayersForm);

// export default connect(
//   mapStateToProps,
//   actions
// )(withRouter(PlayersForm));
