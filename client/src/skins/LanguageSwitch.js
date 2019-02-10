import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import * as actions from "../actions/language";

const LanguageSwitch = ({ languageChange, language }) => {
  return (
    <span style={{ color: "grey", fontWeight: 800 }}>
      {language !== "pl" ? (
        <button onClick={() => languageChange("pl")}>PL</button>
      ) : (
        <span>PL</span>
      )}{" "}
      {language !== "en" ? (
        <button onClick={() => languageChange("en")}>EN</button>
      ) : (
        <span>PL</span>
      )}
    </span>
  );
};

function mapStateToProps({ auth, language }) {
  return { auth, language };
}

export default withStyles(null, { withTheme: true })(
  connect(
    mapStateToProps,
    actions
  )(LanguageSwitch)
);
