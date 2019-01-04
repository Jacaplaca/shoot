import * as jsPDF from "jspdf";
// import fetch from "fetch-base64";

import axios from "axios";
// import FileBase64 from 'react-file-base64';
import store from "../store";
import * as actions from "../actions";
import { PTSans } from "../skins/PTSans";
const resizebase64 = require("resize-base64");

// const fs = require("fs");

// const base64Img = require("base64-img");

// const fetch64 = require("fetch-base64");

export const makeImprints = async turnamentId => {
  console.log("make makeImprints");
  const unsubscribe = store.subscribe(async () => {
    console.log("subscribe");
    const myStore = await store.getState();
    const { players, turnaments } = myStore;
    const thePlayers = players.filter(x => x.turnament === turnamentId);
    const theTurnament = turnaments.filter(x => x._id === turnamentId);
    const competitions = theTurnament[0].competitions;
    // console.log("every players", players);
    // console.log("turnamentId", turnamentId);
    // console.log("makeImprints", thePlayers, competitions);
    generatePDFs(theTurnament[0], thePlayers, competitions);
    unsubscribe();
  });
  store.dispatch(actions.fetchFromDB("players", null, turnamentId));
};

const generatePDFs = async (theTurnament, thePlayers, competitions) => {
  console.log("generatepdf");

  let arrayToPdf = [];

  for (let player of thePlayers) {
    for (let competition of competitions) {
      const object = {
        playerName: player.name,
        playerSurname: player.surname,
        competition: competition.name,
        judgeName: competition.judge.name,
        judgeSurname: competition.judge.surname,
        turnament: theTurnament.name,
        // turnamentLogo: theTurnament.logo,
        // promoter: theTurnament.promoter.name,
        // promoterLogo: theTurnament.promoter.logo,
        date: theTurnament.date
      };
      arrayToPdf.push(object);
    }
  }

  function dotted(xStart, yStart, xStop, yStop, prog) {
    const odlegloscX = xStop - xStart;
    const iloscProgow = odlegloscX / prog / 2;
    let start = xStart - prog;
    let stop = xStart;
    for (var i = 0; i < iloscProgow - 1; i++) {
      start = start + prog * 2;
      stop = stop + prog * 2;
      doc.setLineWidth(0.3);
      doc.line(start, yStart, stop, yStop);
    }
  }
  console.log(arrayToPdf);

  var doc = new jsPDF({
    //   orientation: 'landscape',
    //   unit: 'mm',
    //   format: [80, 190]
  });

  doc.addFileToVFS("PTSans.ttf", PTSans);
  doc.addFont("PTSans.ttf", "PTSans", "normal");

  var ttt2 = JSON.stringify(doc.getFontList());
  ttt2 = ttt2.replace("{", "");
  ttt2 = ttt2.replace("}", "");
  ttt2 = ttt2.split("],");

  // console.log("generate", theTurnament, thePlayers, competitions);

  rend();

  function rend() {
    for (var i = 0; i < arrayToPdf.length; i++) {
      const zawody = `<font size='5' ><p>${arrayToPdf[i].turnament}</p></font>`;
      const zawodnik = `<font size='5' ><p>${arrayToPdf[i].playerName} ${
        arrayToPdf[i].playerSurname
      }</p></font>`;
      const sedzia = `<font size='5' ><p>${arrayToPdf[i].judgeName} ${
        arrayToPdf[i].judgeSurname
      }</p></font>`;
      const konkurencja = `<font size='5' ><p>Konkurencja: ${
        arrayToPdf[i].competition
      }</p></font>`;

      const margins = {
        top: 5,
        width: 200
      };

      let rest = (i + 1) % 4;
      function a() {
        if (rest === 0) {
          return 224;
        } else if (rest === 1) {
          return 0;
        } else if (rest === 2) {
          return 74;
        } else if (rest === 3) {
          return 148;
        }
      }

      doc.setFont("PTSans");
      // doc.setFontStyle("bold");
      doc.setFontSize(14);
      doc.text(arrayToPdf[i].turnament, 105, 10 + a(), "center");
      doc.setFontSize(13);
      doc.text(arrayToPdf[i].competition, 10, 18 + a());

      // doc.setFontStyle("italic");
      doc.setFontSize(13);
      doc.text(arrayToPdf[i].playerName, 50, 38 + a(), "center");
      doc.text(arrayToPdf[i].playerSurname, 50, 43 + a(), "center");

      doc.setFontSize(13);
      doc.text(arrayToPdf[i].judgeName, 150, 38 + a(), "center");
      doc.text(arrayToPdf[i].judgeSurname, 150, 43 + a(), "center");

      // doc.text(
      //   "This is centred text asdf ąśsafa sdfADSF asdfasdf adfasd fasdflk óżźą asdfasadf sadsdf asdfsdf sdfasdf.",
      //   105,
      //   80,
      //   null,
      //   null,
      //   "center"
      // );
      // doc.setFontStyle("normal");

      // doc.fromHTML(zawody, 10, 0 + a(), { width: 130 }, margins);
      //
      // doc.fromHTML(zawodnik, 10, 28 + a(), { width: 90 }, margins);
      // doc.fromHTML(sedzia, 110, 28 + a(), { width: 90 }, margins);
      // doc.fromHTML(konkurencja, 135, 10 + a(), { width: 60 }, margins);

      // doc.text(arrayToPdf[i].playerName, 10, 15 + a());
      // doc.text(arrayToPdf[i].playerSurname, 10, 15 + a());
      doc.setFontSize(13);
      doc.text(arrayToPdf[i].date, 170, 18 + a());
      doc.setFontSize(11);
      doc.text("(podpis zawodnika)", 50, 66 + a(), "center");
      doc.text("(podpis sędziego)", 150, 66 + a(), "center");
      doc.setLineWidth(0.3);
      dotted(10, 60 + a(), 100, 60 + a(), 0.5);
      dotted(110, 60 + a(), 200, 60 + a(), 0.5);

      // doc.addImage(base64, "jpeg", 15, 40 + a(), 10, 10, "alias", "SLOW");
      // doc.text(`${arrayToPdf[i].name}`, 10, 10 + a());
      // doc.text(`tel: ${arrayToPdf[i].competition}`, 10, 20 + a());
      // doc.setLineWidth(0.3);
      rest !== 1 && dotted(5, a(), 205, a(), 3);
      i < arrayToPdf.length - 1 && rest === 0 && doc.addPage();
    }
  }
  doc.save(`${theTurnament.name}_metryczki_zawodnikow.pdf`);
  console.log(arrayToPdf);
};
