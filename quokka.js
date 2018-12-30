const ar1 = ["jan", "marek", "antek"];
const ar2 = ["skradanie", "strzelanie", "celowanie"];

const nowy = () => {
  const array = [];

  for (player of ar1) {
    // array.push(variable)
    for (konkurencja of ar2) {
      const ob = { imie: player, konk: konkurencja };
      array.push(ob);
    }
  }

  console.log(array);
};

nowy();
