import * as jsPDF from "jspdf";
//uzywa


const turnament = {"finished":true,"www":true,"_id":"5c277e7556e93f0f20c66c9b","name":"Mistrzostwa","date":"2018-12-31","logo":"","promoter":{"_id":"5c264f80f7c9c40c9850bcee","name":"Moja organizacja","email":"a@a.com","password":"$2a$10$4VSC4esi8lgSN7p4TT0RAuYkv75iHxCsKLanQm3PXMfuKCIrck67a","adres":"Lubartów","logo":"","www":"www.oepasdfasd.pl","rola":"promoter","date":"2018-12-28T16:29:52.539Z","__v":0},"facility":"Pod wiatą","judgeMain":{"_id":"5c239460f77d1903a0ffd1c7","name":"Antonia","surname":"Wojtczak","judgeClass":"A-","__v":0},"lzss":"ggf","judgeCounting":{"_id":"5c228653ffa9152320ec57b1","name":"Tomasz","surname":"Polak","judgeClass":"B+","__v":0},"judgeRTS":{"_id":"5c239511858da03bc03d3478","name":"Januszek","surname":"Markowiak","judgeClass":"A","__v":0},"tech":"asdf","competitions":[{"_id":"5c2e426e2a3d211fcc00f1c0","name":"1500m","judge":{"_id":"5c228653ffa9152320ec57b1","name":"Tomasz","surname":"Polak","judgeClass":"B+","__v":0}},{"_id":"5c2e427f2a3d211fcc00f1c1","name":"500m","judge":{"_id":"5c224f6ee9915f2670e5f9ae","name":"Sylwia","surname":"Fibarro","judgeClass":"A+","__v":0}},{"_id":"5c3dcfe14a2ed31b6c8df8a1","name":"uuuu","judge":{"_id":"5c224f69e9915f2670e5f9ad","name":"Krzysztof","surname":"Figurantes","judgeClass":"B-","__v":0}}],"__v":0,"sponsor1":null,"sponsor2":null,"sponsor3":null,"promoterName":"Moja organizacja"}

const protocols = [{"protocol":"Protokół Zbiorczy","players":[{"name":"Marlena Smith","number":"23434","gun":"Barret","scope":"S&B pmII","score":33,"position":1},{"name":"Piotr Numski","number":"","gun":"Barret","scope":"S&B pmII","score":28,"position":2},{"name":"Daniel Rogaś","number":"","gun":"Barret","scope":"S&B pmII","score":11,"position":3},{"name":"Michal Nowacz","number":"65","gun":"Barret","scope":"S&B pmII","score":10,"position":4},{"name":"Milena Pasek","number":"345","gun":"Barret","scope":"S&B pmII","score":10,"position":5},{"name":"Stanislaw Prawski","number":"222","gun":"Barret","scope":"S&B pmII","score":9,"position":6},{"name":"Tomasz Praczyk","number":"","gun":"Barret","scope":"S&B pmII","score":9,"position":7},{"name":"Jerry Pistolet","number":"","gun":"Barret","scope":"S&B pmII","score":9,"position":8},{"name":"Mariusz Pilka","number":"","gun":"Barret","scope":"S&B pmII","score":8,"position":9},{"name":"Janusz Nikt","number":"","gun":"Barret","scope":"S&B pmII","score":6,"position":10},{"name":"Bartłomiej Alfons","number":"inny","gun":"Barret","scope":"S&B pmII","score":6,"position":11},{"name":"Wolfgang Mozart","number":"","gun":"Barret","scope":"S&B pmII","score":5,"position":12},{"name":"Miroslaw Mruk","number":"","gun":"Barret","scope":"S&B pmII","score":5,"position":13},{"name":"Tomasz Molga","number":"345","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"RODO","number":"ddd","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"RODO","number":"dasdf","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"RODO","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"RODO","number":"333","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Zbigniew ed","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"RODO","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"RODO","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Sylwia Brown","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"RODO","number":"22222","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Franciszek Jeziorowski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Przemysław Gregorczyk","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Grzegorz Kowalewski","number":"345","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"RODO","number":"222222","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"RODO","number":"234","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"RODO","number":"asdfsdf","gun":"gun","scope":"scope","score":0,"position":29},{"name":"RODO","number":"dfsdfdd","gun":"gun","scope":"scope","score":0,"position":30}],"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis a justo sodies sed. ","annotation":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis a justo sodales hendrerit sed sed sapien. Proin ac posuere nunc. Sed id nisl egestas, molestie lacus at, malesuada orci. Quisque at leo ultricies, tristique tellus a, consectetur nisl. Fusce sed varius elit. Fusce ultricies sed. "},{"protocol":"Protokół nr 1","players":[{"name":"Piotr Numski","number":"","gun":"Barret","scope":"S&B pmII","score":6,"position":1},{"name":"Daniel Rogaś","number":"","gun":"Barret","scope":"S&B pmII","score":4,"position":2},{"name":"Stanislaw Prawski","number":"222","gun":"Barret","scope":"S&B pmII","score":3,"position":3},{"name":"Michal Nowacz","number":"65","gun":"Barret","scope":"S&B pmII","score":3,"position":4},{"name":"Marlena Smith","number":"23434","gun":"Barret","scope":"S&B pmII","score":3,"position":5},{"name":"Tomasz Praczyk","number":"","gun":"Barret","scope":"S&B pmII","score":3,"position":6},{"name":"Jerry Pistolet","number":"","gun":"Barret","scope":"S&B pmII","score":3,"position":7},{"name":"Mariusz Pilka","number":"","gun":"Barret","scope":"S&B pmII","score":3,"position":8},{"name":"Bartłomiej Alfons","number":"inny","gun":"Barret","scope":"S&B pmII","score":3,"position":9},{"name":"Milena Pasek","number":"345","gun":"Barret","scope":"S&B pmII","score":2,"position":10},{"name":"Janusz Nikt","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Wolfgang Mozart","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Miroslaw Mruk","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"Tomasz Molga","number":"345","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"RODO","number":"ddd","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"RODO","number":"dasdf","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"RODO","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"RODO","number":"333","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Zbigniew ed","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"RODO","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"RODO","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Sylwia Brown","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"RODO","number":"22222","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Franciszek Jeziorowski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Przemysław Gregorczyk","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Grzegorz Kowalewski","number":"345","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"RODO","number":"222222","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"RODO","number":"234","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"RODO","number":"asdfsdf","gun":"gun","scope":"scope","score":0,"position":29},{"name":"RODO","number":"dfsdfdd","gun":"gun","scope":"scope","score":0,"position":30}],"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis a justo sodales hendrerit sed sed sapien. Proin ac posuere nunc. Sed id nisl egestas, molestie lacus at, malesuada orci. Quisque at leo ultricies, tristique tellus a, consectetur nisl. Fusce sed varius elit. Fusce ultricies sed. ","annotation":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis a justo sodales hendrerit sed sed sapien. Proin ac posuere nunc. Sed id nisl egestas, molestie lacus at, malesuada orci. Quisque at leo ultricies, tristique tellus a, consectetur nisl. Fusce sed varius elit. Fusce ultricies sed. "},{"protocol":"Protokół nr 2","players":[{"name":"Piotr Numski","number":"","gun":"Barret","scope":"S&B pmII","score":18,"position":1},{"name":"Michal Nowacz","number":"65","gun":"Barret","scope":"S&B pmII","score":5,"position":2},{"name":"Milena Pasek","number":"345","gun":"Barret","scope":"S&B pmII","score":5,"position":3},{"name":"Stanislaw Prawski","number":"222","gun":"Barret","scope":"S&B pmII","score":3,"position":4},{"name":"Daniel Rogaś","number":"","gun":"Barret","scope":"S&B pmII","score":3,"position":5},{"name":"Tomasz Praczyk","number":"","gun":"Barret","scope":"S&B pmII","score":3,"position":6},{"name":"Jerry Pistolet","number":"","gun":"Barret","scope":"S&B pmII","score":3,"position":7},{"name":"Mariusz Pilka","number":"","gun":"Barret","scope":"S&B pmII","score":2,"position":8},{"name":"Janusz Nikt","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":9},{"name":"Wolfgang Mozart","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":10},{"name":"Miroslaw Mruk","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Tomasz Molga","number":"345","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Marlena Smith","number":"23434","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"RODO","number":"ddd","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"RODO","number":"dasdf","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"RODO","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"RODO","number":"333","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"Zbigniew ed","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"RODO","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"RODO","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"Sylwia Brown","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"RODO","number":"22222","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"Bartłomiej Alfons","number":"inny","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Franciszek Jeziorowski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Przemysław Gregorczyk","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Grzegorz Kowalewski","number":"345","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"RODO","number":"222222","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"RODO","number":"234","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"RODO","number":"asdfsdf","gun":"gun","scope":"scope","score":0,"position":29},{"name":"RODO","number":"dfsdfdd","gun":"gun","scope":"scope","score":0,"position":30}],"description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis a justo sodales hendrerit sed sed sapien. Proin ac posuere nunc. Sed id nisl egestas, molestie lacus at, malesuada orci. Quisque at leo ultricies, tristique tellus a, consectetur nisl. Fusce sed varius elit. Fusce ultricies sed. ","annotation":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a turpis a justo sodales hendrerit sed sed sapien. Proin ac posuere nunc. Sed id nisl egestas, molestie lacus at, malesuada orci. Quisque at leo ultricies, tristique tellus a, consectetur nisl. Fusce sed varius elit. Fusce ultricies sed. "}]

var doc = new jsPDF();


function formatNumber(n) {
  if (Number(n) === n && n % 1 !== 0) {
    return n.toFixed(2);
  } else {
    return n.toString();
  }
}

const signature = (pos) => {
    doc.setLineWidth(0.3);
    doc.setLineDash([1])

      doc.setFontSize(12);
      doc.setFont("PTSans", "normal");
  doc.text("SĘDZIA GŁÓWNY", 150, pos + 15, null, null, "center");
  doc.setFontSize(14.5);
  doc.text(
    `${turnament.judgeMain.name ? turnament.judgeMain.name : ""} ${
      turnament.judgeMain.surname ? turnament.judgeMain.surname : ""
    } `,
150, pos + 22, null, null, "center"
  );

    doc.line(110,pos+50,190,pos+50)
     doc.text("(podpis sędziego)", 150, pos + 56, null, null, "center");
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

titlePage();
judges();

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

      if (position > bottomPosition - splitAnnotation.length * 10 - 50) {
        doc.addPage("l", "a4");

        position = 10;
        annotation();
        signature(10 + position + splitAnnotation.length * 10)

      } else {
        annotation();
        signature(10 + position + splitAnnotation.length * 10)
        //doc.text((position + splitAnnotation.length * 10).toString(), 10, 10);
      }
    }
  }
  if (i < protocols.length - 1) {
    doc.addPage("l", "a4");
    //   doc.text(i.toString(), 20, 20);
    //   doc.text(protocols.length.toString(), 20, 50);
  }
}
