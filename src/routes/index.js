import { useRoutes } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import Users from '../pages/UserManagement';
import RolesList from '../pages/RolesList';
import DepartmentList from '../pages/DepartmentList';
import Login  from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import ForgotPasswordForm from '../pages/auth/ForgotPassword';
import NewPassword from '../pages/auth/NewPassword';

export default function Router() {
  return useRoutes([
    {
      path: 'dashboard',
      element: <Dashboard />

    },

    {
      path: '/usermanagement',
      element: <Users />
    },
    {
      path: '/roleslist',
      element: <RolesList />
    },
    {
      path: '/departmentlist',
      element: <DepartmentList />
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<SignUp/>
    },
    {
      path:'/forgotpassword',
      element:<ForgotPasswordForm/>
    },
    {path:'/newpassword',
  element:<NewPassword/>}
  ]);
}
