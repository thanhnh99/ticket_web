/* eslint-disable no-unused-vars */
import React from 'react';
import { RoutesTabType, ServiceType } from '../models/permission';
import { HelloWorld } from '../HelloWorld';

const NotFoundBox = React.lazy(() => import('../modules/common/components/NotFoundBox'));

export const URL_PATH = '/';
function buildRoutePath(moduleName: ServiceType, path: string) {
  return `/${moduleName}${path}`;
}

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
  invoices: buildRoutePath('invoices', ''),
  report: buildRoutePath('report', ''),
};

export const ROUTES_TAB: RoutesTabType[] = [
  {
    name: 'helloWorld',
    isModule: true,
    path: '/',
    exact: true,
    component: HelloWorld,
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
