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

const PagingJump = ({ anchorEl, onClose, action, pageSize }) => {
  // console.log("PagingJump", pageSize);

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => action(10)} selected={10 === pageSize}>
        Na jednej stronie 10 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(25)} selected={25 === pageSize}>
        Na jednej stronie 25 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(50)} selected={50 === pageSize}>
        Na jednej stronie 50 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(100)} selected={100 === pageSize}>
        Na jednej stronie 100 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(150)} selected={150 === pageSize}>
        Na jednej stronie 150 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(200)} selected={200 === pageSize}>
        Na jednej stronie 200 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(300)} selected={300 === pageSize}>
        Na jednej stronie 300 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(500)} selected={500 === pageSize}>
        Na jednej stronie 500 rzędów
      </MenuItem>
      <MenuItem onClick={() => action(1000)} selected={1000 === pageSize}>
        Na jednej stronie 1000 rzędów
      </MenuItem>
    </Menu>
  );
};

export default PagingJump;
