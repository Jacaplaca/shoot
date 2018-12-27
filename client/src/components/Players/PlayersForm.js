import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import axios from "axios";
// import { loginUser } from "../actions/authentication";
import store from "../../store";
import * as actions from "../../actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import InputComponent from "../../inputs/InputComponent";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import FormButtons from "../../skins/FormButtons";

class PlayersFormik extends Component {
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
        club
      },
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
      resetForm
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
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
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
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="surname"
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
                name="rank"
                label="Klasa"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={rank}
                error={touched.rank && Boolean(errors.rank)}
                helperText={touched.rank && errors.rank ? errors.rank : " "}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="club"
                label="Klub"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={club}
                error={touched.club && Boolean(errors.club)}
                helperText={touched.club && errors.club ? errors.club : " "}
                onBlur={handleBlur}
              />
            </Grid>
          </Grid>

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
    collection
  }) {
    // console.log("maps to props", toEdit);
    return {
      turnament: toEdit ? toEdit.turnament : turnament || "",
      name: toEdit ? toEdit.name : name || "",
      surname: toEdit ? toEdit.surname : surname || "surname",
      caliber: toEdit ? toEdit.caliber : caliber || "caliber",
      gun: toEdit ? toEdit.gun : gun || "gun",
      scope: toEdit ? toEdit.scope : scope || "scope",
      team: toEdit ? toEdit.team : team || "team",
      rank: toEdit ? toEdit.rank : rank || "rank",
      club: toEdit ? toEdit.club : club || "club",
      toEdit,
      collection
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
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
      club: values.club
    };
    let id;
    if (values.toEdit) {
      id = values.toEdit._id;
    }
    store.dispatch(actions.addToDB(values.collection, values, form, id));
    resetForm();
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj imię")
  })
})(PlayersFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  turnaments: state.turnaments,
  toEdit: state.edit
});

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(withRouter(PlayersForm));

export default connect(
  mapStateToProps,
  actions
)(withRouter(PlayersForm));
