export const getUser = (token) => {
    if(!token) {
        return null;
    }

    return JSON.parse(atob(token.split('.')[1]));
}

export const isTokenExpired = (token) => {
    if(!token) {
        return true;
    }

    const user = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = user.exp * 1000;

    return Date.now() > expiryTime;
}

export const getToken = () => {
    return localStorage.getItem('token');
}