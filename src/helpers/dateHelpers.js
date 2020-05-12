export function getCurrentWeek() {
  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let week = Math.ceil(((now - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  return week;
}

/* -------------------------------------------------- */

let weekOfFirstMonday;

function getFirstMonday() {
  //console.log("Executing getFirstMonday()");
  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let firstMonday;

  // If January 1st is a SUNDAY, January 2nd is a MONDAY.
  if (onejan.getDay() === 0) {
    firstMonday = new Date(onejan.getFullYear(), 0, 2);
    weekOfFirstMonday = 1;
  }

  // Else if January 1st is a MONDAY, set as the first day
  else if (onejan.getDay() === 1) {
    firstMonday = onejan;
    weekOfFirstMonday = 2;
  }

  // Else, aka January 1st isn't a sunday nor monday
  else {
    let amountOfDaysTillFirstMonday = 7 - onejan.getDay() + 1;
    firstMonday = new Date(
      onejan.getFullYear(),
      0,
      onejan.getDate() + amountOfDaysTillFirstMonday
    );
    weekOfFirstMonday = 2;
  }
  //console.log("First monday is the following:");
  //console.log(firstMonday);
  return firstMonday;
}

/* -------------------------------------------------- */

export function getDayOfMonthByWeekAndDay(week, day) {
  const firstMonday = getFirstMonday();
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const dayAmount = (week - 1) * 7 - oneJan.getDate() + day;
  console.log("DayAmount is " + dayAmount);
  const myDate = new Date(oneJan.setDate(dayAmount));
  //myDate.setDate(dayAmount * 24 * 60 * 60 * 1000);
  //console.log("Final time is the following:");
  //console.log(myDate);
  return myDate;
}

export function formatDateToString(date) {
  let formattedDate = date.getDate().toString();
  let formattedMonth = (parseInt(date.getMonth()) + 1).toString();
  if (formattedDate.length === 1) {
    formattedDate = "0" + formattedDate;
  }
  if (formattedMonth.length === 1) {
    formattedMonth = "0" + formattedMonth;
  }
  return date.getFullYear() + "-" + formattedMonth + "-" + formattedDate;
}
