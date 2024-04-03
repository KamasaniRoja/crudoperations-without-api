// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { showMessage } from './messageSlice';
// import {
//     startLoading1,
//     clearLoading1,
//     startLoading3,
//     clearLoading3,
// } from './loaderSlice';
// import {
//     fetchDepartmentService,
//     createDepartmentService,
//     updateDepartmentService,
//     deleteDepartmentService,
// } from '../services/departmentListService';

// export const createDepartmentsList = createAsyncThunk('departments/createDepartmentsList', async (data, { dispatch, getState }) => {
//     const state = getState();
//     const { departmentsList, departmentsCount } = state.departments;
//     dispatch(startLoading1());
//     try {
//         const response = await createDepartmentService(data);
//         if (response.status) {
//             dispatch(clearLoading1());
//             dispatch(
//                 showMessage({
//                     message: 'Department Created',
//                     variant: 'success',
//                 })
//             );
//             return { departmentsList: [response.department, ...departmentsList], count: Number(departmentsCount) + 1, response };
//         }
//         dispatch(clearLoading1());
//         if (response.error) {
//             response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//         } else {
//             response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//         }
//         return { departmentsList, count: departmentsCount, response };
//     } catch (error) {
//         dispatch(clearLoading1());
//         error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//         return { departmentsList, count: departmentsCount, response: { status: false } };
//     }
// });

// export const updateDepartmentsList = createAsyncThunk('departments/updateDepartmentsList', async (data, { dispatch, getState }) => {
//     const state = getState();
//     let { departmentsList } = state.departments;
//     dispatch(startLoading1());
//     try {
//         const response = await updateDepartmentService(data);
//         if (response.status) {
//             dispatch(clearLoading1());
//             dispatch(showMessage({ message: 'Department Updated', variant: 'success' }));
//             departmentsList = departmentsList.map((res) => {
//                 if (res.id === response.department.id) {
//                     return { ...response.department };
//                 }
//                 return { ...res };
//             });
//             return { list: departmentsList, response };
//         }
//         dispatch(clearLoading1());
//         if (response.error) {
//             response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//         } else {
//             response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//         }
//         return { list: departmentsList, response };
//     } catch (error) {
//         dispatch(clearLoading1());
//         error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//         return { list: departmentsList, response: { status: false } };
//     }
// });

// export const deleteDepartmentsList = createAsyncThunk('departments/deleteDepartmentsList', async (data, { dispatch, getState }) => {
//     const state = getState();
//     const { departmentsList, departmentsCount } = state.departments;
//     dispatch(startLoading1());
//     try {
//         const toDeleteBody = { id: data };
//         const response = await deleteDepartmentService(toDeleteBody);
//         if (response.status) {
//             dispatch(clearLoading1());
//             dispatch(showMessage({ message: 'Department Deleted', variant: 'success' }));
//             const list = departmentsList.filter((res) => res.id !== data);
//             return { list, count: Number(departmentsCount) - 1 };
//         }
//         dispatch(clearLoading1());
//         if (response.error) {
//             response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//         } else {
//             response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//         }
//         return { list: departmentsList, count: departmentsCount };
//     } catch (error) {
//         dispatch(clearLoading1());
//         error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//         return { list: departmentsList, count: departmentsCount };
//     }
// });

// export const getDepartmentsList = createAsyncThunk('departments/getDepartmentsList', async (data, { dispatch }) => {
//     dispatch(startLoading3());
//     try {
//         const response = await fetchDepartmentService(data);
//         if (response.status) {
//             dispatch(clearLoading3());
//             return { departmentsList: response.departments.data, count: response.departments.total };
//         }
//         dispatch(clearLoading3());
//         if (response.error) {
//             response.error.message && dispatch(showMessage({ message: response.error.message, variant: 'error' }));
//         } else {
//             response.message && dispatch(showMessage({ message: response.message, variant: 'error' }));
//         }
//         return { departmentsList: [], count: 0 };
//     } catch (error) {
//         dispatch(clearLoading3());
//         error.message && dispatch(showMessage({ message: error.message, variant: 'error' }));
//         return { departmentsList: [], count: 0 };
//     }
// });

// const departmentsSlice = createSlice({
//     name: 'departments',
//     initialState: {
//         departmentsList: [],
//         departmentsCount: 0,
//     },
//     reducers: {},
//     extraReducers: {
//         [createDepartmentsList.fulfilled]: (state, action) => ({
//             ...state,
//             departmentsList: action.payload.departmentsList,
//             departmentsCount: action.payload.count,
//         }),
//         [updateDepartmentsList.fulfilled]: (state, action) => ({ ...state, departmentsList: action.payload.list }),
//         [deleteDepartmentsList.fulfilled]: (state, action) => ({
//             ...state,
//             departmentsList: action.payload.list,
//             departmentsCount: action.payload.count,
//         }),
//         [getDepartmentsList.fulfilled]: (state, action) => ({
//             ...state,
//             departmentsList: action.payload.departmentsList,
//             departmentsCount: action.payload.count,
//         }),
//     },
// });

// export default departmentsSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const createDepartmentsList = createAsyncThunk(
//   "departments/createDepartmentsList",
//   async (data, { getState }) => {
//     const state = getState();
//     const { departmentslist, departmentsCount } = state.departments;
//     return {
//       list: [...departmentslist, { ...data, id: departmentslist.length + 1 }],
//       count: departmentsCount + 1,
//     };
//   }
// );

// export const updateDepartmentsList = createAsyncThunk(
//   "departments/updateDepartmentsList",
//   async (list, { getState }) => {
//     console.log(list);
//     const state = getState();
//     let { departmentslist } = state.departments;
//     departmentslist = await departmentslist.map((res) => {
//       if (res.id === list.id) {
//         return { ...list };
//       }
//       return res;
//     });
//     return departmentslist;
//   }
// );
// export const deleteDepartmentsList = createAsyncThunk(
//   "departments/deleteDepartmentsList",
//   async (id, { getState }) => {
//     console.log(id);
//     const state = getState();
//     let { departmentslist } = state.departments;
//     departmentslist = await departmentslist.filter(
//       (res) => res.id !== id
//     );
//     const count = departmentslist.length;
//     return {
//       list: departmentslist,
//       count: count,
//     };
//   }
// );

// const initialState = {
//   departmentslist: [
//     {
//       id: 1,
//       departmentname: "abc",
//       email: "abc@gmail.com",
//       is_active: false,
//     },
//     {
//       id: 2,
//       departmentname: "xyz",
//       email: "xyz@gmail.com",
//       is_active: true,
//     },
//     {
//       id: 3,
//       departmentname: "sam",
//       email: "sam@gmail.com",
//       is_active: false,
//     },
//   ],
//   departmentsCount: 3,
// };

// const departmentsSlice = createSlice({
//   name: "departments",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [createDepartmentsList.fulfilled]: (state, action) => ({
//       ...state,
//       departmentslist: action.payload.list,
//       departmentsCount: action.payload.count,
//     }),
//     [updateDepartmentsList.fulfilled]: (state, action) => ({
//       ...state,
//       departmentslist: action.payload,
//     }),
//     [deleteDepartmentsList.fulfilled]: (state, action) => ({
//       ...state,
//       departmentslist: action.payload.list,
//       departmentsCount: action.payload.count,
//     }),
//   },
// });

// export default departmentsSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createDepartmentsList = createAsyncThunk(
  "departments/createDepartmentsList",
  async (data, { getState }) => {
    const state = getState();
    const { departmentslist, departmentsCount } = state.departments;
    const newDepartment = { ...data, id: departmentslist.length + 1 };
    const updatedDepartmentsList = [...departmentslist, newDepartment];
    // Update local storage
    localStorage.setItem(
      "departmentsList",
      JSON.stringify(updatedDepartmentsList)
    );
    localStorage.setItem("departmentsCount", departmentsCount + 1);
    return {
      list: updatedDepartmentsList,
      count: departmentsCount + 1,
    };
  }
);

export const updateDepartmentsList = createAsyncThunk(
  "departments/updateDepartmentsList",
  async (list, { getState }) => {
    const state = getState();
    let { departmentslist } = state.departments;
    departmentslist = departmentslist.map((res) => {
      if (res.id === list.id) {
        return { ...list };
      }
      return res;
    });
    // Update local storage
    localStorage.setItem(
      "departmentsList",
      JSON.stringify(departmentslist)
    );
    return departmentslist;
  }
);

export const deleteDepartmentsList = createAsyncThunk(
  "departments/deleteDepartmentsList",
  async (id, { getState }) => {
    const state = getState();
    let { departmentslist } = state.departments;
    departmentslist = departmentslist.filter((res) => res.id !== id);
    const count = departmentslist.length;
    // Update local storage
    localStorage.setItem(
      "departmentsList",
      JSON.stringify(departmentslist)
    );
    localStorage.setItem("departmentsCount", count);
    return {
      list: departmentslist,
      count: count,
    };
  }
);

const initialState = {
  departmentslist:
    JSON.parse(localStorage.getItem("departmentsList")) || [
      {
        id: 1,
        departmentname: "Front Office Department",
        email: "abc@gmail.com",
        is_active: 'false',
      },
      {
        id: 2,
        departmentname: "Management Department",
        email: "xyz@gmail.com",
        is_active: 'true',
      },
      {
        id: 3,
        departmentname: "HouseKeeping Department",
        email: "sam@gmail.com",
        is_active: 'false',
      },
      {
        id: 4,
        departmentname: "Maintenance Department",
        email: "jam@gmail.com",
        is_active: 'false',
      },
    ],
  departmentsCount: localStorage.getItem("departmentsCount")
    ? parseInt(localStorage.getItem("departmentsCount"))
    : 3,
};

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: {
    [createDepartmentsList.fulfilled]: (state, action) => ({
      ...state,
      departmentslist: action.payload.list,
      departmentsCount: action.payload.count,
    }),
    [updateDepartmentsList.fulfilled]: (state, action) => ({
      ...state,
      departmentslist: action.payload,
    }),
    [deleteDepartmentsList.fulfilled]: (state, action) => ({
      ...state,
      departmentslist: action.payload.list,
      departmentsCount: action.payload.count,
    }),
  },
});

export default departmentsSlice.reducer;
