import axios from "axios";
// import { GET_ERRORS, CONFIRMATION, TODELETE } from "./types";
// import { fetchTurnaments } from "./turnaments";
// import { fetchJudges } from "./judges";
import { fetchFromDB } from "./fetchFromDB";
// import store from "../store";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";
const endpoint = "/api/upload";

export const addToDB = (collection, values, form, id) => async dispatch => {
  console.log("addToDB", values, form, id);
  let url;
  if (id) {
    url = `/api/${collection}/update/${id}`;
  } else {
    url = `/api/${collection}/`;
  }
  console.log("addToDBurl", url);
  // let action;
  //
  // switch (collection) {
  //   case "judges":
  //     action = fetchJudges();
  //     break;
  //   case "turnaments":
  //     action = fetchTurnaments();
  //     break;
  //   default:
  // }

  if (values.logo && typeof values.logo.name == "string") {
    const data = new FormData();
    data.append("file", values.logo, values.logo.name);
    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
        }
      })
      .then(res => {
        Object.assign(form, { logo: res.data.file });
        console.log(form);
        axios.post(url, form).then(resp => dispatch(fetchFromDB(collection)));
      })
      .catch(function(error) {
        console.log(error);
      });
  } else if (values.logo && typeof values.logo.name !== "string") {
    Object.assign(form, { logo: values.logo });
    axios
      .post(url, form)
      .then(resp => dispatch(fetchFromDB(collection)))
      .catch(function(error) {
        console.log(error);
      });
  } else {
    console.log(form);
    axios
      .post(url, form)
      .then(resp => dispatch(fetchFromDB(collection)))
      .catch(function(error) {
        console.log(error);
      });
  }
};
