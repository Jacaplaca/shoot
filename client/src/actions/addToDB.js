import axios from "axios";
// import { GET_ERRORS, CONFIRMATION, TODELETE } from "./types";
// import { fetchTurnaments } from "./turnaments";
// import { fetchJudges } from "./judges";
import { fetchFromDB } from "./fetchFromDB";
import { registerUser } from "./authentication";
// import store from "../store";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";
const uploadFile = "/api/upload";

export const addToDB = ({
  post,
  values,
  form,
  get,
  action,
  collection,
  id
}) => async dispatch => {
  console.log("addToDB vaelues", values);
  console.log("addToDB form", form);
  // let url;
  // let fetch;
  const fetch = fetchFromDB(collection, get);

  let fieldName = "";
  let promises = [];

  // proce();

  function delay() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }

  async function delayedLog(data) {
    // notice that we can await a function
    // that returns a promise

    const res = await axios.post(uploadFile, data, {
      onUploadProgress: ProgressEvent => {
        console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
      }
    });

    Object.assign(form, { [fieldName]: res.data.file });
    console.log(res.data.file);

    await delay();
    // console.log(item);
  }

  async function processArray(array) {
    for (var variable in form) {
      if (values && values.hasOwnProperty(variable)) {
        if (
          values[variable] &&
          typeof values[variable].name == "string" &&
          variable !== "toEdit"
        ) {
          console.log(
            `to jest nazwa pola ${variable} a to name ${values[variable].name}`
          );
          fieldName = variable;
          const data = new FormData();
          data.append("file", values[variable], values[variable].name);
          await delayedLog(data);
        }
      }
    }
    console.log("bede dispatchowal bo juz po promisach");
    console.log(form);
    if (collection === "promoters" && action === "add") {
      console.log("bede dispatchowal usera");
      dispatch(registerUser(form));
    } else {
      console.log("bede dispatchowal ogolnie do bazy");
      axios.post(post, form).then(resp => dispatch(fetch));
    }
    console.log("Done!");
  }

  processArray([1, 2, 3]);

  // for (var variable in form) {
  //   if (values.hasOwnProperty(variable)) {
  //     if (
  //       values[variable] &&
  //       typeof values[variable].name == "string" &&
  //       variable !== "toEdit"
  //     ) {
  //       console.log(
  //         `to jest nazwa pola ${variable} a to name ${values[variable].name}`
  //       );
  //       fieldName = variable;
  //       const data = new FormData();
  //       data.append("file", values[variable], values[variable].name);
  //       promises.push(
  //         axios
  //           .post(uploadFile, data, {
  //             onUploadProgress: ProgressEvent => {
  //               console.log(
  //                 (ProgressEvent.loaded / ProgressEvent.total) * 100
  //               );
  //             }
  //           })
  //           .then(res => {
  //             Object.assign(form, { [fieldName]: res.data.file });
  //             console.log(form);
  //           })
  //           .catch(function(error) {
  //             console.log(error);
  //           })
  //       );
  //     }
  //   }
  // }
  //
  // Promise.all(promises).then(() => {
  //   console.log("bede dispatchowal bo juz po promisach");
  //   console.log(form);
  //   if (collection === "promoters" && action === "add") {
  //     console.log("bede dispatchowal usera");
  //     dispatch(registerUser(form));
  //   } else {
  //     console.log("bede dispatchowal ogolnie do bazy");
  //     axios.post(post, form).then(resp => dispatch(fetch));
  //   }
  // });

  // if (!values) {
  //   axios.post(post, form).then(resp => dispatch(fetch));
  // } else {
  //   if (values.logo && typeof values.logo.name == "string") {
  //     const data = new FormData();
  //     data.append("file", values.logo, values.logo.name);
  //     axios
  //       .post(uploadFile, data, {
  //         onUploadProgress: ProgressEvent => {
  //           console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
  //         }
  //       })
  //       .then(res => {
  //         Object.assign(form, { logo: res.data.file });
  //         if (collection === "promoters" && action === "add") {
  //           dispatch(registerUser(form));
  //         } else {
  //           console.log(form);
  //           axios.post(post, form).then(resp => dispatch(fetch));
  //         }
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //       });
  //   } else if (values.logo && typeof values.logo.name !== "string") {
  //     Object.assign(form, { logo: values.logo });
  //     if (collection === "promoters" && action === "add") {
  //       dispatch(registerUser(form));
  //     } else {
  //       axios
  //         .post(post, form)
  //         .then(resp => dispatch(fetch))
  //         .catch(function(error) {
  //           console.log(error);
  //         });
  //     }
  //   } else {
  //     if (collection === "promoters" && action === "add") {
  //       dispatch(registerUser(form));
  //     } else {
  //       console.log(form);
  //       axios
  //         .post(post, form)
  //         .then(resp => dispatch(fetch))
  //         .catch(function(error) {
  //           console.log(error);
  //         });
  //     }
  //   }
  // }
};
