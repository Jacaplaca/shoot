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
              <InputSelectBaza
                object={this.props.judges}
                name="judge"
                type="string"
                wybrano={handleChange}
                // wybrano={e => onChange(e)}
                value={judge}
                label="Sędzia stanowiskowy"
                // placeholder="Organizator"
              />
            </Grid>
          </Grid>

          <ButtonMy
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
          >
            Dodaj sędziego
            <Key style={{ marginLeft: 10 }} />
          </ButtonMy>
        </form>
      </Paper>
    );
  }
}

const CompetitionsForm = withFormik({
  // mapPropsToValues: () => ({ email: "foo@bar.de" }),
  mapPropsToValues({ name, judge, turnament }) {
    return {
      name: name || "name",
      judge: judge || "",
      turnament: turnament || ""
    };
  },
  onChange(values) {
    console.log("handleChange", values);
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const competitions = {
      name: values.name,
      judge: values.judge,
      turnament: values.turnament
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
          Object.assign(competitions, { logo: res.data.file });
          console.log(competitions);
          axios
            .post("/api/competitions/", competitions)
            .then(resp => console.log(resp));
          // store.dispatch(registerUser(competitions));
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log(competitions);
      axios
        .post("/api/competitions/", competitions)
        .then(resp => console.log(resp));
      // store.dispatch(registerUser(competitions));
    }
    resetForm();
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj nazwę organizatora")
  })
})(CompetitionsFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  promoters: state.promoters,
  judges: state.judges,
  turnaments: state.turnaments
});

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(withRouter(CompetitionsForm));

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(CompetitionsForm))
);
