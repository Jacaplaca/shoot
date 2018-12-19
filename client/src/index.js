import React from "react";
import ReactDOM from "react-dom";
import {
  MuiThemeProvider,
  createMuiTheme,
  getMuiTheme
} from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import * as Colors from "@material-ui/core/colors";

import {
  darken,
  emphasize,
  lighten
} from "@material-ui/core/styles/colorManipulator";

const glowny = "#2b2b2b";
const szary = "rgb(135, 135, 135)";
const czerwony = "rgb(255, 0, 0)";
const bialy = "#e7e7e7";
const pomaranczowy = orange[300];

const newTheme = theme =>
  createMuiTheme({
    // menu: {
    //   backgroundColor: Colors.greenA100
    // },
    // muiTheme: getMuiTheme(theme),
    // appBar: {
    //   backgroundColor: "rgba(0, 0, 0, 0.87)"
    //   //zIndex: theme.zIndex.drawer + 1
    // },
    // drawer: {
    //   color: "rgba(0, 0, 0, 0.87)"
    // },
    palette: {
      button: {
        start: darken(pomaranczowy, 0.4),
        end: emphasize(pomaranczowy, 0.4)
      },
      menu: "#232323",
      // menu: "rgb(20, 20, 20)",
      // menu: "#6f2232",
      drawer: "#1c1c1c",
      // drawer: "#1a1a1d",
      type: "dark",
      background: { default: "#121212", paper: "#232323" },
      // // primary: indigo,
      // // secondary: pink,
      // // error: red,
      secondary: {
        dark: orange[400],
        light: orange[100],
        main: orange[300]
      },
      primary: {
        dark: bialy,
        light: bialy,
        main: bialy
      },
      error: {
        contrastText: "#fff",
        dark: orange[400],
        light: orange[100],
        main: orange[300]
      },
      text: {
        disabled: "rgba(255, 255, 255, 0.5)",
        hint: "rgba(255, 255, 255, 0.5)",
        icon: "rgba(255, 255, 255, 0.5)",
        primary: bialy,
        secondary: "rgba(255, 255, 255, 0.7)"
      }
      // // Used by `getContrastText()` to maximize the contrast between the background and
      // // the text.
      // contrastThreshold: 5,
      // // Used to shift a color's luminance by approximately
      // // two indexes within its tonal palette.
      // // E.g., shift from Red 500 to Red 300 or Red 700.
      // tonalOffset: 0.1,
      // background: "#303f9f"
    }
  });

function Root() {
  return (
    <MuiThemeProvider theme={newTheme}>
      <App />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
