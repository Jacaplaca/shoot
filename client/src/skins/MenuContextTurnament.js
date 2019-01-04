import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { makeImprints } from "../functions/playersImprints";
const fs = require("fs");

const handleImprints = (onClose, turnamentId) => {
  // console.log("MenuContextTurnament handleImprints()", turnamentId);
  onClose();
  makeImprints(turnamentId);
  // return onClose;
};

const MenuContextTurnament = ({ anchorEl, onClose, turnamentId }) => {
  // console.log("fs menu", fs);
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      {/* <Link
        to={{
          pathname: `/metryczki_zawodnikow/${turnamentId}`,
          state: { turnamentId }
        }}
      >
        <MenuItem onClick={this.handleClose}>Metryczki zawodników</MenuItem>
      </Link> */}
      <MenuItem onClick={() => handleImprints(onClose, turnamentId)}>
        Metryczki zawodników
      </MenuItem>
      <Link
        to={{
          pathname: `/wyniki_zawodnikow/${turnamentId}`,
          state: { turnamentId }
        }}
      >
        <MenuItem onClick={this.handleClose}>Wyniki zawodników</MenuItem>
      </Link>
      {/* <MenuItem onClick={this.handleClose}>Zobacz wyniki</MenuItem> */}
      <MenuItem onClick={this.handleClose}>Pobierz raport do drugu</MenuItem>
    </Menu>
  );
};

export default MenuContextTurnament;
