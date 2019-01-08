const arrayToPdf = [
  {
    competition: "Strzelanie do rzutek",
    names: [
      {
        playerName: "Jacek",
        playerSurname: "Tracz"
      }
    ]
  },
  {
    competition: "Ratowanie zakladników",
    names: [
      {
        playerName: "Krzysztof",
        playerSurname: "Prażmo"
      },
      {
        playerName: "Maria",
        playerSurname: "Awaria"
      },
      {
        playerName: "Sylwester",
        playerSurname: "Benowich"
      }
    ]
  },
  {
    competition: "1500m albo wiecej sam nie wiem ile to moze miec",
    names: [
      {
        playerName: "Tomasz",
        playerSurname: "Nilowanys"
      }
    ]
  },
  {
    competition: "Lanie",
    names: [
      {
        playerName: "Marek",
        playerSurname: "Pryk"
      },
      {
        playerName: "Grzegorz",
        playerSurname: "Kruter"
      }
    ]
  }
];

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

var doc = new jsPDF({
  //   orientation: 'landscape',
  //   unit: 'mm',
  //   format: [80, 190]
});

rend();

function rend() {
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
    doc.text("1", 41, 60 + a());
    doc.text("2", 6, 69 + a());
    doc.text("2", 41, 69 + a());
    doc.text("3", 6, 78 + a());
    doc.text("3", 41, 78 + a());
    doc.text("4", 6, 87 + a());
    doc.text("4", 41, 87 + a());
    doc.text("5", 6, 96 + a());
    doc.text("5", 41, 96 + a());

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
    var competition = doc.splitTextToSize(`${arrayToPdf[i].competition}`, 30);
    doc.text(3, 13 + a(), competition);

    rest !== 1 && dotted(2, a(), 208, a(), 3);
    i < arrayToPdf.length - 1 && rest === 0 && doc.addPage();
  }
}
