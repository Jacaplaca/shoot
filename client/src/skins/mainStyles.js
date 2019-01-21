import {
  darken,
  emphasize,
  lighten
} from "@material-ui/core/styles/colorManipulator";

export const rowStyles = theme => ({
  back: { background: "red", color: "yellow", fontWeight: "800" },
  rowContainerBlock: {
    display: "grid",
    width: "100%",
    height: "100%",
    borderLeft: `0.1px solid ${lighten(theme.palette.menu, 0.2)}`
    // borderRight: "0.1px solid grey"
  },
  rowBlock: {
    alignSelf: "center",
    justifySelf: "center",
    paddingLeft: 5,
    paddingRight: 5,
    // paddingTop: 2,
    // paddingBottom: 2,
    textAlign: "center",
    fontSize: 15

    // display: "block"
  },
  rowTable: {
    display: "grid",
    minWidth: 900,
    color: theme.palette.text.primary,
    background: lighten(theme.palette.menu, 0.1),
    marginBottom: 2
  },
  rowName: {
    // fontWeight: "600",
    textAlign: "left",
    // alignSelf: "start",
    justifySelf: "start"
  },
  rowImg: {
    maxWidth: 40,
    maxHeight: 40,
    padding: 2
  },
  rowFinished: {
    display: "grid",
    minWidth: 900,
    color: theme.palette.text.primary,
    background: darken(theme.palette.secondary.dark, 0.5),
    marginBottom: 2
  }
});

export const tableHeadStyles = theme => ({
  headBlock: {
    alignSelf: "center",
    justifySelf: "center",
    paddingLeft: 5,
    // paddingTop: 2,
    // paddingBottom: 2,
    textAlign: "center",
    fontWeight: "500",
    textTransform: "uppercase",
    fontSize: 13
  },
  headTable: {
    display: "grid",
    minWidth: 900,
    color: theme.palette.text.primary,
    background: lighten(theme.palette.menu, 0.1),
    marginBottom: 2,
    height: 50
  }
});

export const textFieldStyles = theme => ({
  input: {
    color: theme.palette.form.color
  },
  label: {
    // textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    // overflow: "hidden",
    // width: "100%",
    color: theme.palette.form.color,
    fontSize: 14
  }
});

export const formStyles = theme => ({
  paper: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 10,
    backgroundColor: theme.palette.paper.background
  }
});
