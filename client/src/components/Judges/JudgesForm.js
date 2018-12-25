import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store";
import * as actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import Key from "@material-ui/icons/VpnKey";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import InputComponent from "../../inputs/InputComponent";
import ButtonMy from "../../skins/ButtonMy";

const component = "judges";

const JudgesFormik = props => {
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
    onChange,
    toEdit
  } = props;
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
              edytuj={handleChange}
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
};

const JudgesForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues({ name, surename, judgeClass, toEdit }) {
    return {
      name: toEdit ? toEdit.name : name || "",
      surename: toEdit ? toEdit.surename : surename || "",
      judgeClass: toEdit ? toEdit.judgeClass : judgeClass || ""
    };
  },
  onChange(values) {
    console.log("handleChange", values);
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const form = {
      name: values.name,
      surename: values.surename,
      judgeClass: values.judgeClass
    };
    store.dispatch(actions.addToDB(component, values, form));
    resetForm();
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Podaj nazwę organizatora")
  })
})(JudgesFormik);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  toEdit: state.edit
});

export default connect(
  mapStateToProps,
  actions
)(withRouter(JudgesForm));
