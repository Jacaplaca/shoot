import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Confirmation from "./Confirmation";
import SiteHeader from "./SiteHeader";

const MainFrameHOC = moreProps => WrappedComponent => {
  return class MainFrameHOC extends Component {
    render() {
      console.log("load", this.props);
      const { isAuthenticated } = this.props.auth;
      const styles = {
        container: {
          // width: "100%",
          display: "inline-block",
          flexWrap: "nowrap",
          padding: this.props.theme.spacing.unit * 3
          // paddingTop: isAuthenticated ? 80 : 0
          // background: this.props.auth.isAuthenticated || "white"
        },
        root: {
          // flexGrow: 1
          // minWidth: "300px"
          // position: "absolute",
          // top: 100,
          // rigth: 33,
          // zIndex: 333
          // left: 1
          position: "sticky",
          top: 62,
          zIndex: 55,
          opacity: 0.4
        }
      };
      // console.log("mainfram", this.props);
      // console.log("main mofre", moreProps);
      return (
        <div style={{ paddingTop: isAuthenticated ? 80 : 0 }}>
          <div style={styles.root}>
            {this.props.loading ? (
              <LinearProgress color="secondary" />
            ) : (
              <div style={{ height: 5 }} />
            )}

            {/* <CircularProgress color="secondary" /> */}
          </div>

          <div style={styles.container}>
            <Confirmation
              open={this.props.confirmation}
              // akcja={() => moreProps.akcja()}
              action={() => this.props.deleteIdAndFetch(moreProps.collection)}
              close={() => {
                this.props.confirmationAction(false);
                this.props.toDeleteAction(null);
              }}
            />
            {/* {this.props.loading ? ( */}
            {/* ) : null} */}
            {/* <div className={styles.root}>
            <CircularProgress className={styles.root} color="secondary" />
          </div> */}
            <SiteHeader text={this.props.title} />
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  };
};

export default MainFrameHOC;
