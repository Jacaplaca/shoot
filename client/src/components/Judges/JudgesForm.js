import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { combineStyles } from "../../functions/functions";
import store from "../../store";
import * as actions from "../../actions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { formStyles } from "../../skins/mainStyles";

import InputComponent from "../../inputs/InputComponent";
import FormButtons from "../../skins/FormButtons";

// const component = "judges";

const JudgesFormik = props => {
  const {
    values: { name, surname, judgeClass },
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
  } = props;
  console.log("judges", props);
  // setFieldValue("email", "ccc@ccc.com");
  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={4}>
            <InputComponent
              clear={() => setFieldValue("name", "")}
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
              clear={() => setFieldValue("surname", "")}
              name="surname"
              label="nazwisko"
              type="string"
              edytuj={handleChange}
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

        <FormButtons
          subDisable={!isValid}
          subLabel={toEdit ? "Edytuj sędziego" : "Dodaj sędziego"}
          cancelLabel={"Anuluj"}
          cancelAction={() => {
            store.dispatch(actions.editFetch());
            resetForm();
          }}
        />
      </form>
    </Paper>
  );
};

// let editedObject;
const JudgesForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues({ name, surname, judgeClass, toEdit, collection }) {
    // editedObject = toEdit;
    return {
      name: toEdit ? toEdit.name : name || "",
      surname: toEdit ? toEdit.surname : surname || "",
      judgeClass: toEdit ? toEdit.judgeClass : judgeClass || "",
      toEdit,
      collection
    };
  },
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    const form = {
      name: values.name,
      surname: values.surname,
      judgeClass: values.judgeClass
    };
    // console.log("handleSubmit judges", values.collection);
    // console.log("handleSubmit toEdit", values.toEdit);

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
    // store.dispatch(actions.addToDB(values.collection, values, form, id));
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

const combinedStyles = combineStyles(formStyles);

const enhance = compose(
  withRouter,
  withStyles(combinedStyles, { withTheme: true }),
  connect(
    mapStateToProps,
    actions
  )
);

export default enhance(JudgesForm);

// export default connect(
//   mapStateToProps,
//   actions
// )(withRouter(JudgesForm));
