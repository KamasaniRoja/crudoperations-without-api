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
};
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, '/dashboard'),
  departmentlist: path(ROOTS_DASHBOARD, '/department'),
  usermanagement: path(ROOTS_DASHBOARD, '/usermanagement'),
  roleslist: path(ROOTS_DASHBOARD, '/roleslist')
};
