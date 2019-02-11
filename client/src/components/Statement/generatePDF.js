import * as jsPDF from "jspdf";
import { PTSans } from "../../skins/PTSans";
import { PTSansBold } from "../../skins/PTSansBold";
import { PTSansItalic } from "../../skins/PTSansItalic";

export default (turnament, protocols) => {
  console.log("generatePDF()", turnament, protocols.length);

  var doc = new jsPDF();

  doc.addFileToVFS("PTSans.ttf", PTSans);
  doc.addFileToVFS("PTSansBold.ttf", PTSansBold);
  doc.addFileToVFS("PTSansItalic.ttf", PTSansItalic);
  doc.addFont("PTSans.ttf", "PTSans", "normal");
  doc.addFont("PTSansBold.ttf", "PTSans", "bold");
  doc.addFont("PTSansItalic.ttf", "PTSans", "italic");

  var ttt2 = JSON.stringify(doc.getFontList());
  ttt2 = ttt2.replace("{", "");
  ttt2 = ttt2.replace("}", "");
  ttt2 = ttt2.split("],");
  doc.setFont("PTSans", "normal");

  function formatNumber(n) {
    if (Number(n) === n && n % 1 !== 0) {
      return n.toFixed(2);
    } else {
      return n.toString();
    }
  }
  // formatNumber(12)
  function templateHead() {
    doc.setFontSize(14);
    // doc.setFontType("bold");
    doc.setFont("PTSans", "normal");
    doc.text(turnament.name, 105, 20, null, null, "center");
  }

  function templateFooter() {
    doc.setFont("PTSans", "normal");
    doc.setFontSize(14);
    doc.text(
      `${turnament.facility} ${turnament.date}`,
      105,
      280,
      null,
      null,
      "center"
    );
  }

  // doc.setFontType("bold");
  function titlePage() {
    doc.setFontSize(30);
    let promoter = turnament.promoter.name;
    promoter =
      "Bardzo Znana Organizacja Strzelecka Zrzeszajaca Wielu Utalentowanych Strzelców";
    const splitPromoter = doc.splitTextToSize(promoter, 180);
    doc.text(splitPromoter, 105, 60, "center");

    doc.setFontSize(25);
    doc.text("REZULTATY ZAWODÓW", 105, 120, "center");

    doc.setFontSize(40);
    let turnamentName = turnament.name;
    //turnamentName = "Bardzo Znana Organizacja Strzelecka Zrzeszajaca Wielu Utalentowanych Strzelców"
    const splitTurnament = doc.splitTextToSize(turnamentName, 180);
    doc.setFont("PTSans", "bold");
    doc.text(splitTurnament, 105, 170, "center");
    doc.setFont("PTSans", "normal");
    doc.setFontSize(20);
    doc.text(
      `${turnament.facility} ${turnament.date}`,
      105,
      280,
      null,
      null,
      "center"
    );

    doc.addPage("l", "a4");
  }

  function judges() {
    templateHead();

    doc.setFontSize(20);
    doc.text("OBSADA SĘDZIOWSKA", 10, 40);

    doc.setFontSize(16);
    doc.text("SĘDZIA GŁÓWNY:", 10, 55);
    doc.text(
      `${turnament.judgeMain.name ? turnament.judgeMain.name : ""} ${
        turnament.judgeMain.surname ? turnament.judgeMain.surname : ""
      } `,
      90,
      55
    );
    doc.text("SĘDZIA LICZĄCY:", 10, 70);
    doc.text(
      `${turnament.judgeCounting.name ? turnament.judgeCounting.name : ""} ${
        turnament.judgeCounting.surname ? turnament.judgeCounting.surname : ""
      } `,
      90,
      70
    );
    doc.text("SĘDZIA RTS:", 10, 85);
    doc.text(
      `${turnament.judgeRTS.name ? turnament.judgeRTS.name : ""} ${
        turnament.judgeRTS.surname ? turnament.judgeRTS.surname : ""
      } `,
      90,
      85
    );
    doc.text("OBSERWATOR PZSS:", 10, 100);
    doc.text(`${turnament.lzss ? turnament.lzss : ""} `, 90, 100);

    templateFooter();
    doc.addPage("l", "a4");
  }

  //titlePage();
  //judges();

  for (var i = 0; i < protocols.length; i++) {
    let description = protocols[i].description;
    let annotation = protocols[i].annotation;
    // description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce"
    const podescription = () => {
      const descriptionLength = description.length;
      const lineHeight = 7;
      const charInLine = 150;
      const headLineHeight = 50;
      const descriptionHeight =
        Math.ceil(descriptionLength / charInLine) * lineHeight + headLineHeight;
      return descriptionHeight + 10;
    };

    const playersLength = protocols[i].players.length;
    const playerHeight = 7.3;
    const bottomPosition = 260;

    const template = () => {
      templateHead();
      // doc.setFontType("light");
      doc.setFontSize(18);
      doc.setFont("PTSans", "bold");
      doc.text(protocols[i].protocol, 105, 35, null, null, "center");
      doc.setFont("PTSans", "normal");
      // doc.setFontType("normal");
      templateFooter();
    };

    template();

    doc.setFontSize(11);
    const splitDescription = doc.splitTextToSize(description, 180);
    doc.text(15, 50, splitDescription);

    const splitAnnotation = doc.splitTextToSize(annotation, 180);

    const scoresHeadline = fromTop => {
      doc.setDrawColor(0);
      doc.setFillColor(246, 246, 246);
      doc.rect(10, fromTop - 5, 185, playerHeight, "F");
      doc.setFontSize(12);
      doc.setFont("PTSans", "bold");
      // doc.setFontType("bold");
      doc.text("Miejsce", 13, fromTop);
      doc.text("Nr startowy", 32, fromTop);
      doc.text("Imię i nazwisko", 70, fromTop);
      doc.text("Broń", 120, fromTop);
      doc.text("Luneta", 150, fromTop);
      doc.text("Punkty", 179, fromTop);
    };

    scoresHeadline(podescription());

    let indexReset = 0;
    let descriptionHeight = podescription();
    let lastPosition = 0;
    for (var index = 0; index < playersLength; index++) {
      indexReset++;
      const player = protocols[i].players[index];

      let position = 5 + descriptionHeight + indexReset * playerHeight;
      doc.setFontSize(13);
      doc.setFont("PTSans", "bold");
      // doc.setFontType("normal");

      doc.text(player.position.toString(), 20, position, null, null, "center");
      doc.setFont("PTSans", "normal");
      doc.setFontSize(11);
      doc.text(player.number.toString(), 43, position, null, null, "center");
      doc.text(player.name, 86, position, null, null, "center");
      doc.text(player.gun, 125, position, null, null, "center");
      doc.text(player.scope, 157, position, null, null, "center");
      //doc.line(15, position + 2, 190, position + 2);

      if (index % 2 === 0) {
        doc.setDrawColor(0);
        doc.setFillColor(246, 246, 246);
        doc.rect(15, position + 2, 176, playerHeight, "F");
      }

      //doc.rect(100, 30, 10, 10, 'F');

      doc.setFontSize(13);
      doc.setFont("PTSans", "bold");
      doc.text(formatNumber(player.score), 186, position, null, null, "center");
      lastPosition = position;

      // doc.text(indexReset.toString(), 1, position)
      if (position > bottomPosition) {
        doc.addPage("l", "a4");
        template();

        indexReset = 0;
        descriptionHeight = 49;
        scoresHeadline(descriptionHeight + 3);
        // position = indexReset * playerHeight
      }

      if (index === playersLength - 1) {
        const annotation = () => {
          doc.setFontSize(11);
          doc.setFont("PTSans", "italic");
          doc.text(15, position + 20, splitAnnotation);
        };

        if (position > bottomPosition - 50) {
          doc.addPage("l", "a4");

          position = 10;
          annotation();
          doc.text(position.toString(), 10, 10);
        } else {
          annotation();
        }
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
