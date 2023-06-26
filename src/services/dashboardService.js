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

export const dashboardDepartmentService = () =>
    axiosConfig
        .get(`/`)
        .then((response) => response.data)
        .catch(handleResponse);

export const dashboardUserService = () =>
    axiosConfig
        .get(`/`)
        .then((response) => response.data)
        .catch(handleResponse);

export const dashboardManagerandStaffService = () =>
    axiosConfig
        .get(`/`)
        .then((response) => response.data)
        .catch(handleResponse);

