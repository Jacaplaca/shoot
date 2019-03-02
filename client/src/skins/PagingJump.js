import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import { Link } from "react-router-dom";
// import { makeImprints } from "../functions/playersImprints";
// const fs = require("fs");

// const handleImprints = (onClose, turnamentId) => {
//   // console.log("MenuContextTurnament handleImprints()", turnamentId);
//   onClose();
//   makeImprints(turnamentId);
//   // return onClose;
// };

const PagingJump = ({ anchorEl, onClose, action }) => {
  // console.log("fs menu", fs);
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => action(10)}>
        Na jednej stronie 10 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(25)}>
        Na jednej stronie 25 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(50)}>
        Na jednej stronie 50 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(100)}>
        Na jednej stronie 100 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(150)}>
        Na jednej stronie 150 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(200)}>
        Na jednej stronie 200 rzędów
      </MenuItem>
    </Menu>
  );
};

export default PagingJump;
