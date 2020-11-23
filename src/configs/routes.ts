import React from 'react';
import { RoutesTabType } from '../models/permission';

const NotFoundBox = React.lazy(() => import('../modules/common/components/NotFoundBox'));

const Home = React.lazy(() => import('../modules/ticketpro/home/pages/Home'));

export const URL_PATH = '/';
// function buildRoutePath(moduleName: ServiceType, path: string) {
//   return `/${moduleName}${path}`;
// }

export const ROUTES = {
  login: '/login',
  signUp: '/signUp',
  forgotPass: '/forgotPass',
  firstLogin: '/firstLogin',
  register: '/register',
  changePassword: '/changePassword',
  transactionSummary: '/transactionSummary',
  accountInfo: '/accountInfo',
  notFound404: '/404',
  verify: '/accounts/verify',
};

export const ROUTES_TAB: RoutesTabType[] = [
  {
    name: 'home',
    isModule: true,
    path: '/',
    exact: true,
    component: Home,
  },
  {
    name: 'notFound404',
    isModule: true,
    path: ROUTES.notFound404,
    component: NotFoundBox,
    disableBreadcrumb: true,
    hidden: true,
  },
];

export const ROUTES_ALL: RoutesTabType[] = [...ROUTES_TAB];
