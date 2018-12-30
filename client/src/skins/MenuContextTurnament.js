import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeImprints } from "../functions/playersImprints";
const fs = require("fs");

const handleImprints = (onClose, turnamentId) => {
  // console.log("MenuContextTurnament handleImprints()", turnamentId);
  onClose();
  makeImprints(turnamentId);
  // return onClose;
};

const MenuContextTurnament = ({ anchorEl, onClose, turnamentId }) => {
  console.log("fs menu", fs);
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => handleImprints(onClose, turnamentId)}>
        Metryczki zawodników
      </MenuItem>
      <MenuItem onClick={this.handleClose}>Zobacz zawodników</MenuItem>
      <MenuItem onClick={this.handleClose}>Zobacz wyniki</MenuItem>
      <MenuItem onClick={this.handleClose}>Pobierz raport do drugu</MenuItem>
    </Menu>
  );
};

export default MenuContextTurnament;
