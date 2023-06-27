import axiosConfig from '../utils/axios';

const handleResponse = (error) => {
    if (
        error.response &&
        (error.response.status === 500 ||
            error.response.status === 400 ||
            error.response.status === 401 ||
            error.response.status === 422)
    ) {
        return error.response && error.response.data;
    }
    return error.response && error.response.data;
};
export const fetchLoginService = (data) =>
    axiosConfig
        .post(`/auth/login`, data)
        .then((response) => response)
        .catch(handleResponse);

export const fetchSignupService = (data) =>
    axiosConfig
        .post(`/auth/signup`, data)
        .then((response) => response.data)
        .catch(handleResponse);

export function saveTokenInLocalStorage(tokenDetails) {
    localStorage.setItem('Details', tokenDetails);
}

export const fetchGoogleLoginService = (data) =>
    axiosConfig
        .get(``)
        .then((response) => response.data)
        .catch(handleResponse);
