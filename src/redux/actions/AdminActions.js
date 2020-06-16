export const fetchAdminData = () => ({
    type: "FETCHING_ADMIN_DATA",
    payload: null,
  });
  
  export const fetchedAdminData = (payload) => ({
    type: "FETCHED_ADMIN_DATA",
    payload: payload,
  });
  
  export const changeUserRole = (newArray) => ({
    type: "FETCHED_ADMIN_DATA",
    payload: newArray
  })