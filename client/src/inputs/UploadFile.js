import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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

const UploadFile = ({ onChange, classes, title }) => (
  <React.Fragment>
    <input
      accept="image/*"
      // className={classes.input}
      style={{ display: "none" }}
      id="raised-button-file"
      multiple
      type="file"
      onChange={onChange}
    />
    <label htmlFor="raised-button-file">
      <Button
        variant="contained"
        color="default"
        component="span"
        style={{}}
        className={classes.button}
      >
        {title}
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
    </label>
  </React.Fragment>
);

export default withStyles(styles, { withTheme: true })(UploadFile);
