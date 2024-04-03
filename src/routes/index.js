import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/UserManagement";
import RolesList from "../pages/RolesList";
import DepartmentList from "../pages/DepartmentList";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPasswordForm from "../pages/auth/ForgotPassword";
import UpdateUserDetails from "../pages/auth/UpdateUserDetails";
import Appbar from "../components/Appbar";
import { UserDetails } from "../pages/UserDetails";
import { RoleDetails } from "../pages/RoleDetails";
import { DepartmentDetails } from "../pages/DepartmentDetails"
import AuthGuard from "../components/auth/AuthGuard";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Appbar />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "usermanagement",
          children: [
            { path: '', element: <Users /> },
            { path: ':id', element: <UserDetails /> },
          ],
        },
        {
          path: 'roleslist',
          children: [
            { path: '', element: <RolesList /> },
            { path: ':id', element: <RoleDetails /> },
          ],
        },

        {
          path: 'departmentlist',
          children: [
            { path: '', element: <DepartmentList /> },
            { path: ':id', element: <DepartmentDetails /> },
          ],
        },


      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPasswordForm />,
    },
    {
      path: "/updateuserdetails",
      element: <UpdateUserDetails />,
    },
  ]);
}
// const SignIn = Loadable(lazy(() => import('../pages/auth/Login')));

// import { lazy } from 'react';
// import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// import Appbar from '../components/Appbar'

// // auth
// import AuthGuard from '../components/auth/AuthGuard';
// import GuestGuard from '../components/auth/GuestGuard';
// import { PATH_DASHBOARD } from './paths';

// const Loadable = (Component) => (props) => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { pathname } = useLocation();
//   // return (
//   //   <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/')} />}>
//   //     <Component {...props} />
//   //   </Suspense>
//   // );
// };

// export default function Router() {
//   return useRoutes([
//     {
//       path: '/',
//       element: (
//         <AuthGuard>
//           <Appbar />
//         </AuthGuard>
//       ),
//       children: [
//         // User Routes //
//         { element: <Navigate to={PATH_DASHBOARD.dashboard} replace />, index: true },
//         { path: 'dashboard', element: <DashboardPage /> },
//         {
//           path: 'users',
//           children: [
//             { path: '', element: <User /> },
//             { path: ':uuid', element: <UserDetails /> },
//           ],
//         },

//         {
//           path: 'department',
//           children: [
//             { path: '', element: <Department /> },
//             { path: ':uuid', element: <DepartmentDetails /> },
//           ],
//         },
//         {
//           path: 'roleslist',
//           children: [
//             { path: '', element: <Roles /> },
//             { path: ':uuid', element: <RoleDetails /> },
//           ],
//         },
//  ],
//     },
//     {
//       path: 'login',
//       element: (
//         <GuestGuard>
//           <Login />
//         </GuestGuard>
//       ),
//     },

//     {
//       path: 'register',
//       element: (
//         <GuestGuard>
//           <RegisterPage />
//         </GuestGuard>
//       ),
//     },

//   ]);
// }

// // Public Pages //
// const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// const RegisterPage = Loadable(lazy(() => import('../pages/auth/SignUp')));

// // User Pages //
// const DashboardPage = Loadable(lazy(() => import('../pages/Dashboard')));
// const User = Loadable(lazy(() => import('../pages/UserManagement')));
// const UserDetails = Loadable(lazy(() => import('../pages/UserDetails')));
// const Department = Loadable(lazy(() => import('../pages/DepartmentList')));
// const DepartmentDetails = Loadable(lazy(() => import('../pages/DepartmentDetails')));
// const Roles = Loadable(lazy(() => import('../pages/RolesList')));
// const RoleDetails = Loadable(lazy(() => import('../pages/RoleDetails')));
