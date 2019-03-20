import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek
} from "date-fns";
import axios from "axios";

export const arr_diff = (a1, a2) => {
  var a = [],
    diff = [];

  for (let i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (let i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (let k in a) {
    diff.push(k);
  }

  return diff;
};

export const formatNumber = n => {
  if (Number(n) === n && n % 1 !== 0) {
    return n
      .toFixed(2)
      .toString()
      .replace(".", ",");
  } else {
    return n;
  }
};
// import store from "../store";
// impot * as actions from "../actions";

// export const dynamicSort = property => {
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

export const simpleSortUpDown = (array, what, how) => {
  let rows = [];
  rows = array.sort(dynamicSort(what));
  if (how === "down") {
    rows = rows.reverse();
  }
  return rows;
};

export const searchingInArray = (value, array, names) => {
  const regex = new RegExp(value.toLowerCase());
  let filtered = [];

  for (let field of names) {
    filtered.push(
      ...array.filter(suggestion => regex.test(suggestion[field].toLowerCase()))
    );
  }
  return filtered.reduce((x, y) => (x.includes(y) ? x : [...x, y]), []);
};

export const combineStyles = (...styles) => {
  // console.log("combineStyles()", styles);
  return function CombineStyles(theme) {
    const outStyles = styles.map(arg => {
      // Apply the "theme" object for style functions.
      if (typeof arg === "function") {
        return arg(theme);
      }
      // Objects need no change.
      return arg;
    });

    return outStyles.reduce((acc, val) => Object.assign(acc, val));
  };
};

// export default combineStyles;

export const fetchDB = async (value, offset, baza, limit) => {
  const result = await axios.get(
    `/api/limit/${baza}/${value}/${offset}/${limit}`
  );
  return result.data;
};

export const fetchDBall = async baza => {
  const result = await axios.get(`/api/table/${baza}`);
  return result.data;
};
//
// export const sprawdzPola = (aktywnosc_id, miejsce_id, inna) => {
//   //console.log("sprawdzam pola");
//   switch (aktywnosc_id) {
//     case 1:
//       //console.log("case aktyw");
//       //console.log(!miejsce_id ? false : true);
//       return !miejsce_id ? false : true;
//       break;
//     case 5:
//       //console.log("case inna");
//       return inna === "" ? false : true;
//       break;
//     default:
//       //console.log("case default");
//       return true;
//   }
// };
//
// export const validateKiedy = (data, sentDays, belongs) => {
//   console.log(data);
//   const nalezy = belongs
//     ? sentDays.some(x => x.name === data)
//     : !sentDays.some(x => x.name === data);
//
//   const pelnaData = data.length === 10 ? true : false;
//
//   if (pelnaData) {
//     if (nalezy) {
//       store.dispatch(actions.errorKiedyAction(false));
//       return true;
//     }
//     store.dispatch(actions.errorKiedyAction(true));
//     return false;
//   }
//   store.dispatch(actions.errorKiedyAction(false));
//   return false;
// };
//
// export const validateTime = (time, pole) => {
//   const nazwaPola = `error${pole}Action`;
//   const hours = Math.trunc(time.split(":")[0]);
//   const minutes = Math.trunc(time.split(":")[1]);
//   if (hours < 0 || hours > 23 || (minutes < 0 || minutes > 59)) {
//     store.dispatch(actions[nazwaPola](true));
//   }
//   if (hours >= 0 && hours <= 23 && (minutes >= 0 && minutes <= 59)) {
//     store.dispatch(actions[nazwaPola](false));
//     return true;
//   } else {
//     if (hours && minutes) {
//     }
//     return false;
//   }
// };
//
// export const validateDuration = (start, stop) => {
//   const startHours = Math.trunc(start.split(":")[0]);
//   const startMinutes = Math.trunc(start.split(":")[1]);
//   const stopHours = Math.trunc(stop.split(":")[0]);
//   const stopMinutes = Math.trunc(stop.split(":")[1]);
//
//   const startTotal = startHours * 60 + startMinutes;
//   const stopTotal = stopHours * 60 + stopMinutes;
//   if (
//     !Number.isNaN(startHours) &&
//     !Number.isNaN(startMinutes) &&
//     !Number.isNaN(stopHours) &&
//     !Number.isNaN(stopMinutes)
//   ) {
//     if (startTotal < stopTotal) {
//       return true;
//     }
//     //this.setState({ errorStop: true });
//     store.dispatch(actions.errorStopAction(true));
//     return false;
//   }
//   return false;
// };
//
export const dataToString = element => {
  const data = new Date(element);
  const dzien = data.getDate() > 9 ? `${data.getDate()}` : `0${data.getDate()}`;
  const miesiac =
    data.getMonth() + 1 > 9
      ? `${data.getMonth() + 1}`
      : `0${data.getMonth() + 1}`;
  return `${data.getFullYear()}-${miesiac}-${dzien}`;
};
//
// export const onlyUnique = (value, index, self) => {
//   return self.indexOf(value) === index;
// };
//
// export const podzielUnikalnymi = (array, key) => {
//   const notUnique = array.map(el => el[key]);
//   const unique = notUnique.filter(onlyUnique);
//   const podzielone = unique.map(element => {
//     return {
//       [key]: element,
//       //expanded: element === expanded ? true : false,
//       values: []
//     };
//   });
//   array.map(element => {
//     const ktoryIndex = podzielone => podzielone[key] === element[key];
//     const gdzieKlucz = podzielone.findIndex(ktoryIndex);
//     podzielone[gdzieKlucz].values.push(element);
//   });
//   return podzielone;
// };
//
// export const timeDiff = (start, stop) => {
//   const date1 = new Date(start);
//   const date2 = new Date(stop);
//   const timeDiff = Math.abs(date2.getTime() - date1.getTime());
//   const diffMinutes = Math.ceil(timeDiff / 1000 / 60);
//   return diffMinutes;
// };
//
// export const sumaCzasow = czasy => {
//   let suma = 0;
//   czasy.map(x => {
//     suma = timeDiff(x.start, x.stop) + suma;
//   });
//   return suma;
// };
//
// export const wezGodzine = czas => {
//   const data = new Date(czas);
//   let godzina = data.getHours();
//   let minuty = data.getMinutes();
//   godzina = godzina < 10 ? `0${godzina}` : godzina;
//   minuty = minuty < 10 ? `0${minuty}` : minuty;
//   return `${godzina}:${minuty}`;
// };
//
// export const minutes2hours = minutes => {
//   let godziny = Math.trunc(minutes / 60);
//   let minuty = minutes % 60;
//   godziny = godziny < 10 ? `0${godziny}` : godziny;
//   minuty = minuty < 10 ? `0${minuty}` : minuty;
//   return `${godziny}:${minuty}`;
// };

export const dynamicSort = property => {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function(a, b) {
    if (typeof a[property] === "string") {
      const aPL = a[property]
        .toLowerCase()
        .replace(/[ąęśćółńżź]/g, function(s) {
          return (
            (s == "ą"
              ? "a"
              : s == "ę"
              ? "e"
              : s == "ś"
              ? "s"
              : s == "ć"
              ? "c"
              : s == "ó"
              ? "o"
              : s == "ł"
              ? "l"
              : s == "ń"
              ? "n"
              : s == "ż"
              ? "z"
              : "zż") + "ż"
          );
        });

      const bPL =
        typeof b[property] !== "string"
          ? ""
          : b[property].toLowerCase().replace(/[ąęśćółńżź]/g, function(s) {
              return (
                (s == "ą"
                  ? "a"
                  : s == "ę"
                  ? "e"
                  : s == "ś"
                  ? "s"
                  : s == "ć"
                  ? "c"
                  : s == "ó"
                  ? "o"
                  : s == "ł"
                  ? "l"
                  : s == "ń"
                  ? "n"
                  : s == "ż"
                  ? "z"
                  : "zż") + "ż"
              );
            });

      const result = aPL < bPL ? -1 : aPL > bPL ? 1 : 0;
      // console.log(result);
      // console.log(sortOrder);
      return result * sortOrder;
    } else {
      const aPL = a[property];
      const bPL = b[property];
      const result = aPL < bPL ? -1 : aPL > bPL ? 1 : 0;
      // console.log(result);
      // console.log(sortOrder);
      return result * sortOrder;
    }
  };
};

export const sortNumber = (a, b) => {
  return a - b;
};

export const addRank = (array, property) => {
  let onlyProperties = [];
  for (let elem of array) {
    onlyProperties.push(elem[property]);
  }
  const sortedProperties = onlyProperties.sort(sortNumber).reverse();
  // console.log(sortedProperties);

  const rankedArray = array.map(x => {
    let rank = 0;
    for (var i = 0; i < sortedProperties.length; i++) {
      if (sortedProperties[i] === x[property]) {
        rank = i + 1;
      }
    }
    return Object.assign(x, { rank });
  });

  return rankedArray;
};

export const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1))
};

// function formatTimezone(date: Date): Date {
//   const offset = date.getTimezoneOffset();
//
//   return Math.sign(offset) !== -1
//     ? addMinutes(date, offset)
//     : subMinutes(date, Math.abs(offset));
// }
//
// export const shortPlace = str => {
//   const arr = str.split(" ");
//   const [first, ...remaining] = arr;
//   const len = remaining.join(" ").length;
//   return len > 18
//     ? `${remaining.join(" ").slice(0, 15)}...`
//     : `${remaining.join(" ").slice(0, 18)}`;
// };
//
// export const keyFunction = event => {
//   const formName = event.srcElement.form && event.srcElement.form.id;
//   const activeElementName = event.srcElement.name;
//   //console.log(event.srcElement.nodeName);
//   if (formName && (event.key === "Escape" || event.key === "Enter")) {
//     const inputs = document.forms[formName].getElementsByTagName("input");
//     let nextToFocus;
//     if (
//       event.srcElement.localName === "input" &&
//       event.key === "Escape" &&
//       event.srcElement.value.length > 0
//     ) {
//       const clearButton = document.getElementById(`${activeElementName}_clear`);
//       clearButton && clearButton.click();
//     }
//     if (event.srcElement.localName === "input" && event.key === "Enter") {
//       document.getElementById("submit").click();
//     }
//     // <<<<<<< HEAD
//     //     if (event.key === "Tab") {
//     //       console.log(event.srcElement);
//     // =======
//     //     //let inp = [];
//     //     if (event.srcElement.localName === "input" && event.key === "Tab") {
//     //       // const inp = document.getElementsByName("aktywnosc_id");
//     //       // const pr = inp[0].previousElementSibling;
//     //       // console.log(pr);
//     //       // pr.focus();
//     //       for (var i = 0; i < inputs.length; i++) {
//     //         //inp.push(inputs[i].name);
//     //         if (inputs[i].name === activeElementName) {
//     //           if (i < inputs.length - 1) {
//     //             nextToFocus = inputs[i + 1].name;
//     //             // console.log(inputs[i + 1].name);
//     //           } else if (i === inputs.length - 1) {
//     //             nextToFocus = inputs[0].name;
//     //           }
//     //         }
//     //       }
//     //       if (nextToFocus) {
//     //         if (nextToFocus.length > 0) {
//     //           if (document.getElementsByName(nextToFocus).length > 0) {
//     //             //console.log(document.getElementsByName(nextToFocus)[0]);
//     //             if (document.getElementsByName(nextToFocus)[0].type !== "hidden") {
//     //               document.getElementsByName(nextToFocus)[0].focus();
//     //               event.preventDefault();
//     //             } else {
//     // <<<<<<< HEAD
//     //               // document
//     //               //   .getElementsByName(nextToFocus)[0]
//     //               //   .nextElementSibling.focus();
//     // =======
//     //               document
//     //                 .getElementsByName(nextToFocus)[0]
//     //                 .nextElementSibling.focus();
//     // >>>>>>> db77da443473331a5790ce8b03b568e96e58917b
//     //             }
//     //           }
//     //         }
//     //       }
//     // >>>>>>> 2af33c1796deccefeae066994801b282b1bb4ead
//     //     }
//   }
// };

const Latinise = {};
Latinise.latin_map = {
  Á: "A",
  Ă: "A",
  Ắ: "A",
  Ặ: "A",
  Ằ: "A",
  Ẳ: "A",
  Ẵ: "A",
  Ǎ: "A",
  Â: "A",
  Ấ: "A",
  Ậ: "A",
  Ầ: "A",
  Ẩ: "A",
  Ẫ: "A",
  Ä: "A",
  Ǟ: "A",
  Ȧ: "A",
  Ǡ: "A",
  Ạ: "A",
  Ȁ: "A",
  À: "A",
  Ả: "A",
  Ȃ: "A",
  Ā: "A",
  Ą: "A",
  Å: "A",
  Ǻ: "A",
  Ḁ: "A",
  Ⱥ: "A",
  Ã: "A",
  Ꜳ: "AA",
  Æ: "AE",
  Ǽ: "AE",
  Ǣ: "AE",
  Ꜵ: "AO",
  Ꜷ: "AU",
  Ꜹ: "AV",
  Ꜻ: "AV",
  Ꜽ: "AY",
  Ḃ: "B",
  Ḅ: "B",
  Ɓ: "B",
  Ḇ: "B",
  Ƀ: "B",
  Ƃ: "B",
  Ć: "C",
  Č: "C",
  Ç: "C",
  Ḉ: "C",
  Ĉ: "C",
  Ċ: "C",
  Ƈ: "C",
  Ȼ: "C",
  Ď: "D",
  Ḑ: "D",
  Ḓ: "D",
  Ḋ: "D",
  Ḍ: "D",
  Ɗ: "D",
  Ḏ: "D",
  ǲ: "D",
  ǅ: "D",
  Đ: "D",
  Ƌ: "D",
  Ǳ: "DZ",
  Ǆ: "DZ",
  É: "E",
  Ĕ: "E",
  Ě: "E",
  Ȩ: "E",
  Ḝ: "E",
  Ê: "E",
  Ế: "E",
  Ệ: "E",
  Ề: "E",
  Ể: "E",
  Ễ: "E",
  Ḙ: "E",
  Ë: "E",
  Ė: "E",
  Ẹ: "E",
  Ȅ: "E",
  È: "E",
  Ẻ: "E",
  Ȇ: "E",
  Ē: "E",
  Ḗ: "E",
  Ḕ: "E",
  Ę: "E",
  Ɇ: "E",
  Ẽ: "E",
  Ḛ: "E",
  Ꝫ: "ET",
  Ḟ: "F",
  Ƒ: "F",
  Ǵ: "G",
  Ğ: "G",
  Ǧ: "G",
  Ģ: "G",
  Ĝ: "G",
  Ġ: "G",
  Ɠ: "G",
  Ḡ: "G",
  Ǥ: "G",
  Ḫ: "H",
  Ȟ: "H",
  Ḩ: "H",
  Ĥ: "H",
  Ⱨ: "H",
  Ḧ: "H",
  Ḣ: "H",
  Ḥ: "H",
  Ħ: "H",
  Í: "I",
  Ĭ: "I",
  Ǐ: "I",
  Î: "I",
  Ï: "I",
  Ḯ: "I",
  İ: "I",
  Ị: "I",
  Ȉ: "I",
  Ì: "I",
  Ỉ: "I",
  Ȋ: "I",
  Ī: "I",
  Į: "I",
  Ɨ: "I",
  Ĩ: "I",
  Ḭ: "I",
  Ꝺ: "D",
  Ꝼ: "F",
  Ᵹ: "G",
  Ꞃ: "R",
  Ꞅ: "S",
  Ꞇ: "T",
  Ꝭ: "IS",
  Ĵ: "J",
  Ɉ: "J",
  Ḱ: "K",
  Ǩ: "K",
  Ķ: "K",
  Ⱪ: "K",
  Ꝃ: "K",
  Ḳ: "K",
  Ƙ: "K",
  Ḵ: "K",
  Ꝁ: "K",
  Ꝅ: "K",
  Ĺ: "L",
  Ƚ: "L",
  Ľ: "L",
  Ļ: "L",
  Ḽ: "L",
  Ḷ: "L",
  Ḹ: "L",
  Ⱡ: "L",
  Ꝉ: "L",
  Ḻ: "L",
  Ŀ: "L",
  Ɫ: "L",
  ǈ: "L",
  Ł: "L",
  Ǉ: "LJ",
  Ḿ: "M",
  Ṁ: "M",
  Ṃ: "M",
  Ɱ: "M",
  Ń: "N",
  Ň: "N",
  Ņ: "N",
  Ṋ: "N",
  Ṅ: "N",
  Ṇ: "N",
  Ǹ: "N",
  Ɲ: "N",
  Ṉ: "N",
  Ƞ: "N",
  ǋ: "N",
  Ñ: "N",
  Ǌ: "NJ",
  Ó: "O",
  Ŏ: "O",
  Ǒ: "O",
  Ô: "O",
  Ố: "O",
  Ộ: "O",
  Ồ: "O",
  Ổ: "O",
  Ỗ: "O",
  Ö: "O",
  Ȫ: "O",
  Ȯ: "O",
  Ȱ: "O",
  Ọ: "O",
  Ő: "O",
  Ȍ: "O",
  Ò: "O",
  Ỏ: "O",
  Ơ: "O",
  Ớ: "O",
  Ợ: "O",
  Ờ: "O",
  Ở: "O",
  Ỡ: "O",
  Ȏ: "O",
  Ꝋ: "O",
  Ꝍ: "O",
  Ō: "O",
  Ṓ: "O",
  Ṑ: "O",
  Ɵ: "O",
  Ǫ: "O",
  Ǭ: "O",
  Ø: "O",
  Ǿ: "O",
  Õ: "O",
  Ṍ: "O",
  Ṏ: "O",
  Ȭ: "O",
  Ƣ: "OI",
  Ꝏ: "OO",
  Ɛ: "E",
  Ɔ: "O",
  Ȣ: "OU",
  Ṕ: "P",
  Ṗ: "P",
  Ꝓ: "P",
  Ƥ: "P",
  Ꝕ: "P",
  Ᵽ: "P",
  Ꝑ: "P",
  Ꝙ: "Q",
  Ꝗ: "Q",
  Ŕ: "R",
  Ř: "R",
  Ŗ: "R",
  Ṙ: "R",
  Ṛ: "R",
  Ṝ: "R",
  Ȑ: "R",
  Ȓ: "R",
  Ṟ: "R",
  Ɍ: "R",
  Ɽ: "R",
  Ꜿ: "C",
  Ǝ: "E",
  Ś: "S",
  Ṥ: "S",
  Š: "S",
  Ṧ: "S",
  Ş: "S",
  Ŝ: "S",
  Ș: "S",
  Ṡ: "S",
  Ṣ: "S",
  Ṩ: "S",
  Ť: "T",
  Ţ: "T",
  Ṱ: "T",
  Ț: "T",
  Ⱦ: "T",
  Ṫ: "T",
  Ṭ: "T",
  Ƭ: "T",
  Ṯ: "T",
  Ʈ: "T",
  Ŧ: "T",
  Ɐ: "A",
  Ꞁ: "L",
  Ɯ: "M",
  Ʌ: "V",
  Ꜩ: "TZ",
  Ú: "U",
  Ŭ: "U",
  Ǔ: "U",
  Û: "U",
  Ṷ: "U",
  Ü: "U",
  Ǘ: "U",
  Ǚ: "U",
  Ǜ: "U",
  Ǖ: "U",
  Ṳ: "U",
  Ụ: "U",
  Ű: "U",
  Ȕ: "U",
  Ù: "U",
  Ủ: "U",
  Ư: "U",
  Ứ: "U",
  Ự: "U",
  Ừ: "U",
  Ử: "U",
  Ữ: "U",
  Ȗ: "U",
  Ū: "U",
  Ṻ: "U",
  Ų: "U",
  Ů: "U",
  Ũ: "U",
  Ṹ: "U",
  Ṵ: "U",
  Ꝟ: "V",
  Ṿ: "V",
  Ʋ: "V",
  Ṽ: "V",
  Ꝡ: "VY",
  Ẃ: "W",
  Ŵ: "W",
  Ẅ: "W",
  Ẇ: "W",
  Ẉ: "W",
  Ẁ: "W",
  Ⱳ: "W",
  Ẍ: "X",
  Ẋ: "X",
  Ý: "Y",
  Ŷ: "Y",
  Ÿ: "Y",
  Ẏ: "Y",
  Ỵ: "Y",
  Ỳ: "Y",
  Ƴ: "Y",
  Ỷ: "Y",
  Ỿ: "Y",
  Ȳ: "Y",
  Ɏ: "Y",
  Ỹ: "Y",
  Ź: "Z",
  Ž: "Z",
  Ẑ: "Z",
  Ⱬ: "Z",
  Ż: "Z",
  Ẓ: "Z",
  Ȥ: "Z",
  Ẕ: "Z",
  Ƶ: "Z",
  Ĳ: "IJ",
  Œ: "OE",
  ᴀ: "A",
  ᴁ: "AE",
  ʙ: "B",
  ᴃ: "B",
  ᴄ: "C",
  ᴅ: "D",
  ᴇ: "E",
  ꜰ: "F",
  ɢ: "G",
  ʛ: "G",
  ʜ: "H",
  ɪ: "I",
  ʁ: "R",
  ᴊ: "J",
  ᴋ: "K",
  ʟ: "L",
  ᴌ: "L",
  ᴍ: "M",
  ɴ: "N",
  ᴏ: "O",
  ɶ: "OE",
  ᴐ: "O",
  ᴕ: "OU",
  ᴘ: "P",
  ʀ: "R",
  ᴎ: "N",
  ᴙ: "R",
  ꜱ: "S",
  ᴛ: "T",
  ⱻ: "E",
  ᴚ: "R",
  ᴜ: "U",
  ᴠ: "V",
  ᴡ: "W",
  ʏ: "Y",
  ᴢ: "Z",
  á: "a",
  ă: "a",
  ắ: "a",
  ặ: "a",
  ằ: "a",
  ẳ: "a",
  ẵ: "a",
  ǎ: "a",
  â: "a",
  ấ: "a",
  ậ: "a",
  ầ: "a",
  ẩ: "a",
  ẫ: "a",
  ä: "a",
  ǟ: "a",
  ȧ: "a",
  ǡ: "a",
  ạ: "a",
  ȁ: "a",
  à: "a",
  ả: "a",
  ȃ: "a",
  ā: "a",
  ą: "a",
  ᶏ: "a",
  ẚ: "a",
  å: "a",
  ǻ: "a",
  ḁ: "a",
  ⱥ: "a",
  ã: "a",
  ꜳ: "aa",
  æ: "ae",
  ǽ: "ae",
  ǣ: "ae",
  ꜵ: "ao",
  ꜷ: "au",
  ꜹ: "av",
  ꜻ: "av",
  ꜽ: "ay",
  ḃ: "b",
  ḅ: "b",
  ɓ: "b",
  ḇ: "b",
  ᵬ: "b",
  ᶀ: "b",
  ƀ: "b",
  ƃ: "b",
  ɵ: "o",
  ć: "c",
  č: "c",
  ç: "c",
  ḉ: "c",
  ĉ: "c",
  ɕ: "c",
  ċ: "c",
  ƈ: "c",
  ȼ: "c",
  ď: "d",
  ḑ: "d",
  ḓ: "d",
  ȡ: "d",
  ḋ: "d",
  ḍ: "d",
  ɗ: "d",
  ᶑ: "d",
  ḏ: "d",
  ᵭ: "d",
  ᶁ: "d",
  đ: "d",
  ɖ: "d",
  ƌ: "d",
  ı: "i",
  ȷ: "j",
  ɟ: "j",
  ʄ: "j",
  ǳ: "dz",
  ǆ: "dz",
  é: "e",
  ĕ: "e",
  ě: "e",
  ȩ: "e",
  ḝ: "e",
  ê: "e",
  ế: "e",
  ệ: "e",
  ề: "e",
  ể: "e",
  ễ: "e",
  ḙ: "e",
  ë: "e",
  ė: "e",
  ẹ: "e",
  ȅ: "e",
  è: "e",
  ẻ: "e",
  ȇ: "e",
  ē: "e",
  ḗ: "e",
  ḕ: "e",
  ⱸ: "e",
  ę: "e",
  ᶒ: "e",
  ɇ: "e",
  ẽ: "e",
  ḛ: "e",
  ꝫ: "et",
  ḟ: "f",
  ƒ: "f",
  ᵮ: "f",
  ᶂ: "f",
  ǵ: "g",
  ğ: "g",
  ǧ: "g",
  ģ: "g",
  ĝ: "g",
  ġ: "g",
  ɠ: "g",
  ḡ: "g",
  ᶃ: "g",
  ǥ: "g",
  ḫ: "h",
  ȟ: "h",
  ḩ: "h",
  ĥ: "h",
  ⱨ: "h",
  ḧ: "h",
  ḣ: "h",
  ḥ: "h",
  ɦ: "h",
  ẖ: "h",
  ħ: "h",
  ƕ: "hv",
  í: "i",
  ĭ: "i",
  ǐ: "i",
  î: "i",
  ï: "i",
  ḯ: "i",
  ị: "i",
  ȉ: "i",
  ì: "i",
  ỉ: "i",
  ȋ: "i",
  ī: "i",
  į: "i",
  ᶖ: "i",
  ɨ: "i",
  ĩ: "i",
  ḭ: "i",
  ꝺ: "d",
  ꝼ: "f",
  ᵹ: "g",
  ꞃ: "r",
  ꞅ: "s",
  ꞇ: "t",
  ꝭ: "is",
  ǰ: "j",
  ĵ: "j",
  ʝ: "j",
  ɉ: "j",
  ḱ: "k",
  ǩ: "k",
  ķ: "k",
  ⱪ: "k",
  ꝃ: "k",
  ḳ: "k",
  ƙ: "k",
  ḵ: "k",
  ᶄ: "k",
  ꝁ: "k",
  ꝅ: "k",
  ĺ: "l",
  ƚ: "l",
  ɬ: "l",
  ľ: "l",
  ļ: "l",
  ḽ: "l",
  ȴ: "l",
  ḷ: "l",
  ḹ: "l",
  ⱡ: "l",
  ꝉ: "l",
  ḻ: "l",
  ŀ: "l",
  ɫ: "l",
  ᶅ: "l",
  ɭ: "l",
  ł: "l",
  ǉ: "lj",
  ſ: "s",
  ẜ: "s",
  ẛ: "s",
  ẝ: "s",
  ḿ: "m",
  ṁ: "m",
  ṃ: "m",
  ɱ: "m",
  ᵯ: "m",
  ᶆ: "m",
  ń: "n",
  ň: "n",
  ņ: "n",
  ṋ: "n",
  ȵ: "n",
  ṅ: "n",
  ṇ: "n",
  ǹ: "n",
  ɲ: "n",
  ṉ: "n",
  ƞ: "n",
  ᵰ: "n",
  ᶇ: "n",
  ɳ: "n",
  ñ: "n",
  ǌ: "nj",
  ó: "o",
  ŏ: "o",
  ǒ: "o",
  ô: "o",
  ố: "o",
  ộ: "o",
  ồ: "o",
  ổ: "o",
  ỗ: "o",
  ö: "o",
  ȫ: "o",
  ȯ: "o",
  ȱ: "o",
  ọ: "o",
  ő: "o",
  ȍ: "o",
  ò: "o",
  ỏ: "o",
  ơ: "o",
  ớ: "o",
  ợ: "o",
  ờ: "o",
  ở: "o",
  ỡ: "o",
  ȏ: "o",
  ꝋ: "o",
  ꝍ: "o",
  ⱺ: "o",
  ō: "o",
  ṓ: "o",
  ṑ: "o",
  ǫ: "o",
  ǭ: "o",
  ø: "o",
  ǿ: "o",
  õ: "o",
  ṍ: "o",
  ṏ: "o",
  ȭ: "o",
  ƣ: "oi",
  ꝏ: "oo",
  ɛ: "e",
  ᶓ: "e",
  ɔ: "o",
  ᶗ: "o",
  ȣ: "ou",
  ṕ: "p",
  ṗ: "p",
  ꝓ: "p",
  ƥ: "p",
  ᵱ: "p",
  ᶈ: "p",
  ꝕ: "p",
  ᵽ: "p",
  ꝑ: "p",
  ꝙ: "q",
  ʠ: "q",
  ɋ: "q",
  ꝗ: "q",
  ŕ: "r",
  ř: "r",
  ŗ: "r",
  ṙ: "r",
  ṛ: "r",
  ṝ: "r",
  ȑ: "r",
  ɾ: "r",
  ᵳ: "r",
  ȓ: "r",
  ṟ: "r",
  ɼ: "r",
  ᵲ: "r",
  ᶉ: "r",
  ɍ: "r",
  ɽ: "r",
  ↄ: "c",
  ꜿ: "c",
  ɘ: "e",
  ɿ: "r",
  ś: "s",
  ṥ: "s",
  š: "s",
  ṧ: "s",
  ş: "s",
  ŝ: "s",
  ș: "s",
  ṡ: "s",
  ṣ: "s",
  ṩ: "s",
  ʂ: "s",
  ᵴ: "s",
  ᶊ: "s",
  ȿ: "s",
  ɡ: "g",
  ᴑ: "o",
  ᴓ: "o",
  ᴝ: "u",
  ť: "t",
  ţ: "t",
  ṱ: "t",
  ț: "t",
  ȶ: "t",
  ẗ: "t",
  ⱦ: "t",
  ṫ: "t",
  ṭ: "t",
  ƭ: "t",
  ṯ: "t",
  ᵵ: "t",
  ƫ: "t",
  ʈ: "t",
  ŧ: "t",
  ᵺ: "th",
  ɐ: "a",
  ᴂ: "ae",
  ǝ: "e",
  ᵷ: "g",
  ɥ: "h",
  ʮ: "h",
  ʯ: "h",
  ᴉ: "i",
  ʞ: "k",
  ꞁ: "l",
  ɯ: "m",
  ɰ: "m",
  ᴔ: "oe",
  ɹ: "r",
  ɻ: "r",
  ɺ: "r",
  ⱹ: "r",
  ʇ: "t",
  ʌ: "v",
  ʍ: "w",
  ʎ: "y",
  ꜩ: "tz",
  ú: "u",
  ŭ: "u",
  ǔ: "u",
  û: "u",
  ṷ: "u",
  ü: "u",
  ǘ: "u",
  ǚ: "u",
  ǜ: "u",
  ǖ: "u",
  ṳ: "u",
  ụ: "u",
  ű: "u",
  ȕ: "u",
  ù: "u",
  ủ: "u",
  ư: "u",
  ứ: "u",
  ự: "u",
  ừ: "u",
  ử: "u",
  ữ: "u",
  ȗ: "u",
  ū: "u",
  ṻ: "u",
  ų: "u",
  ᶙ: "u",
  ů: "u",
  ũ: "u",
  ṹ: "u",
  ṵ: "u",
  ᵫ: "ue",
  ꝸ: "um",
  ⱴ: "v",
  ꝟ: "v",
  ṿ: "v",
  ʋ: "v",
  ᶌ: "v",
  ⱱ: "v",
  ṽ: "v",
  ꝡ: "vy",
  ẃ: "w",
  ŵ: "w",
  ẅ: "w",
  ẇ: "w",
  ẉ: "w",
  ẁ: "w",
  ⱳ: "w",
  ẘ: "w",
  ẍ: "x",
  ẋ: "x",
  ᶍ: "x",
  ý: "y",
  ŷ: "y",
  ÿ: "y",
  ẏ: "y",
  ỵ: "y",
  ỳ: "y",
  ƴ: "y",
  ỷ: "y",
  ỿ: "y",
  ȳ: "y",
  ẙ: "y",
  ɏ: "y",
  ỹ: "y",
  ź: "z",
  ž: "z",
  ẑ: "z",
  ʑ: "z",
  ⱬ: "z",
  ż: "z",
  ẓ: "z",
  ȥ: "z",
  ẕ: "z",
  ᵶ: "z",
  ᶎ: "z",
  ʐ: "z",
  ƶ: "z",
  ɀ: "z",
  ﬀ: "ff",
  ﬃ: "ffi",
  ﬄ: "ffl",
  ﬁ: "fi",
  ﬂ: "fl",
  ĳ: "ij",
  œ: "oe",
  ﬆ: "st",
  ₐ: "a",
  ₑ: "e",
  ᵢ: "i",
  ⱼ: "j",
  ₒ: "o",
  ᵣ: "r",
  ᵤ: "u",
  ᵥ: "v",
  ₓ: "x"
};
export const latinize = string => {
  return string.replace(/[^A-Za-z0-9\[\] ]/g, function(a) {
    return Latinise.latin_map[a] || a;
  });
};
