import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showMessage } from "./messageSlice";
import { startLoading3, clearLoading3 } from "./loaderSlice";
import {
  dashboardUserService,
  dashboardManagerandStaffService,
  dashboardDepartmentService,
} from "../services/dashboardService";

export const getDepartmentDashlist = createAsyncThunk(
  "dashboard/getDepartmentDashlist",
  async (data, { dispatch, getState }) => {
    dispatch(startLoading3());
    const state = getState();
    const { departmentsList } = state.dashboard;
    const { departmentsCount } = state.dashboard;
    try {
      const response = await dashboardDepartmentService(data);
      if (response.status) {
        dispatch(clearLoading3());
        const target = [
          { label: "No Of Departments", value: response.departments },
        ];
        return { list: target, count: response.departments };
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(
            showMessage({ message: response.error.message, variant: "error" })
          );
      } else {
        response.message &&
          dispatch(
            showMessage({ message: response.message, variant: "error" })
          );
      }
      return { list: departmentsList, count: departmentsCount };
    } catch (error) {
      dispatch(clearLoading3());
      error.message &&
        dispatch(showMessage({ message: error.message, variant: "error" }));
      return { list: departmentsList, count: departmentsCount };
    }
  }
);

export const getUsersDashlist = createAsyncThunk(
  "dashboard/getUsersDashlist",
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { usersList } = state.dashboard;
    const { usersCount } = state.dashboard;
    dispatch(startLoading3());
    try {
      const response = await dashboardUserService(data);
      dispatch(clearLoading3());
      if (response.status) {
        const target = [
          {
            label: "No of Active Users",
            value: response.users,
          },
        ];
        return { list: target, count: response.users };
      }
      if (response.error) {
        response.error.message &&
          dispatch(
            showMessage({ message: response.error.message, variant: "error" })
          );
      } else {
        response.message &&
          dispatch(
            showMessage({ message: response.message, variant: "error" })
          );
      }
      return { list: usersList, count: usersCount };
    } catch (error) {
      dispatch(clearLoading3());
      error.message &&
        dispatch(showMessage({ message: error.message, variant: "error" }));
      return { list: usersList, count: usersCount };
    }
  }
);

export const getManagerAndStaffDashlist = createAsyncThunk(
  "dashboard/getManagerAndStaffDashlist",
  async (data, { dispatch, getState }) => {
    const state = getState();
    const { managerList } = state.dashboard;
    dispatch(startLoading3());
    try {
      const response = await dashboardManagerandStaffService(data);
      if (response.status) {
        dispatch(clearLoading3());
        return { list: response.manager };
      }
      dispatch(clearLoading3());
      if (response.error) {
        response.error.message &&
          dispatch(
            showMessage({ message: response.error.message, variant: "error" })
          );
      } else {
        response.message &&
          dispatch(
            showMessage({ message: response.message, variant: "error" })
          );
      }
      return { list: managerList };
    } catch (error) {
      dispatch(clearLoading3());
      error.message &&
        dispatch(showMessage({ message: error.message, variant: "error" }));
      return { list: managerList };
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    usersList: [{ label: "No of Active Users", quantity: 0, value: 0 }],
    usersCount: 0,
    departmentList: [{ label: "Healthy", value: 0 }],
    departmentCount: 0,
    managerList: [],
    managerCount: 0,
  },
  reducers: {},
  extraReducers: {
    [getDepartmentDashlist.fulfilled]: (state, action) => ({
      ...state,
      departmentList: action.payload.list,
      departmentCount: action.payload.count,
    }),
    [getUsersDashlist.fulfilled]: (state, action) => ({
      ...state,
      usersList: action.payload.list,
      usersCount: action.payload.count,
    }),

    [getManagerAndStaffDashlist.fulfilled]: (state, action) => ({
      ...state,
      managerList: action.payload.list,
    }),
  },
});

export default dashboardSlice.reducer;
