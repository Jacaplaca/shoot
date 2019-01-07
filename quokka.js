function dotted(xStart, yStart, xStop, yStop) {
  const prog = 5;
  const odlegloscX = xStop - xStart;
  const iloscProgow = odlegloscX / prog;

  let start = xStart;
  let stop = xStart + prog;

  // for (var i = 0; i<10 ; i++) {
  //     // return
  //     i
  //     startTu = start + prog*2
  //     stopTu = stop + prog*2
  //     // return doc.line(startTu, 60, stopTu, 60)
  //     return {startTu, yStart, stopTu, yStop}
  // }
  let my = {};
  try {
    for (var i = 0; i < 10; i++) {
      i;
      start = start + prog * 2;
      stop = stop + prog * 2;
      // return doc.line(startTu, 60, stopTu, 60)
      my = { start, yStart, stop, yStop };
    }
  } finally {
    return my;
  }
}

console.log(dotted(15, 60, 100, 60));

// const arr = [
//   {
//     imie: "Jan",
//     liczby: [
//       { nazwa: "jakas", nr: 13 },
//       { nazwa: "inna", nr: 31 },
//       { nazwa: "taka", nr: 154 },
//       { nazwa: "owaka", nr: 21 }
//     ]
//   },
//   {
//     imie: "Marek",
//     liczby: [
//       { nazwa: "jakas", nr: 44 },
//       { nazwa: "inna", nr: 23 },
//       { nazwa: "taka", nr: 54 },
//       { nazwa: "owaka", nr: 12 }
//     ]
//   },
//   {
//     imie: "Tomek",
//     liczby: [
//       { nazwa: "jakas", nr: 41 },
//       { nazwa: "inna", nr: 12 },
//       { nazwa: "taka", nr: 165 },
//       { nazwa: "owaka", nr: 35 }
//     ]
//   }
// ];
//
// function paginate(array, page_size, page_number) {
//   --page_number; // because pages logically start with 1, but technically with 0
//   return array.slice(page_number * page_size, (page_number + 1) * page_size);
// }
//
// console.log(paginate([1, 2, 3, 4, 5, 6], 2, 2));
// console.log(paginate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4, 1));
//
// const dynamicSort = property => {
//   let sortOrder = 1;
//   if (property[0] === "-") {
//     sortOrder = -1;
//     property = property.substr(1);
//   }
//   return function(a, b) {
//     const result =
//       a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
//     return result * sortOrder;
//   };
// };
//
// const mapka = arr.map(x =>
//   Object.assign(x, { sort: x.liczby.filter(y => y.nazwa === "jakas")[0].nr })
// );
// // mapka
//
// const sortuje = mapka.sort(dynamicSort("sort"));
// sortuje;
// // traveler = [
// //   { description: "Senior", Amount: 50 },
// //   { description: "Senior", Amount: 50 },
// //   { description: "Adult", Amount: 75 },
// //   { description: "Child", Amount: 35 },
// //   { description: "Infant", Amount: 25 }
// // ];
// //
// // Array.prototype.sum = function(prop) {
// //   var total = 0;
// //   for (var i = 0, _len = this.length; i < _len; i++) {
// //     total += this[i][prop];
// //   }
// //   return total;
// // };
// //
// // console.log(traveler.sum("Amount"));
//
// // const ar1 = ["jan", "marek", "antek"];
// // const ar2 = ["skradanie", "strzelanie", "celowanie"];
// //
// // const nowy = () => {
// //   const array = [];
// //
// //   for (player of ar1) {
// //     // array.push(variable)
// //     for (konkurencja of ar2) {
// //       const ob = { imie: player, konk: konkurencja };
// //       array.push(ob);
// //     }
// //   }
// //
// //   console.log(array);
// // };
// //
// // nowy();
