// /* eslint-disable prettier/prettier */
// // ----------------------------------------------------------------------



function path(root, sublink) {
  return `${root}${sublink}`;
}
const ROOTS_DASHBOARD = '';
const ROOTS_AUTH = '';
// ----------------------------------------------------------------------
export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components'
};
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  signup: path(ROOTS_AUTH, '/signup'),
  forgotpassword: path(ROOTS_AUTH, '/forgotpassword'),
  newpassword: path(ROOTS_AUTH, '/newpassword'),
  userdetails: path(ROOTS_DASHBOARD, '/userdetails'),
};
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, '/dashboard'),
  departmentlist: path(ROOTS_DASHBOARD, '/department'),
  usermanagement: path(ROOTS_DASHBOARD, '/usermanagement'),
  roleslist: path(ROOTS_DASHBOARD, '/roleslist'),

};

// ----------------------------------------------------------------------

// function path(root, sublink) {
//   return `${root}${sublink}`;
// }

// const ROOTS_AUTH = '';
// const ROOTS_DASHBOARD = '';

// // ----------------------------------------------------------------------

// export const PATH_AUTH = {
//   root: ROOTS_AUTH,
//   login: path(ROOTS_AUTH, '/login'),
//   register: path(ROOTS_AUTH, '/register'),
  
// };

// export const PATH_PAGE = {
 
//   page403: '/403',
//   page404: '/404',
//   page500: '/500',
//   components: '/components',
// };

// export const PATH_DASHBOARD = {
//   root: ROOTS_DASHBOARD,
//   dashboard: path(ROOTS_DASHBOARD, '/dashboard'),

//   users: {
//     list: path(ROOTS_DASHBOARD, '/users'),
//     view: (uuid) => path(ROOTS_DASHBOARD, `/users/${uuid}`),
//   },
//   department: {
//     list: path(ROOTS_DASHBOARD, '/department'),
//     view: (uuid) => path(ROOTS_DASHBOARD, `/department/${uuid}`),
//   },
//   roleslist: {
//     list: path(ROOTS_DASHBOARD, '/roleslist'),
//     view: (uuid) => path(ROOTS_DASHBOARD, `/roleslist/${uuid}`),
//   },

// };

