
export const fetchLoginData = () => ({
    type: "FETCHING_LOGIN_DATA",
    payload: null
});

export const fetchedLoginData = (token) => ({
    type: "LOGIN_DATA_FETCHED",
    payload: token
});

export const logout = () => ({
    type: "LOGOUT",
    payload: null
});