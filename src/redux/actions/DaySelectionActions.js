export function selectWeek(week) {
  return {
    type: "SELECT_WEEK",
    payload: week,
  };
}

export const selectDay = (day) => ({
  type: "SELECT_DAY",
  payload: day,
}); //UseSelector() UseDispatch()
