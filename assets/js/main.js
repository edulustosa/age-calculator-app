const date = new Date();
const form = document.querySelector("form");
const yearInput = document.querySelector(".year-input");
const monthInput = document.querySelector(".month-input");
const dayInput = document.querySelector(".day-input");
const inputs = document.querySelectorAll("input");

const monthsOfTheYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let isValid = true;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  reset();

  const userDay = Number(dayInput.value);
  const userMonth = Number(monthInput.value) - 1;
  const userYear = Number(yearInput.value);

  isANumber();
  itsLeapYear(userYear);
  validDay(userDay, userMonth);
  validMonth(userMonth);
  validYear(userYear);

  if (isValid) calculateDate(userYear, userMonth, userDay);
});

for (let input of inputs) {
  input.addEventListener("invalid", (e) => {
    e.preventDefault();

    input.id = "error-input";
    input.previousElementSibling.id = "error-input";
    input.nextElementSibling.innerHTML = "This field is required";
  });
}

function reset() {
  isValid = true;
  monthsOfTheYear[1] = 28;

  for (let input of inputs) {
    input.id = "";
    input.previousElementSibling.id = "";
    input.nextElementSibling.innerHTML = "";
  }
}

function isANumber() {
  for (let input of inputs) {
    const aux = Number(input.value);
    if (isNaN(aux)) {
      isValid = false;
      input.id = "error-input";
      input.previousElementSibling.id = "error-input";
      input.nextElementSibling.innerHTML = "Must be a Number";
    }
  }
}

function itsLeapYear(year) {
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    monthsOfTheYear[1] = 29;
  }
}

function validDay(day, index) {
  if (day < 1 || day > 31) {
    isValid = false;
    setError("Must be a valid day", "day-input");
  } else if (day > monthsOfTheYear[index]) {
    isValid = false;
    setError("Must be a valid date", "day-input");
  }
}

function validMonth(month) {
  if (month > 11 || month < 0) {
    isValid = false;
    setError("Must be a valid month", "month-input");
  }
}

function validYear(year) {
  if (year > date.getFullYear() && year > 1000) {
    isValid = false;
    setError("Must be a valid year", "year-input");
  }
}

function setError(text, cs) {
  for (let input of inputs) {
    if (input.classList.contains(cs)) {
      input.id = "error-input";
      input.previousElementSibling.id = "error-input";
      input.nextElementSibling.innerHTML = text;
    }
  }
}

function calculateDate(year, month, day) {
  const userBirthdate = new Date(year, month, day);
  const dateDiff = new Date(date - userBirthdate);

  const userYear = dateDiff.getFullYear() - 1970;
  const userMonth = dateDiff.getMonth();
  const userDay = dateDiff.getDate() - 1;

  setResult(userYear, userMonth, userDay);
}

function setResult(year, month, day) {
  const resultYear = document.querySelector(".result-year");
  const resultMonth = document.querySelector(".result-month");
  const resultDay = document.querySelector(".result-day");

  resultYear.innerHTML = year;
  resultMonth.innerHTML = month;
  resultDay.innerHTML = day;
}
