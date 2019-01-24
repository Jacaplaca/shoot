import React, { Component } from "react";
import Confirmation from "./Confirmation";
import SiteHeader from "./SiteHeader";

const MainFrameHOC = moreProps => WrappedComponent => {
  return class MainFrameHOC extends Component {
    render() {
      const styles = {
        container: {
          // width: "100%",
          display: "inline-block",
          flexWrap: "nowrap",
          padding: this.props.theme.spacing.unit * 3,
          paddingTop: 80
          // background: "red"
        }
      };
      // console.log("mainfram", this.props);
      // console.log("main mofre", moreProps);
      return (
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

          <SiteHeader text={this.props.title} />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default MainFrameHOC;
