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

class JudgesFormik extends Component {
  // componentDidMount() {
  //   this.props.setFieldValue("email", "ccc@ccc.com");
  // }

  render() {
    const {
      values: { name, surename, judgeClass },
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
                name="surename"
                label="nazwisko"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                // edytuj={e => console.log(e)}
                value={surename}
                error={touched.surename && Boolean(errors.surename)}
                helperText={
                  touched.surename && errors.surename ? errors.surename : " "
                }
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InputComponent
                name="judgeClass"
                label="Klasa sędziowska"
                type="string"
                // edytuj={change.bind(null, "email")}
                edytuj={handleChange}
                value={judgeClass}
                error={touched.judgeClass && Boolean(errors.judgeClass)}
                helperText={
                  touched.judgeClass && errors.judgeClass
                    ? errors.judgeClass
                    : " "
                }
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
            Dodaj sędziego
            <Key style={{ marginLeft: 10 }} />
          </ButtonMy>
        </form>
      </Paper>
    );
  }
}

const JudgesForm = withFormik({
  // mapPropsToValues: () => ({ email: "foo@bar.de" }),
  mapPropsToValues({ name, surename, judgeClass }) {
    return {
      name: name || "name",
      surename: surename || "surename",
      judgeClass: judgeClass || "judgeClass"
    };
  },
  onChange(values) {
    console.log("handleChange", values);
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const judges = {
      name: values.name,
      surename: values.surename,
      judgeClass: values.judgeClass
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
          Object.assign(judges, { logo: res.data.file });
          console.log(judges);
          axios.post("/api/judges/", judges).then(resp => console.log(resp));
          // store.dispatch(registerUser(judges));
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log(judges);
      axios.post("/api/judges/", judges).then(resp => console.log(resp));
      // store.dispatch(registerUser(judges));
    }
    resetForm();
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj nazwę organizatora")
  })
})(JudgesFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  promoters: state.promoters
});

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(withRouter(JudgesForm));

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(JudgesForm))
);
