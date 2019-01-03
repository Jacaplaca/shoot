import React, { Component } from "react";
import Up from "@material-ui/icons/ArrowUpward";
import Down from "@material-ui/icons/ArrowDownward";

class SortButtons extends Component {
  state = {
    sorting: "up"
  };

  changeSorting = how => {
    if (how === "up") {
      this.props.click("up");
      this.setState({ sorting: "up" });
    } else if (how === "down") {
      this.props.click("down");
      this.setState({ sorting: "down" });
    }
  };

  render() {
    const { sorting } = this.state;
    return (
      <span
        style={{
          display: "grid",
          opacity: 0.5
          // gridTemplateRows: "1fr 1fr"
          // padding: 0,
          // margin: 0
        }}
      >
        {sorting === "down" ? (
          <Up
            style={{ fontSize: 23 }}
            onClick={() => this.changeSorting("up")}
          />
        ) : (
          <Down
            style={{ fontSize: 23 }}
            onClick={() => this.changeSorting("down")}
          />
        )}
      </span>
    );
  }
}

export default SortButtons;
