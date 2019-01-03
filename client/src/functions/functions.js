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

      const bPL = b[property]
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
