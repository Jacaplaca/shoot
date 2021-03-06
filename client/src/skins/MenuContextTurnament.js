import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { compose } from "redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { makeImprints } from "../functions/playersImprints";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import * as actions from "../actions";
import ExportExcel from "../components/PlayersScores/ExportExcel";
// const fs = require("fs");

const handleImprints = (onClose, turnamentId) => {
  // console.log("MenuContextTurnament handleImprints()", turnamentId);
  onClose();
  makeImprints(turnamentId);
  // return onClose;
};

const MenuContextTurnament = ({
  anchorEl,
  onClose,
  turnamentId,
  deleteAction,
  user,
  fetchFromDB,
  finished,
  www,
  turnaments
}) => {
  // console.log("fs menu", fs);

  const finishTurnament = turnamentId => {
    axios
      .get(`/api/turnaments/finish/${turnamentId}`)
      .then(result => console.log("finished", result))
      .then(() => fetchFromDB("turnaments"))
      .then(() => onClose());
  };

  const cancelFinish = turnamentId => {
    axios
      .get(`/api/turnaments/cancel/${turnamentId}`)
      .then(result => console.log("canceled finis", result))
      .then(() => fetchFromDB("turnaments"))
      .then(() => onClose());
  };

  const addToWww = turnamentId => {
    axios
      .get(`/api/turnaments/www/${turnamentId}`)
      .then(result => console.log("www", result))
      .then(() => fetchFromDB("turnaments"))
      .then(() => onClose());
  };
  const noWww = turnamentId => {
    axios
      .get(`/api/turnaments/nowww/${turnamentId}`)
      .then(result => console.log("nowww", result))
      .then(() => fetchFromDB("turnaments"))
      .then(() => onClose());
  };

  const turnament = turnaments.filter(x => x._id === turnamentId);
  const competitions = turnament[0] ? turnament[0].competitions.length : 0;
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
        <MenuItem onClick={onClose}>Metryczki zawodników</MenuItem>
      </Link> */}
      {competitions || <MenuItem>Brak dodanych konkurencji</MenuItem>}
      {competitions && (
        <MenuItem onClick={() => handleImprints(onClose, turnamentId)}>
          Metryczki zawodników
        </MenuItem>
      )}

      {competitions && (
        <Link
          to={{
            pathname: `/wyniki_zawodnikow/${turnamentId}`,
            state: { turnamentId }
          }}
        >
          <MenuItem onClick={onClose}>Wyniki zawodników</MenuItem>
        </Link>
      )}
      {/* <MenuItem onClick={onClose}>Zobacz wyniki</MenuItem> */}
      {competitions && (
        <Link
          to={{
            pathname: `/komunikat/${turnamentId}`,
            state: { turnamentId }
          }}
          // target="_blank"
        >
          <MenuItem onClick={onClose}>Pobierz raport do druku</MenuItem>
        </Link>
      )}
      {competitions && (
        <MenuItem
        // onClick={onClose}
        // onClick={() => deleteAction(turnamentId)}
        >
          <ExportExcel id={turnamentId} onClose={onClose} />
          {/* <DeleteIcon /> Usuń zawody */}
        </MenuItem>
      )}

      {user.rola === "admin" && (
        <MenuItem onClick={() => deleteAction(turnamentId)}>
          <DeleteIcon /> Usuń zawody
        </MenuItem>
      )}
      {finished ? (
        <MenuItem onClick={() => cancelFinish(turnamentId)}>
          Anuluj zakończenie zawodów
        </MenuItem>
      ) : (
        <MenuItem onClick={() => finishTurnament(turnamentId)}>
          Zakończ zawody
        </MenuItem>
      )}
      {user.rola === "admin" &&
        competitions &&
        (www ? (
          <MenuItem onClick={() => noWww(turnamentId)}>
            Anuluj publikację
          </MenuItem>
        ) : (
          <MenuItem onClick={() => addToWww(turnamentId)}>Strona WWW</MenuItem>
        ))}
    </Menu>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  turnaments: state.turnaments
});

const enhance = compose(
  // withRouter,
  connect(
    mapStateToProps,
    actions
  )
);

export default enhance(MenuContextTurnament);
