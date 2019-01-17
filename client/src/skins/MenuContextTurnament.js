import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { makeImprints } from "../functions/playersImprints";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
const fs = require("fs");

const handleImprints = (onClose, turnamentId) => {
  // console.log("MenuContextTurnament handleImprints()", turnamentId);
  onClose();
  makeImprints(turnamentId);
  // return onClose;
};

const MenuContextTurnament = ({ anchorEl, onClose, turnamentId, deleteAction, user }) => {
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
      {user.rola === "admin" && <MenuItem onClick={() => deleteAction(turnamentId)}><DeleteIcon /> Usuń zawody</MenuItem>}
    </Menu>
  );
};

export default MenuContextTurnament;
