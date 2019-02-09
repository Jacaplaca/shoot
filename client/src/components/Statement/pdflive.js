import * as jsPDF from "jspdf";



const turnament = {"finished":true,"www":true,"_id":"5c277e7556e93f0f20c66c9b","name":"Mistrzostwa","date":"2018-12-31","logo":"","promoter":{"_id":"5c264f80f7c9c40c9850bcee","name":"Moja organizacja","email":"a@a.com","password":"$2a$10$4VSC4esi8lgSN7p4TT0RAuYkv75iHxCsKLanQm3PXMfuKCIrck67a","adres":"Lubartów","logo":"","www":"www.oepasdfasd.pl","rola":"promoter","date":"2018-12-28T16:29:52.539Z","__v":0},"facility":"Pod wiatą","judgeMain":{"_id":"5c239460f77d1903a0ffd1c7","name":"Antonia","surname":"Wojtczak","judgeClass":"A-","__v":0},"lzss":"ggf","judgeCounting":{"_id":"5c228653ffa9152320ec57b1","name":"Tomasz","surname":"Polak","judgeClass":"B+","__v":0},"judgeRTS":{"_id":"5c239511858da03bc03d3478","name":"Januszek","surname":"Markowiak","judgeClass":"A","__v":0},"tech":"asdf","competitions":[{"_id":"5c2e426e2a3d211fcc00f1c0","name":"1500m","judge":{"_id":"5c228653ffa9152320ec57b1","name":"Tomasz","surname":"Polak","judgeClass":"B+","__v":0}},{"_id":"5c2e427f2a3d211fcc00f1c1","name":"500m","judge":{"_id":"5c224f6ee9915f2670e5f9ae","name":"Sylwia","surname":"Fibarro","judgeClass":"A+","__v":0}},{"_id":"5c3dcfe14a2ed31b6c8df8a1","name":"uuuu","judge":{"_id":"5c224f69e9915f2670e5f9ad","name":"Krzysztof","surname":"Figurantes","judgeClass":"B-","__v":0}}],"__v":0,"sponsor1":null,"sponsor2":null,"sponsor3":null,"promoterName":"Moja organizacja"}

const protocols = [{"protocol":"Protokół Zbiorczy","players":[{"name":"tak dsa","gun":"Barret","scope":"S&B pmII","score":3799,"position":1},{"name":"John Foczy","gun":"gun","scope":"scope","score":1019,"position":2},{"name":"Brajan Fish","gun":"gun","scope":"scope","score":478,"position":3},{"name":"no d","gun":"Barret","scope":"S&B pmII","score":401,"position":4},{"name":"tak dsa","gun":"Barret","scope":"S&B pmII","score":397,"position":5},{"name":"yes ed","gun":"Barret","scope":"S&B pmII","score":360.1,"position":6},{"name":"yes ed","gun":"Barret","scope":"S&B pmII","score":360,"position":7},{"name":"nie asd","gun":"Barret","scope":"S&B pmII","score":209,"position":8},{"name":"nie asd","gun":"Barret","scope":"S&B pmII","score":169,"position":9},{"name":"no d","gun":"Barret","scope":"S&B pmII","score":57,"position":10},{"name":"Franciszek Jeziorowski","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Przemysław Gregorczyk","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Grzegorz Kowalewski","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"Marceli Krzysztoszek","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"Wolfgang Mozart","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"Miroslaw Mruk","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"Filip Klap","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"Milena Pasek","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Michal Nowacz","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"Janusz Nikt","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"Tomasz Molga","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Kamil Krzysztoszowski","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"Stanislaw Prawski","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Łukasz Lewski","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Daniel Rogaś","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Jerry Pistolet","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"Mariusz Pilka","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"Bartłomiej Alfons","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"Piotr Numski","gun":"Barret","scope":"S&B pmII","score":0,"position":29},{"name":"Karol Hoplicki","gun":"Barret","scope":"S&B pmII","score":0,"position":30},{"name":"Jan Matowicz","gun":"Barret","scope":"S&B pmII","score":0,"position":31},{"name":"Sylwia Brown","gun":"Barret","scope":"S&B pmII","score":0,"position":32},{"name":"Marlena Smith","gun":"Barret","scope":"S&B pmII","score":0,"position":33},{"name":"Tomasz Praczyk","gun":"Barret","scope":"S&B pmII","score":0,"position":34},{"name":"Zenon d","gun":"Barret","scope":"S&B pmII","score":0,"position":35},{"name":"Marian dsa","gun":"Barret","scope":"S&B pmII","score":0,"position":36},{"name":"Zbigniew ed","gun":"Barret","scope":"S&B pmII","score":0,"position":37},{"name":"Janusz asd","gun":"Barret","scope":"S&B pmII","score":0,"position":38}],"description":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad ","annotation":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad "},{"protocol":"Protokół nr 1","players":[{"name":"tak dsa","gun":"Barret","scope":"S&B pmII","score":3333,"position":1},{"name":"Brajan Fish","gun":"gun","scope":"scope","score":433,"position":2},{"name":"John Foczy","gun":"gun","scope":"scope","score":433,"position":3},{"name":"no d","gun":"Barret","scope":"S&B pmII","score":43,"position":4},{"name":"yes ed","gun":"Barret","scope":"S&B pmII","score":34,"position":5},{"name":"tak dsa","gun":"Barret","scope":"S&B pmII","score":34,"position":6},{"name":"no d","gun":"Barret","scope":"S&B pmII","score":34,"position":7},{"name":"nie asd","gun":"Barret","scope":"S&B pmII","score":33,"position":8},{"name":"yes ed","gun":"Barret","scope":"S&B pmII","score":4,"position":9},{"name":"nie asd","gun":"Barret","scope":"S&B pmII","score":3,"position":10},{"name":"Franciszek Jeziorowski","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Przemysław Gregorczyk","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Grzegorz Kowalewski","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"Marceli Krzysztoszek","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"Wolfgang Mozart","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"Miroslaw Mruk","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"Filip Klap","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"Milena Pasek","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Michal Nowacz","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"Janusz Nikt","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"Tomasz Molga","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Kamil Krzysztoszowski","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"Stanislaw Prawski","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Łukasz Lewski","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Daniel Rogaś","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Jerry Pistolet","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"Mariusz Pilka","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"Bartłomiej Alfons","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"Piotr Numski","gun":"Barret","scope":"S&B pmII","score":0,"position":29},{"name":"Karol Hoplicki","gun":"Barret","scope":"S&B pmII","score":0,"position":30},{"name":"Jan Matowicz","gun":"Barret","scope":"S&B pmII","score":0,"position":31},{"name":"Sylwia Brown","gun":"Barret","scope":"S&B pmII","score":0,"position":32},{"name":"Marlena Smith","gun":"Barret","scope":"S&B pmII","score":0,"position":33},{"name":"Tomasz Praczyk","gun":"Barret","scope":"S&B pmII","score":0,"position":34},{"name":"Zenon d","gun":"Barret","scope":"S&B pmII","score":0,"position":35},{"name":"Marian dsa","gun":"Barret","scope":"S&B pmII","score":0,"position":36},{"name":"Zbigniew ed","gun":"Barret","scope":"S&B pmII","score":0,"position":37},{"name":"Janusz asd","gun":"Barret","scope":"S&B pmII","score":0,"position":38}],"description":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad ","annotation":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad "},{"protocol":"Protokół nr 2","players":[{"name":"John Foczy","gun":"gun","scope":"scope","score":53,"position":1},{"name":"Brajan Fish","gun":"gun","scope":"scope","score":43,"position":2},{"name":"no d","gun":"Barret","scope":"S&B pmII","score":34,"position":3},{"name":"tak dsa","gun":"Barret","scope":"S&B pmII","score":33,"position":4},{"name":"tak dsa","gun":"Barret","scope":"S&B pmII","score":30,"position":5},{"name":"yes ed","gun":"Barret","scope":"S&B pmII","score":23.1,"position":6},{"name":"no d","gun":"Barret","scope":"S&B pmII","score":13,"position":7},{"name":"nie asd","gun":"Barret","scope":"S&B pmII","score":13,"position":8},{"name":"yes ed","gun":"Barret","scope":"S&B pmII","score":3,"position":9},{"name":"nie asd","gun":"Barret","scope":"S&B pmII","score":3,"position":10},{"name":"Franciszek Jeziorowski","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Przemysław Gregorczyk","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Grzegorz Kowalewski","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"Marceli Krzysztoszek","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"Wolfgang Mozart","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"Miroslaw Mruk","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"Filip Klap","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"Milena Pasek","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Michal Nowacz","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"Janusz Nikt","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"Tomasz Molga","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Kamil Krzysztoszowski","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"Stanislaw Prawski","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Łukasz Lewski","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Daniel Rogaś","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Jerry Pistolet","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"Mariusz Pilka","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"Bartłomiej Alfons","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"Piotr Numski","gun":"Barret","scope":"S&B pmII","score":0,"position":29},{"name":"Karol Hoplicki","gun":"Barret","scope":"S&B pmII","score":0,"position":30},{"name":"Jan Matowicz","gun":"Barret","scope":"S&B pmII","score":0,"position":31},{"name":"Sylwia Brown","gun":"Barret","scope":"S&B pmII","score":0,"position":32},{"name":"Marlena Smith","gun":"Barret","scope":"S&B pmII","score":0,"position":33},{"name":"Tomasz Praczyk","gun":"Barret","scope":"S&B pmII","score":0,"position":34},{"name":"Zenon d","gun":"Barret","scope":"S&B pmII","score":0,"position":35},{"name":"Marian dsa","gun":"Barret","scope":"S&B pmII","score":0,"position":36},{"name":"Zbigniew ed","gun":"Barret","scope":"S&B pmII","score":0,"position":37},{"name":"Janusz asd","gun":"Barret","scope":"S&B pmII","score":0,"position":38}],"description":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad ","annotation":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad "},{"protocol":"Protokół nr 3","players":[{"name":"John Foczy","gun":"gun","scope":"scope","score":533,"position":1},{"name":"tak dsa","gun":"Barret","scope":"S&B pmII","score":433,"position":2},{"name":"tak dsa","gun":"Barret","scope":"S&B pmII","score":333,"position":3},{"name":"yes ed","gun":"Barret","scope":"S&B pmII","score":333,"position":4},{"name":"no d","gun":"Barret","scope":"S&B pmII","score":333,"position":5},{"name":"yes ed","gun":"Barret","scope":"S&B pmII","score":323,"position":6},{"name":"nie asd","gun":"Barret","scope":"S&B pmII","score":203,"position":7},{"name":"nie asd","gun":"Barret","scope":"S&B pmII","score":123,"position":8},{"name":"Brajan Fish","gun":"gun","scope":"scope","score":2,"position":9},{"name":"no d","gun":"Barret","scope":"S&B pmII","score":1,"position":10},{"name":"Franciszek Jeziorowski","gun":"Barret","scope":"S&B pmII","score":0,"position":11},{"name":"Przemysław Gregorczyk","gun":"Barret","scope":"S&B pmII","score":0,"position":12},{"name":"Grzegorz Kowalewski","gun":"Barret","scope":"S&B pmII","score":0,"position":13},{"name":"Marceli Krzysztoszek","gun":"Barret","scope":"S&B pmII","score":0,"position":14},{"name":"Wolfgang Mozart","gun":"Barret","scope":"S&B pmII","score":0,"position":15},{"name":"Miroslaw Mruk","gun":"Barret","scope":"S&B pmII","score":0,"position":16},{"name":"Filip Klap","gun":"Barret","scope":"S&B pmII","score":0,"position":17},{"name":"Milena Pasek","gun":"Barret","scope":"S&B pmII","score":0,"position":18},{"name":"Michal Nowacz","gun":"Barret","scope":"S&B pmII","score":0,"position":19},{"name":"Janusz Nikt","gun":"Barret","scope":"S&B pmII","score":0,"position":20},{"name":"Tomasz Molga","gun":"Barret","scope":"S&B pmII","score":0,"position":21},{"name":"Kamil Krzysztoszowski","gun":"Barret","scope":"S&B pmII","score":0,"position":22},{"name":"Stanislaw Prawski","gun":"Barret","scope":"S&B pmII","score":0,"position":23},{"name":"Łukasz Lewski","gun":"Barret","scope":"S&B pmII","score":0,"position":24},{"name":"Daniel Rogaś","gun":"Barret","scope":"S&B pmII","score":0,"position":25},{"name":"Jerry Pistolet","gun":"Barret","scope":"S&B pmII","score":0,"position":26},{"name":"Mariusz Pilka","gun":"Barret","scope":"S&B pmII","score":0,"position":27},{"name":"Bartłomiej Alfons","gun":"Barret","scope":"S&B pmII","score":0,"position":28},{"name":"Piotr Numski","gun":"Barret","scope":"S&B pmII","score":0,"position":29},{"name":"Karol Hoplicki","gun":"Barret","scope":"S&B pmII","score":0,"position":30},{"name":"Jan Matowicz","gun":"Barret","scope":"S&B pmII","score":0,"position":31},{"name":"Sylwia Brown","gun":"Barret","scope":"S&B pmII","score":0,"position":32},{"name":"Marlena Smith","gun":"Barret","scope":"S&B pmII","score":0,"position":33},{"name":"Tomasz Praczyk","gun":"Barret","scope":"S&B pmII","score":0,"position":34},{"name":"Zenon d","gun":"Barret","scope":"S&B pmII","score":0,"position":35},{"name":"Marian dsa","gun":"Barret","scope":"S&B pmII","score":0,"position":36},{"name":"Zbigniew ed","gun":"Barret","scope":"S&B pmII","score":0,"position":37},{"name":"Janusz asd","gun":"Barret","scope":"S&B pmII","score":0,"position":38}],"description":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad ","annotation":"sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad fasdf sdfasdfsadf sdf sadf sadf asdf sadf sad "}]

var doc = new jsPDF();


function formatNumber(n) {
    if (Number(n) === n && n % 1 !== 0) {
        return n.toFixed(2);
    } else {
        return n.toString()
    }

}
// formatNumber(12)
function templateHead(){
        doc.setFontSize(16);
    // doc.setFontType("bold");
    doc.text(turnament.name, 105, 20, null, null, "center");
}

function templateFooter(){
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

    // doc.setFontType("bold");
    function titlePage(){
        doc.setFontSize(30);
        let promoter = turnament.promoter.name
        promoter = "Bardzo Znana Organizacja Strzelecka Zrzeszajaca Wielu Utalentowanych Strzelców"
        const splitPromoter = doc.splitTextToSize(promoter, 180);
        doc.text(splitPromoter, 105, 60, 'center');

        doc.setFontSize(25);
        doc.text("REZULTATY ZAWODÓW", 105, 120, 'center');

        doc.setFontSize(40);
        let turnamentName = turnament.name
        //turnamentName = "Bardzo Znana Organizacja Strzelecka Zrzeszajaca Wielu Utalentowanych Strzelców"
        const splitTurnament = doc.splitTextToSize(turnamentName, 180);
        doc.text(splitTurnament, 105, 170, 'center');

        doc.setFontSize(20);
        doc.text(`${turnament.facility} ${turnament.date}`, 105, 280, null, null, 'center')

        doc.addPage("l", "a4");
    }

    function judges(){
        templateHead()

        doc.setFontSize(20);
        doc.text("OBSADA SĘDZIOWSKA", 10, 40,);

        doc.setFontSize(16);
        doc.text("SĘDZIA GŁÓWNY:", 10, 55,);
        doc.text(`${turnament.judgeMain.name ? turnament.judgeMain.name : ""} ${turnament.judgeMain.surname ? turnament.judgeMain.surname : ""} `, 90, 55,);
        doc.text("SĘDZIA LICZĄCY:", 10, 70,);
        doc.text(`${turnament.judgeCounting.name ? turnament.judgeCounting.name : ""} ${turnament.judgeCounting.surname ? turnament.judgeCounting.surname : ""} `, 90, 70,);
        doc.text("SĘDZIA RTS:", 10 ,85);
        doc.text(`${turnament.judgeRTS.name ? turnament.judgeRTS.name : ""} ${turnament.judgeRTS.surname ? turnament.judgeRTS.surname : ""} `, 90, 85,);
        doc.text("OBSERWATOR PZSS:", 10, 100,);
        doc.text(`${turnament.lzss ? turnament.lzss : ""} `, 90, 100,);

        templateFooter()
        doc.addPage("l", "a4");

    }

//titlePage()
//judges()




for (var i = 0; i < protocols.length; i++) {
    let description = protocols[i].description;
    let annotation = protocols[i].annotation;
    // description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce"
  function podescription() {

    const descriptionLength = description.length;
    const lineHeight = 7;
    const charInLine = 150;
    const headLineHeight = 50;
    const descriptionHeight =
      Math.ceil(descriptionLength / charInLine) * lineHeight + headLineHeight;
    return descriptionHeight + 10;
  }

  const playersLength = protocols[i].players.length;
  const playerHeight = 7.3;
  const bottomPosition = 260;

  function template() {
    templateHead()
    // doc.setFontType("light");
    doc.setFontSize(18);
    doc.text(protocols[i].protocol, 105, 35, null, null, "center");
    // doc.setFontType("normal");
    templateFooter()
  }

  template();

  doc.setFontSize(11);
  const splitDescription = doc.splitTextToSize(description, 180);
  doc.text(15, 50, splitDescription);

   const splitAnnotation = doc.splitTextToSize(annotation, 180);



  function scoresHeadline(fromTop) {
    doc.setFontSize(15);
    // doc.setFontType("bold");
    doc.text("Miejsce", 16, fromTop);
    doc.text("Imie i nazwisko", 49, fromTop);
    doc.text("Bron", 105, fromTop);
    doc.text("Luneta", 140, fromTop);
    doc.text("Punkty", 175, fromTop);
  }

  scoresHeadline(podescription());

  let indexReset = 0;
  let descriptionHeight = podescription();
  let lastPosition = 0
  for (var index = 0; index < playersLength; index++) {
    indexReset++;
    const player = protocols[i].players[index];

    let position = 5 + descriptionHeight + indexReset * playerHeight;
    doc.setFontSize(14);
    // doc.setFontType("normal");

    doc.text(player.position.toString(), 24, position, null, null, "center");
    doc.setFontSize(12);
    doc.text(player.name, 68, position, null, null, "center");
    doc.text(player.gun, 110, position, null, null, "center");
    doc.text(player.scope, 149, position, null, null, "center");
    doc.setFontSize(14);
    doc.text(formatNumber(player.score), 183, position, null, null, "center");
    lastPosition = position

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

        function annotation() {
            doc.setFontSize(11);
            doc.text(15, position + 20, splitAnnotation);
        }

        if (position > bottomPosition - 50) {
            doc.addPage("l", "a4");

            position = 10
            annotation()
            doc.text(position.toString(), 10,10)
        } else {
            annotation()
        }



    }
  }
  if (i < protocols.length - 1) {
    doc.addPage("l", "a4");
    //   doc.text(i.toString(), 20, 20);
    //   doc.text(protocols.length.toString(), 20, 50);
  }
}
