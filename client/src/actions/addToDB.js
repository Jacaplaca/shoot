import axios from "axios";
// import { GET_ERRORS, CONFIRMATION, TODELETE } from "./types";
// import { fetchTurnaments } from "./turnaments";
// import { fetchJudges } from "./judges";
import { fetchFromDB } from "./fetchFromDB";
import { registerUser } from "./authentication";
// import store from "../store";
// import setAuthToken from "../setAuthToken";
// import jwt_decode from "jwt-decode";
const endpoint = "/api/upload";

export const addToDB = (collection, values, form, id) => async dispatch => {
  console.log("addToDB", values, form, id);
  let url;
  let fetch;
  if (id) {
    url = `/api/${collection}/update/${id}`;
  } else {
    url = `/api/${collection}/`;
  }
  console.log("addToDBurl", url);

  if (collection === "players") {
    fetch = fetchFromDB(collection, "turnament", values.turnament);
  } else {
    fetch = fetchFromDB(collection);
  }

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
        if (collection === "promoters" && !id) {
          dispatch(registerUser(form));
        } else {
          console.log(form);
          axios.post(url, form).then(resp => dispatch(fetch));
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  } else if (values.logo && typeof values.logo.name !== "string") {
    Object.assign(form, { logo: values.logo });
    if (collection === "promoters" && !id) {
      dispatch(registerUser(form));
    } else {
      axios
        .post(url, form)
        .then(resp => dispatch(fetch))
        .catch(function(error) {
          console.log(error);
        });
    }
  } else {
    if (collection === "promoters" && !id) {
      dispatch(registerUser(form));
    } else {
      console.log(form);
      axios
        .post(url, form)
        .then(resp => dispatch(fetch))
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
