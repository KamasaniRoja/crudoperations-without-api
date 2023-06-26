import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from './messageSlice';
import {
    startLoading1,
    clearLoading1,
    startLoading3,
    clearLoading3,
} from './loaderSlice';
import {
    fetchRolesListService,
    createRolesListService,
    updateRolesListService,
    deleteRolesListService,
} from '../services/roleListService';

export const createRolesList = createAsyncThunk('roles/createRolesList', async (data, { dispatch, getState }) => {
    const state = getState();
    const { rolesList, rolesCount } = state.roles;
    dispatch(startLoading1());
    try {
        const response = await createRolesListService(data);
        if (response.status) {
            dispatch(clearLoading1());
            dispatch(
                showMessage({
                    message: 'Role Created',
                    variant: 'success',
                })
            );
            return { rolesList: [response.role, ...rolesList], count: Number(rolesCount) + 1, response };
        }
        dispatch(clearLoading1());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { rolesList, count: rolesCount, response };
    } catch (error) {
        dispatch(clearLoading1());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { rolesList, count: rolesCount, response: { status: false } };
    }
});

export const updateRolesList = createAsyncThunk('roles/updateRolesList', async (data, { dispatch, getState }) => {
    const state = getState();
    let { rolesList } = state.roles;
    dispatch(startLoading1());
    try {
        const response = await updateRolesListService(data);
        if (response.status) {
            dispatch(clearLoading1());
            dispatch(showMessage({ message: 'Role Updated', variant: 'success' }));
            rolesList = rolesList.map((res) => {
                if (res.id === response.role.id) {
                    return { ...response.role };
                }
                return { ...res };
            });
            return { list: rolesList, response };
        }
        dispatch(clearLoading1());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { list: rolesList, response };
    } catch (error) {
        dispatch(clearLoading1());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { list: rolesList, response: { status: false } };
    }
});

export const deleteRolesList = createAsyncThunk('roles/deleteRolesList', async (data, { dispatch, getState }) => {
    const state = getState();
    const { rolesList, rolesCount } = state.roles;
    dispatch(startLoading1());
    try {
        const toDeleteBody = { id: data };
        const response = await deleteRolesListService(toDeleteBody);
        if (response.status) {
            dispatch(clearLoading1());
            dispatch(showMessage({ message: 'Role Deleted', variant: 'success' }));
            const list = rolesList.filter((res) => res.id !== data);
            return { list, count: Number(rolesCount) - 1 };
        }
        dispatch(clearLoading1());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { list: rolesList, count: rolesCount };
    } catch (error) {
        dispatch(clearLoading1());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { list: rolesList, count: rolesCount };
    }
});

export const getRolesList = createAsyncThunk('roles/getRolesList', async (data, { dispatch }) => {
    dispatch(startLoading3());
    try {
        const response = await fetchRolesListService(data);
        if (response.status) {
            dispatch(clearLoading3());
            return { rolesList: response.roles.data, count: response.roles.total };
        }
        dispatch(clearLoading3());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { rolesList: [], count: 0 };
    } catch (error) {
        dispatch(clearLoading3());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { rolesList: [], count: 0 };
    }
});

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        rolesList: [],
        rolesCount: 0,
    },
    reducers: {},
    extraReducers: {
        [createRolesList.fulfilled]: (state, action) => ({
            ...state,
            rolesList: action.payload.rolesList,
            rolesCount: action.payload.count,
        }),
        [updateRolesList.fulfilled]: (state, action) => ({ ...state, rolesList: action.payload.list }),
        [deleteRolesList.fulfilled]: (state, action) => ({
            ...state,
            rolesList: action.payload.list,
            rolesCount: action.payload.count,
        }),
        [getRolesList.fulfilled]: (state, action) => ({
            ...state,
            rolesList: action.payload.rolesList,
            rolesCount: action.payload.count,
        }),
    },
});

export default rolesSlice.reducer;
