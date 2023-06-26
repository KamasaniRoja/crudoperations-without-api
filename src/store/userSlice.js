import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from './messageSlice';
import {
    startLoading1,
    clearLoading1,
    startLoading3,
    clearLoading3,
} from './loaderSlice';
import {
    fetchUserManagementService,
    createUserManagementService,
    updateUserManagementService,
    deleteUserManagementService,
} from '../services/userManagementService';

export const createUsersList = createAsyncThunk('users/createUsersList', async (data, { dispatch, getState }) => {
    const state = getState();
    const { usersList, usersCount } = state.users;
    dispatch(startLoading1());
    try {
        const response = await createUserManagementService(data);
        if (response.status) {
            dispatch(clearLoading1());
            dispatch(
                showMessage({
                    message: 'User Created',
                    variant: 'success',
                })
            );
            return { usersList: [response.user, ...usersList], count: Number(usersCount) + 1, response };
        }
        dispatch(clearLoading1());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { usersList, count: usersCount, response };
    } catch (error) {
        dispatch(clearLoading1());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { usersList, count: usersCount, response: { status: false } };
    }
});

export const updateUsersList = createAsyncThunk('users/updateUsersList', async (data, { dispatch, getState }) => {
    const state = getState();
    let { usersList } = state.users;
    dispatch(startLoading1());
    try {
        const response = await updateUserManagementService(data);
        if (response.status) {
            dispatch(clearLoading1());
            dispatch(showMessage({ message: 'User Updated', variant: 'success' }));
            usersList = usersList.map((res) => {
                if (res.id === response.user.id) {
                    return { ...response.user };
                }
                return { ...res };
            });
            return { list: usersList, response };
        }
        dispatch(clearLoading1());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { list: usersList, response };
    } catch (error) {
        dispatch(clearLoading1());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { list: usersList, response: { status: false } };
    }
});

export const deleteUsersList = createAsyncThunk('users/deleteUsersList', async (data, { dispatch, getState }) => {
    const state = getState();
    const { usersList, usersCount } = state.users;
    dispatch(startLoading1());
    try {
        const toDeleteBody = { id: data };
        const response = await deleteUserManagementService(toDeleteBody);
        if (response.status) {
            dispatch(clearLoading1());
            dispatch(showMessage({ message: 'User Deleted', variant: 'success' }));
            const list = usersList.filter((res) => res.id !== data);
            return { list, count: Number(usersCount) - 1 };
        }
        dispatch(clearLoading1());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { list: usersList, count: usersCount };
    } catch (error) {
        dispatch(clearLoading1());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { list: usersList, count: usersCount };
    }
});

export const getUsersList = createAsyncThunk('users/getUsersList', async (data, { dispatch }) => {
    dispatch(startLoading3());
    try {
        const response = await fetchUserManagementService(data);
        if (response.status) {
            dispatch(clearLoading3());
            return { usersList: response.users.data, count: response.users.total };
        }
        dispatch(clearLoading3());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { usersList: [], count: 0 };
    } catch (error) {
        dispatch(clearLoading3());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { usersList: [], count: 0 };
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [],
        usersCount: 0,
    },
    reducers: {},
    extraReducers: {
        [createUsersList.fulfilled]: (state, action) => ({
            ...state,
            usersList: action.payload.usersList,
            usersCount: action.payload.count,
        }),
        [updateUsersList.fulfilled]: (state, action) => ({ ...state, usersList: action.payload.list }),
        [deleteUsersList.fulfilled]: (state, action) => ({
            ...state,
            usersList: action.payload.list,
            usersCount: action.payload.count,
        }),
        [getUsersList.fulfilled]: (state, action) => ({
            ...state,
            usersList: action.payload.usersList,
            usersCount: action.payload.count,
        }),
    },
});

export default usersSlice.reducer;
