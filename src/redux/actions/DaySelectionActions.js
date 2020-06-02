export function selectWeek(week) {
  return {
    type: "SELECT_WEEK",
    payload: week,
  };
}
export function setDisabledDays(days) {
  return {
    type: "DISABLED_DAYS",
    payload: days,
  };
}
export function getWeek() {
  return;
}

export function selectDay(day) {
  return {
    type: "SELECT_DAY",
    payload: day,
  };
}
