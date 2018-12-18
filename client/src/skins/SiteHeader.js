import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    textTransform: "uppercase",
    opacity: "0.75",
    marginBottom: 20
  },
  text: {
    fontSize: 30,
    fontWeight: "300"
  }
});

function SiteHeader(props) {
  const { classes, text, align } = props;

  return (
    <div className={classes.root}>
      <Typography
        variant="display1"
        gutterBottom
        align={align}
        classes={{
          //root: classes.rootButton,
          //label: classes.labelButton,
          display1: classes.text // class name, e.g. `classes-nesting-label-x`
        }}
      >
        {text}
      </Typography>
    </div>
  );
}

SiteHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

SiteHeader.defaultProps = {
  align: "left"
};

export default withStyles(styles, { withTheme: true })(SiteHeader);
