import * as jsPDF from "jspdf";
//uzywa


const turnament = {"finished":true,"www":true,"_id":"5c277e7556e93f0f20c66c9b","name":"Mistrzostwa","date":"2018-12-31","logo":"","promoter":{"_id":"5c264f80f7c9c40c9850bcee","name":"Moja organizacja","email":"a@a.com","password":"$2a$10$4VSC4esi8lgSN7p4TT0RAuYkv75iHxCsKLanQm3PXMfuKCIrck67a","adres":"Lubartów","logo":"","www":"www.oepasdfasd.pl","rola":"promoter","date":"2018-12-28T16:29:52.539Z","__v":0},"facility":"Pod wiatą","judgeMain":{"_id":"5c239460f77d1903a0ffd1c7","name":"Antonia","surname":"Wojtczak","judgeClass":"A-","__v":0},"lzss":"ggf","judgeCounting":{"_id":"5c228653ffa9152320ec57b1","name":"Tomasz","surname":"Polak","judgeClass":"B+","__v":0},"judgeRTS":{"_id":"5c239511858da03bc03d3478","name":"Januszek","surname":"Markowiak","judgeClass":"A","__v":0},"tech":"asdf","competitions":[{"_id":"5c2e426e2a3d211fcc00f1c0","name":"1500m","judge":{"_id":"5c228653ffa9152320ec57b1","name":"Tomasz","surname":"Polak","judgeClass":"B+","__v":0}},{"_id":"5c2e427f2a3d211fcc00f1c1","name":"500m","judge":{"_id":"5c224f6ee9915f2670e5f9ae","name":"Sylwia","surname":"Fibarro","judgeClass":"A+","__v":0}},{"_id":"5c3dcfe14a2ed31b6c8df8a1","name":"uuuu","judge":{"_id":"5c224f69e9915f2670e5f9ad","name":"Krzysztof","surname":"Figurantes","judgeClass":"B-","__v":0}}],"__v":0,"sponsor1":null,"sponsor2":null,"sponsor3":null,"promoterName":"Moja organizacja"}

const protocols = [{"protocol":"Protokół Zbiorczy","players":[{"name":"Bartłomiej Alfons","number":"23fas","gun":"Barret","scope":"S&B pmII","score":3,"position":1},{"name":"Marlena Smith","number":"kjasdf","gun":"Barret","scope":"S&B pmII","score":0,"position":2},{"name":"Daniel Rogaś","number":"lkasdjf","gun":"Barret","scope":"S&B pmII","score":0,"position":3},{"name":"Tomasz Praczyk","number":"g-02w","gun":"Barret","scope":"S&B pmII","score":0,"position":4},{"name":"Jerry Pistolet","number":"gsadf","gun":"Barret","scope":"S&B pmII","score":0,"position":5},{"name":"Mariusz Pilka","number":"lkafsh","gun":"Barret","scope":"S&B pmII","score":0,"position":6},{"name":"Piotr Numski","number":"gfds","gun":"Barret","scope":"S&B pmII","score":0,"position":7},{"name":"Jan Matowicz","number":"jnvalk","gun":"Barret","scope":"S&B pmII","score":0,"position":8},{"name":"Łukasz Lewski","number":"lksdjf","gun":"Barret","scope":"S&B pmII","score":0,"position":9},{"name":"Kamil Krzysztoszowski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":10},{"name":"Karol Hoplicki","number":"fasd","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Zbigniew ed","number":"gggds323","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Marian dsa","number":"gf3eA","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"Zenon d","number":"LKASJD03","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"Sylwia Brown","number":"lkjsadf","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"Janusz asd","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"Franciszek Jeziorowski","number":"klsajdf","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"Przemysław Gregorczyk","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Grzegorz Kowalewski","number":"klsdfklio","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"Marceli Krzysztoszek","number":"lsajdf93fs","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"Wolfgang Mozart","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Miroslaw Mruk","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"Milena Pasek","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Michal Nowacz","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Janusz Nikt","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Tomasz Molga","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"Stanislaw Prawski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"Filip Klap","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"yes ed","number":"43","gun":"Barret","scope":"S&B pmII","score":0,"position":29},{"name":"tak dsa","number":"e23","gun":"Barret","scope":"S&B pmII","score":0,"position":30},{"name":"nie asd","number":"23das","gun":"Barret","scope":"S&B pmII","score":0,"position":31},{"name":"yes ed","number":"sfd","gun":"Barret","scope":"S&B pmII","score":0,"position":32},{"name":"no d","number":"sfd2354","gun":"Barret","scope":"S&B pmII","score":0,"position":33},{"name":"tak dsa","number":"1233","gun":"Barret","scope":"S&B pmII","score":0,"position":34},{"name":"nie asd","number":"fas32","gun":"Barret","scope":"S&B pmII","score":0,"position":35},{"name":"no d","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":36},{"name":"Brajan Fish","number":"2","gun":"gun","scope":"scope","score":0,"position":37},{"name":"John Foczy","number":"1","gun":"gun","scope":"scope","score":0,"position":38}],"description":"sdfasdfsadf sdf df sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad ","annotation":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsa"},{"protocol":"Protokół nr 1","players":[{"name":"Marlena Smith","number":"kjasdf","gun":"Barret","scope":"S&B pmII","score":0,"position":1},{"name":"Daniel Rogaś","number":"lkasdjf","gun":"Barret","scope":"S&B pmII","score":0,"position":2},{"name":"Tomasz Praczyk","number":"g-02w","gun":"Barret","scope":"S&B pmII","score":0,"position":3},{"name":"Jerry Pistolet","number":"gsadf","gun":"Barret","scope":"S&B pmII","score":0,"position":4},{"name":"Mariusz Pilka","number":"lkafsh","gun":"Barret","scope":"S&B pmII","score":0,"position":5},{"name":"Piotr Numski","number":"gfds","gun":"Barret","scope":"S&B pmII","score":0,"position":6},{"name":"Jan Matowicz","number":"jnvalk","gun":"Barret","scope":"S&B pmII","score":0,"position":7},{"name":"Łukasz Lewski","number":"lksdjf","gun":"Barret","scope":"S&B pmII","score":0,"position":8},{"name":"Kamil Krzysztoszowski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":9},{"name":"Karol Hoplicki","number":"fasd","gun":"Barret","scope":"S&B pmII","score":0,"position":10},{"name":"Zbigniew ed","number":"gggds323","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Marian dsa","number":"gf3eA","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Zenon d","number":"LKASJD03","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"Sylwia Brown","number":"lkjsadf","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"Janusz asd","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"Bartłomiej Alfons","number":"23fas","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"Franciszek Jeziorowski","number":"klsajdf","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"Przemysław Gregorczyk","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Grzegorz Kowalewski","number":"klsdfklio","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"Marceli Krzysztoszek","number":"lsajdf93fs","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"Wolfgang Mozart","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Miroslaw Mruk","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"Milena Pasek","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Michal Nowacz","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Janusz Nikt","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Tomasz Molga","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"Stanislaw Prawski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"Filip Klap","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"yes ed","number":"43","gun":"Barret","scope":"S&B pmII","score":0,"position":29},{"name":"tak dsa","number":"e23","gun":"Barret","scope":"S&B pmII","score":0,"position":30},{"name":"nie asd","number":"23das","gun":"Barret","scope":"S&B pmII","score":0,"position":31},{"name":"yes ed","number":"sfd","gun":"Barret","scope":"S&B pmII","score":0,"position":32},{"name":"no d","number":"sfd2354","gun":"Barret","scope":"S&B pmII","score":0,"position":33},{"name":"tak dsa","number":"1233","gun":"Barret","scope":"S&B pmII","score":0,"position":34},{"name":"nie asd","number":"fas32","gun":"Barret","scope":"S&B pmII","score":0,"position":35},{"name":"no d","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":36},{"name":"Brajan Fish","number":"2","gun":"gun","scope":"scope","score":0,"position":37},{"name":"John Foczy","number":"1","gun":"gun","scope":"scope","score":0,"position":38}],"description":"dsdfsdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsa sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsa","annotation":"sdfsa sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsa sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsa"},{"protocol":"Protokół nr 2","players":[{"name":"Bartłomiej Alfons","number":"23fas","gun":"Barret","scope":"S&B pmII","score":3,"position":1},{"name":"Marlena Smith","number":"kjasdf","gun":"Barret","scope":"S&B pmII","score":0,"position":2},{"name":"Daniel Rogaś","number":"lkasdjf","gun":"Barret","scope":"S&B pmII","score":0,"position":3},{"name":"Tomasz Praczyk","number":"g-02w","gun":"Barret","scope":"S&B pmII","score":0,"position":4},{"name":"Jerry Pistolet","number":"gsadf","gun":"Barret","scope":"S&B pmII","score":0,"position":5},{"name":"Mariusz Pilka","number":"lkafsh","gun":"Barret","scope":"S&B pmII","score":0,"position":6},{"name":"Piotr Numski","number":"gfds","gun":"Barret","scope":"S&B pmII","score":0,"position":7},{"name":"Jan Matowicz","number":"jnvalk","gun":"Barret","scope":"S&B pmII","score":0,"position":8},{"name":"Łukasz Lewski","number":"lksdjf","gun":"Barret","scope":"S&B pmII","score":0,"position":9},{"name":"Kamil Krzysztoszowski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":10},{"name":"Karol Hoplicki","number":"fasd","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Zbigniew ed","number":"gggds323","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Marian dsa","number":"gf3eA","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"Zenon d","number":"LKASJD03","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"Sylwia Brown","number":"lkjsadf","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"Janusz asd","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"Franciszek Jeziorowski","number":"klsajdf","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"Przemysław Gregorczyk","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Grzegorz Kowalewski","number":"klsdfklio","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"Marceli Krzysztoszek","number":"lsajdf93fs","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"Wolfgang Mozart","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Miroslaw Mruk","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"Milena Pasek","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Michal Nowacz","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Janusz Nikt","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Tomasz Molga","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"Stanislaw Prawski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"Filip Klap","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"yes ed","number":"43","gun":"Barret","scope":"S&B pmII","score":0,"position":29},{"name":"tak dsa","number":"e23","gun":"Barret","scope":"S&B pmII","score":0,"position":30},{"name":"nie asd","number":"23das","gun":"Barret","scope":"S&B pmII","score":0,"position":31},{"name":"yes ed","number":"sfd","gun":"Barret","scope":"S&B pmII","score":0,"position":32},{"name":"no d","number":"sfd2354","gun":"Barret","scope":"S&B pmII","score":0,"position":33},{"name":"tak dsa","number":"1233","gun":"Barret","scope":"S&B pmII","score":0,"position":34},{"name":"nie asd","number":"fas32","gun":"Barret","scope":"S&B pmII","score":0,"position":35},{"name":"no d","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":36},{"name":"Brajan Fish","number":"2","gun":"gun","scope":"scope","score":0,"position":37},{"name":"John Foczy","number":"1","gun":"gun","scope":"scope","score":0,"position":38}],"description":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsa","annotation":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsa"},{"protocol":"Protokół nr 3","players":[{"name":"Marlena Smith","number":"kjasdf","gun":"Barret","scope":"S&B pmII","score":0,"position":1},{"name":"Daniel Rogaś","number":"lkasdjf","gun":"Barret","scope":"S&B pmII","score":0,"position":2},{"name":"Tomasz Praczyk","number":"g-02w","gun":"Barret","scope":"S&B pmII","score":0,"position":3},{"name":"Jerry Pistolet","number":"gsadf","gun":"Barret","scope":"S&B pmII","score":0,"position":4},{"name":"Mariusz Pilka","number":"lkafsh","gun":"Barret","scope":"S&B pmII","score":0,"position":5},{"name":"Piotr Numski","number":"gfds","gun":"Barret","scope":"S&B pmII","score":0,"position":6},{"name":"Jan Matowicz","number":"jnvalk","gun":"Barret","scope":"S&B pmII","score":0,"position":7},{"name":"Łukasz Lewski","number":"lksdjf","gun":"Barret","scope":"S&B pmII","score":0,"position":8},{"name":"Kamil Krzysztoszowski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":9},{"name":"Karol Hoplicki","number":"fasd","gun":"Barret","scope":"S&B pmII","score":0,"position":10},{"name":"Zbigniew ed","number":"gggds323","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Marian dsa","number":"gf3eA","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Zenon d","number":"LKASJD03","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"Sylwia Brown","number":"lkjsadf","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"Janusz asd","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"Bartłomiej Alfons","number":"23fas","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"Franciszek Jeziorowski","number":"klsajdf","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"Przemysław Gregorczyk","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Grzegorz Kowalewski","number":"klsdfklio","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"Marceli Krzysztoszek","number":"lsajdf93fs","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"Wolfgang Mozart","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Miroslaw Mruk","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"Milena Pasek","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Michal Nowacz","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Janusz Nikt","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Tomasz Molga","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"Stanislaw Prawski","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"Filip Klap","number":"","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"yes ed","number":"43","gun":"Barret","scope":"S&B pmII","score":0,"position":29},{"name":"tak dsa","number":"e23","gun":"Barret","scope":"S&B pmII","score":0,"position":30},{"name":"nie asd","number":"23das","gun":"Barret","scope":"S&B pmII","score":0,"position":31},{"name":"yes ed","number":"sfd","gun":"Barret","scope":"S&B pmII","score":0,"position":32},{"name":"no d","number":"sfd2354","gun":"Barret","scope":"S&B pmII","score":0,"position":33},{"name":"tak dsa","number":"1233","gun":"Barret","scope":"S&B pmII","score":0,"position":34},{"name":"nie asd","number":"fas32","gun":"Barret","scope":"S&B pmII","score":0,"position":35},{"name":"no d","number":"asdf","gun":"Barret","scope":"S&B pmII","score":0,"position":36},{"name":"Brajan Fish","number":"2","gun":"gun","scope":"scope","score":0,"position":37},{"name":"John Foczy","number":"1","gun":"gun","scope":"scope","score":0,"position":38}],"description":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsasdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsasdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsasdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsa","annotation":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsasdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsasdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsasdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsasdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsa"}]

var doc = new jsPDF();


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
    doc.setFontSize(12);
    doc.setFont("PTSans", "bold");
    // doc.setFontType("bold");
    doc.text("Miejsce", 13, fromTop);
    doc.text("Nr startowy", 32, fromTop);
    doc.text("Imie i nazwisko", 70, fromTop);
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
