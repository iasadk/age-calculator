const form = document.querySelector("form");
// console.log(form)

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Clearing Previous Error Messages:
  document.querySelector(".day-error").textContent = "";
  document.querySelector(".month-error").textContent = "";
  document.querySelector(".year-error").textContent = "";

  // Clearing Previous Results Messages:
  document.querySelector(".day-placeholder").textContent = "- - ";
  document.querySelector(".month-placeholder").textContent = "- - ";
  document.querySelector(".year-placeholder").textContent = "- - ";

  // Clearing All styles from previous error input's :
  [...document.getElementsByClassName("input-wrapper")].forEach((v) =>
    v.classList.remove("throw-error")
  );

  // Getting form input values
  const day = document.getElementById("day").value.trim();
  const month = document.getElementById("month").value.trim();
  const year = document.getElementById("year").value.trim();

  const isDayValid = validateInput(day, "day");
  const isMonthValid = validateInput(month, "month");
  const isYearValid = validateInput(year, "year");

  if (!isDayValid) {
    document.querySelector(".day-error").textContent = "Must be a valid date";
    addThrowErrorClass("day");
    return;
  }
  if (!isMonthValid) {
    document.querySelector(".month-error").textContent =
      "Must be a valid month";
    addThrowErrorClass("month");
    return;
  }
  if (!isYearValid) {
    document.querySelector(".year-error").textContent = "Must be a valid year";
    addThrowErrorClass("year");
    return;
  }

  //   Calculating The Difference in term of Days, Months and Year
  const formattedDate = formatEnteredDate(day, month, year);
  const finalResult = calculateDifferenceInDays(formattedDate);

  // Adding New Results Messages:
  document.querySelector(".day-placeholder").textContent = `${finalResult[0]}`;
  document.querySelector(".month-placeholder").textContent = `${finalResult[1]}`;
  document.querySelector(".year-placeholder").textContent = `${finalResult[2]}`;

});

const validateInput = (value, type) => {
  if (type === "day") {
    const number = parseInt(value);
    if (number > 0 && number <= 31) {
      return true;
    } else {
      return false;
    }
  } else if (type === "month" && value.length == 2) {
    const number = parseInt(value);
    if (number > 0 && number <= 12) {
      return true;
    } else {
      return false;
    }
  } else {
    const currentYear = new Date().getFullYear();
    const enteredYear = parseInt(value);
    if (enteredYear <= currentYear && value.length == 4) {
      return true;
    } else {
      return false;
    }
  }
};

const addThrowErrorClass = (type) => {
  const wrapper = document.querySelector(`.${type}-input-wrapper`);
  wrapper.classList.add("throw-error");
};

const getCurrentFormattedDate = () => {
  var currentDate = new Date();

  var year = currentDate.getFullYear();

  var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);

  var day = ("0" + currentDate.getDate()).slice(-2);

  // Format the date as "YYYY-MM-DD"
  var formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
};
const formatEnteredDate = (day, month, year) => {
  // YYYY-MM-DD
  return `${year}-${month}-${day}`;
};
const calculateDifferenceInDays = (enteredDate) => {
  // Create the two date objects
  const date1 = new Date(getCurrentFormattedDate()); // Assuming the format is YYYY-MM-DD
  const date2 = new Date(enteredDate);

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());

  // Calculate the number of days, year and month
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const diffMonths = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.4375)); // Approximate number of days in a month
  const diffYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25)); // Approximate number of days in a year
  return [diffDays, diffMonths, diffYears]
};