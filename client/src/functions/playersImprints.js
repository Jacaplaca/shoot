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
  // console.log("fs", fs);
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
  const obrazek = require(`../${theTurnament.logo}`);

  const read = async obrazek => {
    const reader = new FileReader();
    await reader.readAsDataURL(obrazek);
    // const img = new Image();
    // img.src = event.target.result;
    const elem = document.createElement("canvas");
    console.log(elem);
  };

  read(obrazek);

  const base64 = await axios
    .get(obrazek, {
      responseType: "arraybuffer"
    })
    .then(response => {
      console.log(response);
      console.log(Buffer.from(response.data, "binary").toString("base64"));
      const image = Buffer.from(response.data, "binary").toString("base64");
      // console.log(resizebase64(image, 50, 50));
      // return resizebase64(image, 50, 50);
      return image;
    });

  // const image = await axios
  //   .get(obrazek, "base64")
  //   .then(res => console.log(res));

  // function readFile(obrazek) {
  //   var FR = new FileReader();
  //
  //   // FR.addEventListener("load", function(e) {
  //   //   document.getElementById("img").src       = e.target.result;
  //   //   document.getElementById("b64").innerHTML = e.target.result;
  //   // });
  //
  //   FR.readAsDataURL(obrazek);
  //   console.log(obrazek);
  // }
  //
  // readFile(obrazek);

  // base64Img.base64(obrazek, function(err, data) {
  //   console.log(data);
  // });

  // fetch64
  //   .local(obrazek)
  //   .then(data => {
  //     // data[0] contains the raw base64-encoded jpg
  //     console.log(data);
  //   })
  //   .catch(reason => {
  //     console.log(reason);
  //   });

  // console.log(obrazek);
  // getBase64(
  //   "http://localhost:3001/static/media/1546013745197.84a98441.png"
  // ).then(data => console.log(data));
  //
  // function getBase64(file) {
  //   console.log("file");
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     console.log("reader", reader);
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //   });
  // }

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

  console.log("generate", theTurnament, thePlayers, competitions);

  let arrayToPdf = [];

  for (let player of thePlayers) {
    for (let competition of competitions) {
      const object = {
        name: `${player.name} ${player.surname}`,
        competition: competition.name,
        judge: `${competition.judge.name} ${competition.judge.surname}`,
        turnament: theTurnament.name,
        turnamentLogo: theTurnament.logo,
        promoter: theTurnament.promoter.name,
        promoterLogo: theTurnament.promoter.logo
      };
      arrayToPdf.push(object);
    }
  }

  rend();

  function rend() {
    for (var i = 0; i < arrayToPdf.length; i++) {
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
      doc.addImage(base64, "jpeg", 15, 40 + a(), 10, 10, "alias", "SLOW");
      doc.text(`${arrayToPdf[i].name}`, 10, 10 + a());
      doc.text(`tel: ${arrayToPdf[i].competition}`, 10, 20 + a());
      doc.setLineWidth(0.5);
      rest !== 1 && doc.line(5, a(), 205, a());
      i < arrayToPdf.length - 1 && rest === 0 && doc.addPage();
    }
  }
  doc.save(`${theTurnament.name}_metryczki_zawodnikow.pdf`);
  console.log(arrayToPdf);
};
