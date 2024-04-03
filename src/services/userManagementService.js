import axiosConfig from "../utils/axios";

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

export const fetchUserManagementService = (data) =>
  axiosConfig
    .get(``)
    .then((response) => response.data)
    .catch(handleResponse);

export const createUserManagementService = (data) =>
  axiosConfig
    .post(``, data)
    .then((response) => response.data)
    .catch(handleResponse);

export const updateUserManagementService = (data) =>
  axiosConfig
    .post(``, data)
    .then((response) => response.data)
    .catch(handleResponse);

export const deleteUserManagementService = (data) =>
  axiosConfig
    .post(``, data)
    .then((response) => response.data)
    .catch(handleResponse);

export const getSingleUserManagementService = (data) =>
  axiosConfig
    .get(``)
    .then((response) => response.data)
    .catch(handleResponse);
