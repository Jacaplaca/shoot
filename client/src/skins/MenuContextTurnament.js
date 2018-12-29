import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const MenuContextTurnament = ({ anchorEl, onClose }) => {
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={this.handleClose}>
        Pobierz formatki dla zawodników
      </MenuItem>
      <MenuItem onClick={this.handleClose}>Zobacz zawodników</MenuItem>
      <MenuItem onClick={this.handleClose}>Zobacz wyniki</MenuItem>
      <MenuItem onClick={this.handleClose}>Pobierz raport do drugu</MenuItem>
    </Menu>
  );
};

export default MenuContextTurnament;
