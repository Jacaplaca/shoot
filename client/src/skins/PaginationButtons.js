import React, { Component } from "react";
import Left from "@material-ui/icons/ChevronLeft";
import Right from "@material-ui/icons/ChevronRight";

class SortButtons extends Component {
  render() {
    const { left, right } = this.props;
    return (
      <span
        style={{
          display: "grid",
          gridTemplateRows: "1fr",
          alignItems: "center",
          justifyContent: "center"
          // padding: 0,
          // margin: 0
        }}
      >
        {left && (
          <Left
            style={{ fontSize: 25 }}
            onClick={() => this.props.click("left")}
          />
        )}
        {right && (
          <Right
            style={{ fontSize: 25 }}
            onClick={() => this.props.click("right")}
          />
        )}
      </span>
    );
  }
}

export default SortButtons;
