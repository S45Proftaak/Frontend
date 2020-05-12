export function getCurrentWeek() {
  let now = new Date();
  let onejan = new Date(now.getFullYear(), 0, 1);
  let week = Math.ceil(((now - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  return week;
}

export function getDayOfMonthByWeekAndDay(week, day) {
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

export function formatFetchDate(date) {
  if (typeof date === "object") {
    let stringdate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return stringdate;
  } else {
    throw new Error("Type is not a Date");
  }
}
