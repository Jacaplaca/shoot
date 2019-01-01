import React, { Component } from "react";
import Up from "@material-ui/icons/ExpandLess";
import Down from "@material-ui/icons/ExpandMore";

class SortButtons extends Component {
  render() {
    return (
      <span
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr"
          // padding: 0,
          // margin: 0
        }}
      >
        <Up style={{ fontSize: 18 }} onClick={() => this.props.click("up")} />
        <Down
          style={{ fontSize: 18 }}
          onClick={() => this.props.click("down")}
        />
      </span>
    );
  }
}

export default SortButtons;
