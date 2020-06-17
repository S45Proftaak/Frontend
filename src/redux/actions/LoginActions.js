
export const fetchLoginData = () => ({
    type: "FETCHING_LOGIN_DATA",
    payload: null
});

export const fetchedLoginData = (token) => ({
    type: "LOGIN_DATA_FETCHED",
    payload: token
});

export const fetchedError = (error) => ({
    type: "LOGIN_ERROR",
    error: error
});

export const resetError = (error) => ({
    type: "RESET_ERROR",
    error: error
});

export const logout = () => ({
    type: "LOGOUT",
    payload: null
});