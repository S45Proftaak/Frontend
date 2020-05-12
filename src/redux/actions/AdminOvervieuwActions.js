export const fetchOvervieuwData = () => ({
  type: "FETCHING_OVERVIEUW_DATA",
  payload: null,
});

export const fetchedOvervieuwData = (payload) => ({
  type: "LOGIN_OVERVIEUW_FETCHED",
  payload: payload,
});
