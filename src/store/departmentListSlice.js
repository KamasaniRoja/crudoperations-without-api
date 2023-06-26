import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from './messageSlice';
import {
    startLoading1,
    clearLoading1,
    startLoading3,
    clearLoading3,
} from './loaderSlice';
import {
    fetchDepartmentService,
    createDepartmentService,
    updateDepartmentService,
    deleteDepartmentService,
} from '../services/departmentListService';

export const createDepartmentsList = createAsyncThunk('departments/createDepartmentsList', async (data, { dispatch, getState }) => {
    const state = getState();
    const { departmentsList, departmentsCount } = state.departments;
    dispatch(startLoading1());
    try {
        const response = await createDepartmentService(data);
        if (response.status) {
            dispatch(clearLoading1());
            dispatch(
                showMessage({
                    message: 'Department Created',
                    variant: 'success',
                })
            );
            return { departmentsList: [response.department, ...departmentsList], count: Number(departmentsCount) + 1, response };
        }
        dispatch(clearLoading1());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { departmentsList, count: departmentsCount, response };
    } catch (error) {
        dispatch(clearLoading1());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { departmentsList, count: departmentsCount, response: { status: false } };
    }
});

export const updateDepartmentsList = createAsyncThunk('departments/updateDepartmentsList', async (data, { dispatch, getState }) => {
    const state = getState();
    let { departmentsList } = state.departments;
    dispatch(startLoading1());
    try {
        const response = await updateDepartmentService(data);
        if (response.status) {
            dispatch(clearLoading1());
            dispatch(showMessage({ message: 'Department Updated', variant: 'success' }));
            departmentsList = departmentsList.map((res) => {
                if (res.id === response.department.id) {
                    return { ...response.department };
                }
                return { ...res };
            });
            return { list: departmentsList, response };
        }
        dispatch(clearLoading1());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { list: departmentsList, response };
    } catch (error) {
        dispatch(clearLoading1());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { list: departmentsList, response: { status: false } };
    }
});

export const deleteDepartmentsList = createAsyncThunk('departments/deleteDepartmentsList', async (data, { dispatch, getState }) => {
    const state = getState();
    const { departmentsList, departmentsCount } = state.departments;
    dispatch(startLoading1());
    try {
        const toDeleteBody = { id: data };
        const response = await deleteDepartmentService(toDeleteBody);
        if (response.status) {
            dispatch(clearLoading1());
            dispatch(showMessage({ message: 'Department Deleted', variant: 'success' }));
            const list = departmentsList.filter((res) => res.id !== data);
            return { list, count: Number(departmentsCount) - 1 };
        }
        dispatch(clearLoading1());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { list: departmentsList, count: departmentsCount };
    } catch (error) {
        dispatch(clearLoading1());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { list: departmentsList, count: departmentsCount };
    }
});

export const getDepartmentsList = createAsyncThunk('departments/getDepartmentsList', async (data, { dispatch }) => {
    dispatch(startLoading3());
    try {
        const response = await fetchDepartmentService(data);
        if (response.status) {
            dispatch(clearLoading3());
            return { departmentsList: response.departments.data, count: response.departments.total };
        }
        dispatch(clearLoading3());
        if (response.error) {
            response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
        } else {
            response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
        }
        return { departmentsList: [], count: 0 };
    } catch (error) {
        dispatch(clearLoading3());
        error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
        return { departmentsList: [], count: 0 };
    }
});

const departmentsSlice = createSlice({
    name: 'departments',
    initialState: {
        departmentsList: [],
        departmentsCount: 0,
    },
    reducers: {},
    extraReducers: {
        [createDepartmentsList.fulfilled]: (state, action) => ({
            ...state,
            departmentsList: action.payload.departmentsList,
            departmentsCount: action.payload.count,
        }),
        [updateDepartmentsList.fulfilled]: (state, action) => ({ ...state, departmentsList: action.payload.list }),
        [deleteDepartmentsList.fulfilled]: (state, action) => ({
            ...state,
            departmentsList: action.payload.list,
            departmentsCount: action.payload.count,
        }),
        [getDepartmentsList.fulfilled]: (state, action) => ({
            ...state,
            departmentsList: action.payload.departmentsList,
            departmentsCount: action.payload.count,
        }),
    },
});

export default departmentsSlice.reducer;
