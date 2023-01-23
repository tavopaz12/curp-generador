import { getDatos } from "./getDatos.js";

const form = document.querySelector(".generateCurp");
const vocales = ["A", "E", "I", "O", "U"];
const template = document.querySelector(".template");

const getDate = () => {
  var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };

  const date = new Date(getDatos().fechaNacimiento).toLocaleDateString(
    "es-MX",
    options
  );

  return date;
};

const getFirstVocal = () => {
  let vocalFind = [];

  getDatos()
    .apellidoPaterno.toUpperCase()
    .split("")
    .filter((findVocal) => {
      vocales.find((vocal) => {
        if (vocal === findVocal) {
          vocalFind.push(findVocal);
        }
      });
    });

  return vocalFind[0];
};

const getFirstLetterLastName = () => {
  return getDatos().apellidoPaterno.toUpperCase().split("")[0];
};

const getFirstLetterSecondLastName = () => {
  return getDatos().apellidoMaterno.toUpperCase().split("")[0];
};

const getName = () => {
  const arrName = getDatos().nombre.split(" ");

  if (arrName.length > 1) {
    return arrName[1];
  }

  if ((arrName.length = 1)) {
    return arrName[0];
  }
};

const getFirtsLetterName = () => {
  return getName().toUpperCase().split("")[0];
};

const consonantes = () => {
  const data = new FormData(form);
  const apellidoPaterno = getDatos()
    .apellidoPaterno.slice(1)
    .toUpperCase()
    .split("");
  const apellidoMaterno = getDatos()
    .apellidoMaterno.slice(1)
    .toUpperCase()
    .split("");
  const nombre = getName().toUpperCase().split("");
  let result = "";

  for (let i = 1; i < apellidoPaterno.length; i++) {
    let c = apellidoPaterno[i];
    if (vocales.indexOf(c) < 0) {
      result += c;
      break;
    }
  }

  for (let i = 1; i < apellidoMaterno.length; i++) {
    let c = apellidoMaterno[i];
    if (vocales.indexOf(c) < 0) {
      result += c;
      break;
    }
  }

  for (let i = 1; i < nombre.length; i++) {
    let c = nombre[i];
    if (vocales.indexOf(c) < 0) {
      result += c;
      break;
    }
  }

  return result;
};

const generateCurp = () => {
  const findVocal = getFirstVocal();
  const firstLetterLastName = getFirstLetterLastName();
  const firstLetterSecondLastName = getFirstLetterSecondLastName();
  const firstLetterName = getFirtsLetterName();
  const gender = getDatos().gender;
  const estado = getDatos().estado;
  const csn = consonantes();

  const aa = getDate().split("/")[2].slice(2);
  const mm = getDate().split("/")[1];
  const dd = getDate().split("/")[0];

  const curp =
    firstLetterLastName +
    findVocal +
    firstLetterSecondLastName +
    firstLetterName +
    aa +
    mm +
    dd +
    gender +
    estado +
    csn;

  return curp;
};

function tabla(i, x) {
  if (i >= "0" && i <= "9") return x - 48;
  else if (i >= "A" && i <= "N") return x - 55;
  else if (i >= "O" && i <= "Z") return x - 54;
  else return 0;
}

function ultdig() {
  const curp = generateCurp();

  var i,
    c,
    dv = 0;
  //en este punto, la variable curp tiene todo excepto el ultimo digito verificador
  //ejemplo: JIRA0302024MVZMVNA
  for (i = 0; i < curp.length; i++) {
    c = tabla(curp.charAt(i), curp.charCodeAt(i));
    dv += c * (18 - i);
  }
  dv %= 10;

  return dv == 0 ? 0 : 10 - dv;
}

const penulDigit = () => {
  const fecha = getDate().split("/")[2].slice(0, 2);

  const digit = fecha.substring(0, 2) === "19" ? "0" : "A";

  return digit;
};

export function showCurp() {
  const curp = generateCurp();
  const penDigit = penulDigit();
  const ultDigist = ultdig();

  template.innerHTML = `<div class="clave__obtenida">
<p class="showCurp">${curp + penDigit + ultDigist}</p>
</div>`;
}
