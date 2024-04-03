import { combineReducers } from "@reduxjs/toolkit";
import message from "./messageSlice";
import loading from "./loaderSlice";
import users from "./userSlice";
import roles from "./roleSlice";
import departments from "./departmentListSlice";
import dashboard from "./dashboardSlice";

const createReducer = (asyncReducers) =>
  combineReducers({
    message,
    loading,
    users,
    roles,
    departments,
    dashboard,
    ...asyncReducers,
  });
export default createReducer;
