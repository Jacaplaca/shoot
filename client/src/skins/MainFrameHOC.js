import React, { Component } from "react";
import SiteHeader from "./SiteHeader";

const MainFrameHOC = WrappedComponent => {
  return class MainFrameHOC extends Component {
    render() {
      const styles = {
        container: {
          display: "inline-block",
          flexWrap: "nowrap",
          padding: this.props.theme.spacing.unit * 3
        }
      };
      return (
        <div style={styles.container}>
          <SiteHeader text={this.props.title} />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default MainFrameHOC;
