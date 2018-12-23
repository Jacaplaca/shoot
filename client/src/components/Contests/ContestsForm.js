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

class ContestsFormik extends Component {
  // componentDidMount() {
  //   this.props.setFieldValue("email", "ccc@ccc.com");
  // }

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
                // edytuj={handleChange}
                edytuj={e => console.log(e)}
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

const ContestsForm = withFormik({
  // mapPropsToValues: () => ({ email: "foo@bar.de" }),
  mapPropsToValues({
    name,
    date,
    logo,
    promoter,
    facility,
    judgeMain,
    lzss,
    judgeCounting,
    judgeRTS,
    tech
  }) {
    return {
      name: name || "nazwa zawodow",
      date: date || "",
      logo: logo || "",
      promoter: promoter || "",
      facility: facility || "strzelnica",
      judgeMain: judgeMain || "",
      lzss: lzss || "lzss",
      judgeCounting: judgeCounting || "",
      judgeRTS: judgeRTS || "",
      tech: tech || "kontrola techniczna"
    };
  },
  onChange(values) {
    console.log("handleChange", values);
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const promoter = {
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
          Object.assign(promoter, { logo: res.data.file });
          console.log(promoter);
          axios
            .post("/api/turnaments/", promoter)
            .then(resp => console.log(resp));
          // store.dispatch(registerUser(promoter));
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log(promoter);
      axios.post("/api/turnaments/", promoter).then(resp => console.log(resp));
      // store.dispatch(registerUser(promoter));
    }
    resetForm();
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj nazwę organizatora")
  })
})(ContestsFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  promoters: state.promoters,
  judges: state.judges
});

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(withRouter(ContestsForm));

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(ContestsForm))
);
