import * as jsPDF from "jspdf";
import { PTSans } from "../../skins/PTSans";

// const turnament = {date: "2018-12-31", facility: "Pod wiatą", name: "Mistrzostwa w czyms sadfsadfsadf asdf asdf sadf asd"}
// const protocols = [
//   {
//     protocol: "Protokół nr 1",
//     players: [
//       { name: "tak dsa", score: 3766, position: 1 },
//       { name: "John Foczy", score: 966, position: 2 },
//       { name: "Brajan Fish", score: 435, position: 3 },
//       { name: "tak dsa", score: 367, position: 4 },
//       { name: "no d", score: 367, position: 5 },
//       { name: "yes ed", score: 357, position: 6 },
//       { name: "yes ed", score: 337, position: 7 },
//       { name: "nie asd", score: 206, position: 8 },
//       { name: "nie asd", score: 156, position: 9 },
//       { name: "no d", score: 44, position: 10 },
//       { name: "tak dsa", score: 3766, position: 11 },
//       { name: "John Foczy", score: 966, position: 12 },
//       { name: "Brajan Fish", score: 435, position: 13 },
//       { name: "tak dsa", score: 367, position: 14 },
//       { name: "no d", score: 367, position: 15 },
//       { name: "yes ed", score: 357, position: 16 },
//       { name: "yes ed", score: 337, position: 17 },
//       { name: "nie asd", score: 206, position: 18 },
//       { name: "nie asd", score: 156, position: 19 },
//       { name: "no d", score: 44, position: 20 },
//       { name: "tak dsa", score: 3766, position: 21 },
//       { name: "John Foczy", score: 966, position: 22 },
//       { name: "Brajan Fish", score: 435, position: 23 },
//       { name: "tak dsa", score: 367, position: 24 },
//       { name: "no d", score: 367, position: 25 },
//       { name: "yes ed", score: 357, position: 26 },
//       { name: "yes ed", score: 337, position: 27 },
//       { name: "nie asd", score: 206, position:28 },
//       { name: "nie asd", score: 156, position: 29 },
//       { name: "no d", score: 44, position: 30 },
//       { name: "tak dsa", score: 3766, position: 31 },
//       { name: "John Foczy", score: 966, position: 32 },
//       { name: "Brajan Fish", score: 435, position: 33 },
//       { name: "tak dsa", score: 367, position: 34 },
//       { name: "no d", score: 367, position: 35 },
//       { name: "yes ed", score: 357, position: 36 },
//       { name: "yes ed", score: 337, position: 37 },
//       { name: "nie asd", score: 206, position: 38 },
//       { name: "nie asd", score: 156, position: 39 },
//       { name: "no d", score: 44, position: 40 },
//     ],
//     comment:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum, sem cursus varius tristique, tortor sem placerat odio, sit amet convallis sem erat nec neque. Quisque at orci tempor, imperdiet urna quis, laoreet urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per ince. "
//   },
//   {
//     protocol: "Protokół nr 2",
//     players: [
//       { name: "John Foczy", score: 53, position: 1 },
//       { name: "Brajan Fish", score: 43, position: 2 },
//       { name: "no d", score: 34, position: 3 },
//       { name: "tak dsa", score: 33, position: 4 },
//       { name: "tak dsa", score: 30, position: 5 },
//       { name: "yes ed", score: 23.1, position: 6 },
//       { name: "no d", score: 13, position: 7 },
//       { name: "nie asd", score: 13, position: 8 },
//       { name: "yes ed", score: 3, position: 9 },
//       { name: "nie asd", score: 3, position: 10 },
//       { name: "nie asd", score: 3, position: 11 }
//     ],
//     comment:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum, sem cursus varius tristique, tortor sem placerat odio, sit amet convallis sem erat nec neque. Quisque at orci tempor, imperdiet urna quis, laoreet urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent mattis nec nibh id hendrerit. Vivamus convallis felis erat, et vestibulum lectus auctor ac. Nulla facilisi. Vestibulum tempus orci massa, vitae blandit nulla elementum in. In lobortis aliquam nulla, eu finibus odio ultrices a. In ante quam, molestie varius dolor et, semper commodo nulla. Phasellus ac est ante. "
//   }
// ];

export default (turnament, protocols) => {
  console.log("generatePDF()", turnament, protocols.length);

  var doc = new jsPDF();

  doc.addFileToVFS("PTSans.ttf", PTSans);
  doc.addFont("PTSans.ttf", "PTSans", "normal");

  var ttt2 = JSON.stringify(doc.getFontList());
  ttt2 = ttt2.replace("{", "");
  ttt2 = ttt2.replace("}", "");
  ttt2 = ttt2.split("],");
  doc.setFont("PTSans");

  for (var i = 0; i < protocols.length; i++) {
    function poComment() {
      const str = protocols[i].comment;
      //const str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce"
      const commentLength = str.length;
      const lineHeight = 7;
      const charInLine = 80;
      const headLineHeight = 50;
      const commentHeight =
        Math.ceil(commentLength / charInLine) * lineHeight + headLineHeight;
      return commentHeight + 10;
    }

    const playersLength = protocols[i].players.length;
    const playerHeight = 8;
    const bottomPosition = 260;

    function template() {
      doc.setFontSize(16);
      // doc.setFontType("bold");
      doc.text(turnament.name, 105, 20, null, null, "center");
      // doc.setFontType("light");
      doc.setFontSize(18);
      doc.text(protocols[i].protocol, 105, 35, null, null, "center");
      // doc.setFontType("normal");
      doc.setFontSize(15);
      doc.text(
        `${turnament.facility} ${turnament.date}`,
        105,
        280,
        null,
        null,
        "center"
      );
    }

    template();
    //doc.text(protocols[i].comment, 10, 40, );
    doc.setFontSize(15);
    var splitTitle = doc.splitTextToSize(protocols[i].comment, 180);

    doc.text(15, 50, splitTitle);

    function scoresHeadline(fromTop) {
      doc.setFontSize(15);
      // doc.setFontType("bold");
      doc.text("Miejsce", 32, fromTop);
      doc.text("Imie i nazwisko", 87, fromTop);
      doc.text("Punkty", 152, fromTop);
    }

    scoresHeadline(poComment());

    let indexReset = 0;
    let commentHeight = poComment();
    for (var index = 0; index < playersLength; index++) {
      indexReset++;
      const player = protocols[i].players[index];

      let position = 5 + commentHeight + indexReset * playerHeight;
      doc.setFontSize(14);
      // doc.setFontType("normal");
      doc.text(player.position.toString(), 41, position, null, null, "center");
      doc.text(player.name, 105, position, null, null, "center");
      doc.text(player.score.toString(), 160, position, null, null, "center");
      // doc.text(indexReset.toString(), 1, position)
      if (position > bottomPosition) {
        doc.addPage("l", "a4");
        template();

        indexReset = 0;
        commentHeight = 49;
        scoresHeadline(commentHeight + 3);
        // position = indexReset * playerHeight
      }
    }
    if (i < protocols.length - 1) {
      doc.addPage("l", "a4");
      //   doc.text(i.toString(), 20, 20);
      //   doc.text(protocols.length.toString(), 20, 50);
    }
  }

  doc.save(`${turnament.name}_komunikat.pdf`);
};
