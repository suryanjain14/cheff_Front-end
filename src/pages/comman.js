
// return user data from  session storage
export const  getUser = () => {
    const  userStr  = sessionStorage.getItem('data');
    if(userStr)  return JSON.parse(userStr);
    else return null;
}

// return access_token from session storage

export const getaccess_Token = () => {
    return  sessionStorage.getItem('access_token') || null;
}

// remove user and access_token from session
export const removeUserSession = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('data');
}


// set access_token and user from the session storage

export const setUserSession = (access_token,data) => {
    sessionStorage.setItem('access_token',access_token);
    sessionStorage.setItem('data',JSON.stringify(data));
}