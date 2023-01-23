import { showCurp } from "./getCurp.js";

const form = document.querySelector(".generateCurp");
const button = document.querySelector(".button");

form.addEventListener("submit", (e)=>{
  e.preventDefault()
  button.classList.add("active");
  setTimeout((e)=>{
    showCurp(e)
    button.classList.remove("active");
    button.querySelector("i").classList.replace("bx-cloud-download", "bx-check-circle")
    button.querySelector("span").innerText = "Clave Generada";
  },4000);
  setTimeout(() => {
    button.classList.remove("active");
    button
      .querySelector("i")
      .classList.replace("bx-check-circle", "bx-cloud-download");
    button.querySelector("span").innerText = "Generar Curp";
  }, 10000);
});
