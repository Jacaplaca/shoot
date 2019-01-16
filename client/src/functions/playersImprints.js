import * as jsPDF from "jspdf";
// import fetch from "fetch-base64";

import axios from "axios";
// gm = require('gm');
// import gm from "gm";
// import FileBase64 from 'react-file-base64';
import store from "../store";
import * as actions from "../actions";
import { PTSans } from "../skins/PTSans";
// const resizebase64 = require("resize-base64");

// var sizeOf = require("image-size");
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

  let playerCompetition = [];
  let teams = {};
  let arrayToPdf = [];

  for (let player of thePlayers) {
    let team = player.team;
    // for (let competition of competitions) {
    //   const object = {
    //     playerId: player._id,
    //     playerName: player.name,
    //     playerTeam: player.team,
    //     playerSurname: player.surname,
    //     competition: competition.name,
    //     // judgeName: competition.judge.name,
    //     // judgeSurname: competition.judge.surname,
    //     // turnament: theTurnament.name,
    //     turnamentLogo: theTurnament.logo,
    //     turnamentSponsor1: theTurnament.sponsor1,
    //     turnamentSponsor2: theTurnament.sponsor2,
    //     turnamentSponsor3: theTurnament.sponsor3
    //     // promoter: theTurnament.promoter.name,
    //     // promoterLogo: theTurnament.promoter.logo,
    //     // date: theTurnament.date
    //   };
    //   playerCompetition.push(object);
    // }

    if (team in teams) {
      teams[team].push({
        playerName: player.name,
        playerSurname: player.surname,
        playerId: player._id,
        team: player.team
      });
    } else {
      Object.assign(teams, { [team]: [] });
      teams[team].push({
        playerName: player.name,
        playerSurname: player.surname,
        playerId: player._id,
        team: player.team
      });
    }
  }

  for (var element in teams) {
    if (teams.hasOwnProperty(element)) {
      for (let competition of competitions) {
        const object = {
          // playerId: player._id,
          // playerName: player.name,
          // playerTeam: player.team,
          // playerSurname: player.surname,
          competition: competition.name,
          names: teams[element],
          // // judgeName: competition.judge.name,
          // // judgeSurname: competition.judge.surname,
          // // turnament: theTurnament.name,
          turnamentLogo: theTurnament.logo,
          turnamentSponsor1: theTurnament.sponsor1,
          turnamentSponsor2: theTurnament.sponsor2,
          turnamentSponsor3: theTurnament.sponsor3
          // // promoter: theTurnament.promoter.name,
          // // promoterLogo: theTurnament.promoter.logo,
          // // date: theTurnament.date
        };
        // console.log("team elemen", teams[element][0].team);
        if (teams[element][0].team === "") {
          console.log("jestem bez druzyny");
          // arrayToPdf.push("jestem bez druzyny");
        } else {
          arrayToPdf.push(object);
        }
      }
    }
  }

  for (let player of thePlayers) {
    for (let competition of competitions) {
      const object = {
        competition: competition.name,
        names: [
          {
            playerName: player.name,
            playerSurname: player.surname,
            playerId: player._id,
            team: player.team
          }
        ],
        // judgeName: competition.judge.name,
        // judgeSurname: competition.judge.surname,
        // turnament: theTurnament.name,
        turnamentLogo: theTurnament.logo,
        turnamentSponsor1: theTurnament.sponsor1,
        turnamentSponsor2: theTurnament.sponsor2,
        turnamentSponsor3: theTurnament.sponsor3
        // promoter: theTurnament.promoter.name,
        // promoterLogo: theTurnament.promoter.logo,
        // date: theTurnament.date
      };
      if (player.team === "") {
        arrayToPdf.push(object);
      }
    }
  }

  // for (let player of playerCompetition) {
  //   const newPlayer = Object.assign(player, {
  //     names: teams[player.playerTeam]
  //   });
  //   arrayToPdf.push(newPlayer);
  // }

  console.log("playerCompetition", playerCompetition);
  console.log("teams", teams);
  console.log("arrayToPdf", arrayToPdf);

  function delay() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }

  let picArray = [];

  async function processArray() {
    const addresses = [
      theTurnament.logo,
      theTurnament.sponsor1,
      theTurnament.sponsor2,
      theTurnament.sponsor3
    ];

    for (let pic of addresses) {
      if (pic) {
        if (pic !== "") {
          const obrazek = require(`../${pic}`);
          const base64 = await axios.get(obrazek, {
            responseType: "arraybuffer"
          });
          const nazwa = pic.split("/")[1];
          const dim = nazwa.split("_")[0];
          const width = dim.split("x")[0];
          const height = dim.split("x")[1];
          // console.log(nazwa);
          // console.log(dim);
          // console.log("base64", base64);
          // console.log("obrazek", obrazek);
          const image = Buffer.from(base64.data, "binary").toString("base64");
          // console.log("image", image);

          // var image = document.createElement("img");
          //
          // await image.addEventListener("load", function() {
          //   // image.width × image.height
          // });
          //
          // image.src = await obrazek;
          // console.log(image);

          // const i = await new Image();
          // i.src = obrazek;
          // console.log("imaaaaaaage new IMAGE", i);
          await picArray.push({
            image,
            width,
            height,
            ratio: height / width
          });
          await delay();
        }
      }
    }
    console.log(picArray);
    console.log("Done!");
    makePDF();
  }

  processArray();

  const makePDF = () => {
    var doc = new jsPDF({
      //   orientation: 'landscape',
      //   unit: 'mm',
      //   format: [80, 190]
    });

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

    async function imagesLine(array, xStart, yStart, height, space) {
      console.log("images in ", array);
      // imagesLine(picArray, 73, 80, 20, 3);

      // const odlegloscX = xStop - xStart;
      // const iloscProgow = odlegloscX / prog / 2;
      // let start = xStart - prog;
      // let stop = xStart;
      // for (var i = 0; i < iloscProgow - 1; i++) {
      //   start = start + prog * 2;
      //   stop = stop + prog * 2;
      //   doc.setLineWidth(0.3);
      //   doc.line(start, yStart, stop, yStop);
      // }

      let newXstart = xStart;

      for (var i = 0; i < array.length; i++) {
        // console.log("images in line", i);
        // console.log("images in ratio", array[i].ratio);
        // let width = height / array[i].ratio;
        // console.log(array[i].ratio);
        doc.addImage(
          array[i].image,
          "png",
          newXstart,
          yStart,
          height / array[i].ratio,
          height,
          `alias${i}`,
          "FAST"
        );
        // doc.addImage(
        //   array[i].image,
        //   "jpg",
        //   newXstart,
        //   yStart,
        //   width,
        //   height,
        //   `alias${i}`,
        //   "FAST"
        // );
        // doc.line(20, 20, 20, 20);
        newXstart = newXstart + height / array[i].ratio + space;
      }

      // for (let image of array) {
      //   doc.addImage(
      //     array[1].image,
      //     "jpeg",
      //     newXstart,
      //     yStart,
      //     height,
      //     height * array[1].ratio,
      //     "alias",
      //     "SLOW"
      //   );
      //
      //   newXstart = newXstart + height * image.ratio + space;
      // }
    }

    doc.addFileToVFS("PTSans.ttf", PTSans);
    doc.addFont("PTSans.ttf", "PTSans", "normal");

    var ttt2 = JSON.stringify(doc.getFontList());
    ttt2 = ttt2.replace("{", "");
    ttt2 = ttt2.replace("}", "");
    ttt2 = ttt2.split("],");

    // console.log("generate", theTurnament, thePlayers, competitions);

    rend();

    function rend() {
      console.log("jedziemy dalej z pdefem");

      for (var i = 0; i < arrayToPdf.length; i++) {
        let rest = (i + 1) % 3;
        function a() {
          if (rest === 0) {
            return 198;
          } else if (rest === 1) {
            return 0;
          } else if (rest === 2) {
            return 99;
          }
          //   else if (rest === 3) {
          //     return 148;
          //   }
        }

        imagesLine(picArray, 73, 82 + a(), 15.5, 3);

        doc.line(2, 8 + a(), 208, 8 + a());
        doc.line(2, 30 + a(), 208, 30 + a());
        doc.line(2, 38 + a(), 70, 38 + a());
        doc.line(2, 46 + a(), 208, 46 + a());
        doc.line(2, 54 + a(), 70, 54 + a());
        doc.line(2, 63 + a(), 70, 63 + a());
        doc.line(2, 72 + a(), 70, 72 + a());
        doc.line(2, 81 + a(), 208, 81 + a());
        doc.line(2, 90 + a(), 70, 90 + a());

        //poziomy w zawodnik
        doc.line(37, 15.5 + a(), 208, 15.5 + a());
        doc.line(37, 23 + a(), 208, 23 + a());
        //

        //piony
        doc.line(37, 2 + a(), 37, 38 + a());
        doc.line(70, 2 + a(), 70, 99 + a());
        doc.line(37, 46 + a(), 37, 99 + a());
        doc.line(13, 46 + a(), 13, 99 + a());
        doc.line(47.5, 46 + a(), 47.5, 99 + a());

        doc.setFont("PTSans");
        doc.setFontSize(8.5);
        doc.text("Konkurencja/STAGE", 5, 6 + a());
        doc.text("Numer startowy/NO", 39, 6 + a());
        doc.text("Imie i nazwisko/NAME", 125, 5 + a());
        doc.text("UWAGI", 132, 34 + a());
        doc.text("Czas/TIME", 20, 35 + a());
        doc.text("Strzal/SHOOT", 25, 43 + a());
        doc.text("Nr/NO", 3, 51 + a());
        doc.text("Wynik/SCORE", 14, 51 + a());
        doc.text("Nr/NO", 38, 51 + a());
        doc.text("Wynik/SCORE", 49, 51 + a());

        doc.text("(podpis zawodnika)", 110, 77 + a(), "center");
        doc.text("(podpis sedziego)", 180, 77 + a(), "center");
        dotted(75, 72 + a(), 138, 72 + a(), 0.5);
        dotted(150, 72 + a(), 205, 72 + a(), 0.5);
        //  dotted(110, 60 + a(), 200, 60 + a(), 0.5);

        doc.setFontSize(10);
        doc.text("1", 6, 60 + a());
        doc.text("6", 41, 60 + a());
        doc.text("2", 6, 69 + a());
        doc.text("7", 41, 69 + a());
        doc.text("3", 6, 78 + a());
        doc.text("8", 41, 78 + a());
        doc.text("4", 6, 87 + a());
        doc.text("9", 41, 87 + a());
        doc.text("5", 6, 96 + a());
        doc.text("10", 41, 96 + a());

        // doc.text(`${arrayToPdf[i].competition}`, 3, 15 + a());
        doc.setFontSize(11);
        doc.text(
          `${
            arrayToPdf[i].names[0].playerName
              ? arrayToPdf[i].names[0].playerName
              : ""
          } ${
            arrayToPdf[i].names[0].playerSurname
              ? arrayToPdf[i].names[0].playerSurname
              : ""
          }`,
          72,
          13 + a()
        );
        doc.text(
          `${
            arrayToPdf[i].names[1] && arrayToPdf[i].names[1].playerName
              ? arrayToPdf[i].names[1].playerName
              : ""
          } ${
            arrayToPdf[i].names[1] && arrayToPdf[i].names[1].playerSurname
              ? arrayToPdf[i].names[1].playerSurname
              : ""
          }`,
          72,
          20.5 + a()
        );
        doc.text(
          `${
            arrayToPdf[i].names[2] && arrayToPdf[i].names[2].playerName
              ? arrayToPdf[i].names[2].playerName
              : ""
          } ${
            arrayToPdf[i].names[2] && arrayToPdf[i].names[2].playerSurname
              ? arrayToPdf[i].names[2].playerSurname
              : ""
          }`,
          72,
          27.5 + a()
        );
        var competition = doc.splitTextToSize(
          `${arrayToPdf[i].competition}`,
          30
        );
        doc.text(3, 13 + a(), competition);

        rest !== 1 && dotted(2, a(), 208, a(), 3);
        i < arrayToPdf.length - 1 && rest === 0 && doc.addPage();
      }
    }

    doc.save(`${theTurnament.name}_metryczki_zawodnikow.pdf`);
    console.log(arrayToPdf);
  };
};
