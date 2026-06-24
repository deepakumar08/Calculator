const display = document.getElementById("display");
const historyDiv = document.getElementById("history");

let isDegree = true;

/* Input */
function add(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = "";
}

function del() {
  display.value = display.value.slice(0, -1);
}

/* Theme */
function toggleTheme() {
  document.body.classList.toggle("dark");
}

/* Angle Mode */
function toggleAngle() {
  isDegree = !isDegree;
  document.getElementById("angleMode").innerText = isDegree ? "DEG" : "RAD";
}

function toRad(x) {
  return isDegree ? x * Math.PI / 180 : x;
}

/* Calculate */
function calculate() {
  try {
    let exp = display.value;

    exp = exp
      .replace(/sin\(([^)]+)\)/g, (_, x) => Math.sin(toRad(eval(x))))
      .replace(/cos\(([^)]+)\)/g, (_, x) => Math.cos(toRad(eval(x))))
      .replace(/tan\(([^)]+)\)/g, (_, x) => Math.tan(toRad(eval(x))))
      .replace(/log\(([^)]+)\)/g, (_, x) => Math.log10(eval(x)))
      .replace(/ln\(([^)]+)\)/g, (_, x) => Math.log(eval(x)));

    let result = Function('"use strict";return (' + exp + ')')();

    display.value = result;

    addHistory(exp + " = " + result);

  } catch {
    display.value = "Error";
  }
}

/* History */
function addHistory(text) {
  let div = document.createElement("div");
  div.innerText = text;
  div.onclick = () => display.value = text.split("=")[0];
  historyDiv.appendChild(div);
}

/* Keyboard */
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || "+-*/().".includes(e.key)) {
    add(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    del();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});