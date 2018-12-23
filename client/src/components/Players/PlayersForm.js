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

import InputComponent from "../../inputs/InputComponent";
import ButtonMy from "../../skins/ButtonMy";
import Thumb from "../Thumb";
import UploadFile from "../../inputs/UploadFile";
import InputSelectBaza from "../../inputs/InputSelectBaza";
import DatePickerMy from "../../inputs/DatePickerMy";
const axios = require("axios");

const endpoint = "/api/upload";

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

class PlayersFormik extends Component {
  // componentDidMount() {
  //   this.props.setFieldValue("email", "ccc@ccc.com");
  // }

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
      onChange
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

          <ButtonMy
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
          >
            Dodaj zawodnika
            <Key style={{ marginLeft: 10 }} />
          </ButtonMy>
        </form>
      </Paper>
    );
  }
}

const PlayersForm = withFormik({
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
    club
  }) {
    return {
      turnament: turnament || "",
      name: name || "name",
      surname: surname || "surname",
      caliber: caliber || "caliber",
      gun: gun || "gun",
      scope: scope || "scope",
      team: team || "team",
      rank: rank || "rank",
      club: club || "club"
    };
  },
  onChange(values) {
    console.log("handleChange", values);
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    console.log(values);
    const player = {
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
          Object.assign(player, { logo: res.data.file });
          console.log(player);
          axios.post("/api/players/", player).then(resp => console.log(resp));
          // store.dispatch(registerUser(players));
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log(player);
      axios.post("/api/players/", player).then(resp => console.log(resp));
      // store.dispatch(registerUser(players));
    }
    resetForm();
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj nazwę organizatora")
  })
})(PlayersFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  turnaments: state.turnaments
});

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(withRouter(PlayersForm));

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(PlayersForm))
);
