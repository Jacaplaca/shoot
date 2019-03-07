import * as jsPDF from "jspdf";
//uzywa

const turnament = {"finished":false,"www":false,"factor":true,"_id":"5c73dc894027293a98a93bef","name":"Nie kasować","date":"2019-02-28","logo":"","promoter":{"_id":"5c73dbf74027293a98a93bee","name":"Nie kasować","email":"dziewanowski@gmail.com","password":"$2a$10$LGQMAmbQvOzjSfe.xhWOleKZ5ZInLREkE9/cgS4HGaUok3tARc1xK","adres":"Nie kasować","logo":"images/480x620_1551096259231_chickencoloringpages02_zqyit.gif","www":"Nie kasować","rola":"promoter","date":"2019-02-25T12:13:43.964Z","__v":0},"facility":"Nie kasować","judgeMain":{"_id":"5c224f6ee9915f2670e5f9ae","name":"Sylwia","surname":"Fibarro","judgeClass":"A+","__v":0},"lzss":"Jan Nowak","judgeCounting":{"_id":"5c228653ffa9152320ec57b1","name":"Tomasz","surname":"Polak","judgeClass":"B+","__v":0},"judgeRTS":{"_id":"5c237bd3d8a46d187827a0f7","name":"John","surname":"Brown","judgeClass":"C+","__v":0},"tech":"Zbigniew Kowalski","sponsor1":"","sponsor2":"","sponsor3":"","competitions":[{"_id":"5c73decb4027293a98a93bf3","name":"Ruchomy cel","judge":{"_id":"5c237bd3d8a46d187827a0f7","name":"John","surname":"Brown","judgeClass":"C+","__v":0}},{"_id":"5c73def54027293a98a93bf4","name":"Bieg i strzelanie","judge":{"_id":"5c239460f77d1903a0ffd1c7","name":"Antonia","surname":"Wojtczak","judgeClass":"A-","__v":0}},{"_id":"5c73df0b4027293a98a93bf5","name":"Likwidacja","judge":{"_id":"5c3e16f64a2ed31b6c8df8a9","name":"Wyznacza","surname":"Organizator","judgeClass":"A","__v":0}}],"__v":0,"promoterName":"Nie kasować"}

const protocols = [{"protocol":"Protokół Zbiorczy","players":[{"name":"Jan Spak (Pistols)","klasa":"Pistols","number":"14","gun":"pistolet","scope":"22x","score":232.66666666666666,"position":1},{"name":"Krzysztof Gama (Pistols)","klasa":"Pistols","number":"10","gun":"pistolet","scope":"22x","score":224.9488752556237,"position":2},{"name":"Piotr Drób (Tactical)","klasa":"Tactical","number":"18","gun":"pistolet","scope":"22x","score":209.84405458089668,"position":3},{"name":"Bartek Nowak (Sniper)","klasa":"Sniper","number":"8","gun":"pistolet","scope":"22x","score":208.05128205128204,"position":4},{"name":"Maria Antonow (Tactical)","klasa":"Tactical","number":"1","gun":"Pistolet","scope":"Medium","score":188.55950812472548,"position":5},{"name":"Paweł Fik (Tactical)","klasa":"Tactical","number":"13","gun":"pistolet","scope":"22x","score":180.2721088435374,"position":6},{"name":"Marcin Flak (Sniper)","klasa":"Sniper","number":"16","gun":"pistolet","scope":"22x","score":178.17016317016316,"position":7},{"name":"Mariusz Krempolinski (Pistols)","klasa":"Pistols","number":"6","gun":"Knife","scope":"Super","score":177.1428571428571,"position":8},{"name":"Tomasz Kowal (Tactical)","klasa":"Tactical","number":"7","gun":"pistolet","scope":"22x","score":161.0585492938434,"position":9},{"name":"Filip Smith (Sniper)","klasa":"Sniper","number":"4","gun":"Proca","scope":"Max","score":155.87213599408722,"position":10},{"name":"Urszula Masserrini (Sniper)","klasa":"Sniper","number":"5","gun":"Dzida","scope":"Brak","score":155.5102657004831,"position":11},{"name":"Jeremi Przyboramski (Tactical)","klasa":"Tactical","number":"3","gun":"Karabin","scope":"Weak","score":150.72786690433747,"position":12},{"name":"Michał Pram (Sniper)","klasa":"Sniper","number":"12","gun":"pistolet","scope":"22x","score":143.31092538759688,"position":13},{"name":"Robert Pik (Pistols)","klasa":"Pistols","number":"9","gun":"pistolet","scope":"22x","score":136.78538081899427,"position":14},{"name":"Filip Greg (Pistols)","klasa":"Pistols","number":"15","gun":"pistolet","scope":"22x","score":131.42225497420782,"position":15},{"name":"Tomasz Plama (Tactical)","klasa":"Tactical","number":"17","gun":"pistolet","scope":"22x","score":127.25907725907726,"position":16},{"name":"Grzegorz Sigma (Sniper)","klasa":"Sniper","number":"11","gun":"pistolet","scope":"22x","score":124.11924119241192,"position":17},{"name":"Janek Blazkowitz (Sniper)","klasa":"Sniper","number":"2","gun":"Biała","scope":"Mocna","score":120.0982800982801,"position":18}],"description":"Regarding the last to lines of your code - when you go back to a Date object using toDate(), you are giving up the behavior of moment.js and going back to JavaScript's behavior. A JavaScript Date object will always be printed in the local time zone of the computer it's running on. There's nothing moment.js can do about that.Regarding the last to lines of your code - when you go back to a Date object using toDate(), you are giving up the behavior of moment.js and going back to JavaScript's behavi","annotation":"Regarding the last to lines of your code - when you go back to a Date object using toDate(), you are giving up the behavior of moment.js and going back to JavaScript's behavior. A JavaScript Date object will always be printed in the local time zone of the computer it's running on. There's nothing moment.js can do about that.Regarding the last to lines of your code - when you go back to a Date object using toDate(), you are giving up the behavior of moment.js and going back to JavaScript's behavi"},{"protocol":"Protokół nr 1","players":[{"name":"Mariusz Krempolinski (Pistols)","klasa":"Pistols","number":"6","gun":"Knife","scope":"Super","score":100,"position":1},{"name":"Paweł Fik (Tactical)","klasa":"Tactical","number":"13","gun":"pistolet","scope":"22x","score":96.93877551020408,"position":2},{"name":"Filip Greg (Pistols)","klasa":"Pistols","number":"15","gun":"pistolet","scope":"22x","score":82.6086956521739,"position":3},{"name":"Filip Smith (Sniper)","klasa":"Sniper","number":"4","gun":"Proca","scope":"Max","score":77.23577235772358,"position":4},{"name":"Jan Spak (Pistols)","klasa":"Pistols","number":"14","gun":"pistolet","scope":"22x","score":76,"position":5},{"name":"Bartek Nowak (Sniper)","klasa":"Sniper","number":"8","gun":"pistolet","scope":"22x","score":76,"position":6},{"name":"Piotr Drób (Tactical)","klasa":"Tactical","number":"18","gun":"pistolet","scope":"22x","score":70.37037037037037,"position":7},{"name":"Janek Blazkowitz (Sniper)","klasa":"Sniper","number":"2","gun":"Biała","scope":"Mocna","score":64.1891891891892,"position":8},{"name":"Robert Pik (Pistols)","klasa":"Pistols","number":"9","gun":"pistolet","scope":"22x","score":62.091503267973856,"position":9},{"name":"Jeremi Przyboramski (Tactical)","klasa":"Tactical","number":"3","gun":"Karabin","scope":"Weak","score":62.091503267973856,"position":10},{"name":"Marcin Flak (Sniper)","klasa":"Sniper","number":"16","gun":"pistolet","scope":"22x","score":60.89743589743589,"position":11},{"name":"Urszula Masserrini (Sniper)","klasa":"Sniper","number":"5","gun":"Dzida","scope":"Brak","score":59.375,"position":12},{"name":"Krzysztof Gama (Pistols)","klasa":"Pistols","number":"10","gun":"pistolet","scope":"22x","score":58.282208588957054,"position":13},{"name":"Tomasz Kowal (Tactical)","klasa":"Tactical","number":"7","gun":"pistolet","scope":"22x","score":50.80213903743316,"position":14},{"name":"Tomasz Plama (Tactical)","klasa":"Tactical","number":"17","gun":"pistolet","scope":"22x","score":47.97979797979798,"position":15},{"name":"Maria Antonow (Tactical)","klasa":"Tactical","number":"1","gun":"Pistolet","scope":"Medium","score":47.97979797979798,"position":16},{"name":"Grzegorz Sigma (Sniper)","klasa":"Sniper","number":"11","gun":"pistolet","scope":"22x","score":46.34146341463415,"position":17},{"name":"Michał Pram (Sniper)","klasa":"Sniper","number":"12","gun":"pistolet","scope":"22x","score":37.109375,"position":18}],"description":"Regarding the last to lines of your code - when you go back to a Date object using toDate(), you are giving up the behavior of moment.js and going back to JavaScript's behavior. A JavaScript Date object will always be printed in the local time zone of the computer it's running on. There's nothing moment.js can do about that.Regarding the last to lines of your code - when you go back to a Date object using toDate(), you are giving up the behavior of moment.js and going back to JavaScript's behavi","annotation":"Regarding the last to lines of your code - when you go back to a Date object using toDate(), you are giving up the behavior of moment.js and going back to JavaScript's behavior. A JavaScript Date object will always be printed in the local time zone of the computer it's running on. There's nothing moment.js can do about that.Regarding the last to lines of your code - when you go back to a Date object using toDate(), you are giving up the behavior of moment.js and going back to JavaScript's behavi"}]


  var doc = new jsPDF();
// doc.addFileToVFS("PTSans.ttf", PTSans);
//   doc.addFileToVFS("PTSansBold.ttf", PTSansBold);
//   doc.addFileToVFS("PTSansItalic.ttf", PTSansItalic);
//   doc.addFont("PTSans.ttf", "PTSans", "normal");
//   doc.addFont("PTSansBold.ttf", "PTSans", "bold");
//   doc.addFont("PTSansItalic.ttf", "PTSans", "italic");
const pageOrientation = 'landscape'
// const pageProperties = doc.addPage('a4', 'portrait');

  var ttt2 = JSON.stringify(doc.getFontList());
  ttt2 = ttt2.replace("{", "");
  ttt2 = ttt2.replace("}", "");
  ttt2 = ttt2.split("],");
  doc.setFont("PTSans", "normal");

  const midPage = orientation => {
    //   let point = 0
      if (orientation === 'portrait') {
          return 105
      } else if (orientation === 'landscape') {
          return 148.5
      }

  }

    const bottomPage = orientation => {
    //   let point = 0
      if (orientation === 'portrait') {
          return 286
      } else if (orientation === 'landscape') {
          return 199
      }

  }

  function isClass() {
    const withClass = protocols[0].players.filter(x => x.klasa);
    if (withClass.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function formatNumber(n) {
    if (Number(n) === n && n % 1 !== 0) {
      return n.toFixed(2);
    } else {
      return n.toString();
    }
  }

  const signature = pos => {
    doc.setLineWidth(0.3);
    doc.setLineDash([1]);

    doc.setFontSize(12);
    doc.setFont("PTSans", "normal");
    doc.text("SĘDZIA GŁÓWNY", 150, pos + 15, null, null, "center");
    doc.setFontSize(14.5);
    doc.text(
      `${turnament.judgeMain.name ? turnament.judgeMain.name : ""} ${
        turnament.judgeMain.surname ? turnament.judgeMain.surname : ""
      } `,
      150,
      pos + 22,
      null,
      null,
      "center"
    );

    doc.line(110, pos + 50, 190, pos + 50);
    doc.setFontSize(12);
    doc.text("(podpis sędziego)", 150, pos + 56, null, null, "center");
  };
  // formatNumber(12)
  function templateHead(orientation) {
    doc.setFontSize(14);
    // doc.setFontType("bold");
    doc.setFont("PTSans", "normal");
    doc.text(turnament.name, midPage(orientation), 20, null, null, "center");
  }

  function templateFooter(orientation) {
    doc.setFont("PTSans", "normal");
    doc.setFontSize(8.5);
    doc.text(
      "Wydruk z aplikacji SHOOTER STATS - portalstrzelecki.pl wszelkie prawa zastrzeżone",
      midPage(orientation),
      bottomPage(orientation),
      null,
      null,
      "center"
    );
    doc.setFontSize(14);
    doc.text(
      `${turnament.facility} ${turnament.date}`,
      midPage(orientation),
      bottomPage(orientation)-6,
      null,
      null,
      "center"
    );
  }

  // doc.setFontType("bold");
  function titlePage() {
    doc.setFontSize(30);
    let promoter = turnament.promoter.name;
    // promoter =
    //   "Bardzo Znana Organizacja Strzelecka Zrzeszajaca Wielu Utalentowanych Strzelców";
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

    doc.addPage('a4', 'portrait');
  }

  function judges(orientation) {
    templateHead(orientation);

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

    templateFooter(orientation);
   doc.addPage('a4', pageOrientation);
  }

//   titlePage();
//   judges("portrait");

  for (var i = 0; i < protocols.length; i++) {
    let description = protocols[i].description;
    let annotation = protocols[i].annotation;
    // description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce"
    const podescription = () => {
      const descriptionLength = description.length;
      const lineHeight = 7;
      const charInLine = 220;
      const headLineHeight = 50;
      const descriptionHeight =
        Math.ceil(descriptionLength / charInLine) * lineHeight + headLineHeight;
      return descriptionHeight + 10;
    };

    const playersLength = protocols[i].players.length;
    const playerHeight = 7.3;
    // const bottomPosition = 260;
    const bottomPosition = 177;

    const template = (orientation) => {
      templateHead(orientation);
      // doc.setFontType("light");
      doc.setFontSize(18);
      doc.setFont("PTSans", "bold");
      doc.text(protocols[i].protocol, 147.5, 35, null, null, "center");
      doc.setFont("PTSans", "normal");
      // doc.setFontType("normal");
      templateFooter(orientation);
    };

    template("landscape");

    doc.setFontSize(11);
    const splitDescription = doc.splitTextToSize(description, 265);
    doc.text(15, 50, splitDescription);

    const splitAnnotation = doc.splitTextToSize(annotation, 265);

    const scoresHeadline = fromTop => {
      doc.setDrawColor(0);
      doc.setFillColor(246, 246, 246);
      doc.rect(10, fromTop - 5, 270, playerHeight, "F");
      doc.setFontSize(12);
      doc.setFont("PTSans", "bold");
      // doc.setFontType("bold");
      doc.text("Miejsce", 13, fromTop);
      doc.text("Nr startowy", 32, fromTop);
      doc.text(
        `Imię i nazwisko${isClass() ? " (klasa)" : ""}`,
        120,
        fromTop,
        null,
        null,
        "center"
      );
      doc.text("Broń", 195, fromTop);
      doc.text("Luneta", 225, fromTop);
      doc.text("Punkty", 260, fromTop);
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
      doc.setFontSize(10.5);
      doc.text(player.number.toString(), 43, position, null, null, "center");
      doc.text(player.name, 120, position, null, null, "center");
      doc.text(player.gun, 200, position, null, null, "center");
      doc.text(player.scope, 232, position, null, null, "center");
      //doc.line(15, position + 2, 190, position + 2);


        doc.setDrawColor(0);
        doc.setFillColor(220, 220, 220);
        doc.rect(10, position + 2, 270, 0.1, "F");


      //doc.rect(100, 30, 10, 10, 'F');

      doc.setFontSize(12);
      doc.setFont("PTSans", "bold");
      doc.text(formatNumber(player.score), 266, position, null, null, "center");
      lastPosition = position;

      // doc.text(indexReset.toString(), 1, position)
      if (position > bottomPosition) {
        doc.addPage('a4', pageOrientation);
        template('landscape');

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

        if (position > bottomPosition - splitAnnotation.length * 10 - 50) {
          doc.addPage('a4', pageOrientation);
          templateHead("landscape");
          templateFooter("landscape");
          position = 10;
          annotation();
          signature(10 + position + splitAnnotation.length * 10);
        } else {
          annotation();
          signature(10 + position + splitAnnotation.length * 10);
          //doc.text((position + splitAnnotation.length * 10).toString(), 10, 10);
        }
      }
    }
    if (i < protocols.length - 1) {
      doc.addPage('a4', pageOrientation);
      //   doc.text(i.toString(), 20, 20);
      //   doc.text(protocols.length.toString(), 20, 50);
    }
  }
