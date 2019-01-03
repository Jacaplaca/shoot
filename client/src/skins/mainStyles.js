import {
  darken,
  emphasize,
  lighten
} from "@material-ui/core/styles/colorManipulator";

export const rowStyles = theme => ({
  back: { background: "red", color: "yellow", fontWeight: "800" },
  rowBlock: {
    alignSelf: "center",
    justifySelf: "center",
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: "center"
  },
  rowTable: {
    display: "grid",
    minWidth: 900,
    color: theme.palette.text.primary,
    background: lighten(theme.palette.menu, 0.1),
    marginBottom: 6
  },
  rowName: {
    fontWeight: "600"
  },
  rowImg: {
    maxWidth: 60,
    maxHeight: 60,
    padding: 5
  }
});

export const tableHeadStyles = theme => ({
  headBlock: {
    alignSelf: "center",
    justifySelf: "center",
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: "center",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  headTable: {
    display: "grid",
    minWidth: 900,
    color: theme.palette.text.primary,
    background: lighten(theme.palette.menu, 0.1),
    marginBottom: 6,
    height: 50
  }
  // rowName: {
  //   fontWeight: "600"
  // },
  // rowImg: {
  //   maxWidth: 60,
  //   maxHeight: 60,
  //   padding: 5
  // }
});
