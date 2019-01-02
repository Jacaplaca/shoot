import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
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
          <IconButton
            color="primary"
            // aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
            // aria-haspopup="true"
            onClick={() => this.props.click("left")}
          >
            <Left style={{ fontSize: 25 }} />
          </IconButton>
        )}
        {right && (
          <IconButton
            color="primary"
            // aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
            // aria-haspopup="true"
            onClick={() => this.props.click("right")}
          >
            <Right style={{ fontSize: 25 }} />
          </IconButton>
        )}
      </span>
    );
  }
}

export default SortButtons;
