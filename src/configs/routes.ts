import React from 'react';
import { RoutesTabType } from '../models/permission';

const TicketDetail = React.lazy(() => import('../modules/ticketpro/ticketDetail/pages/TicketDetail'));

const NotFoundBox = React.lazy(() => import('../modules/common/components/NotFoundBox'));

const Home = React.lazy(() => import('../modules/ticketpro/home/pages/Home'));

export const URL_PATH = '/';
export const BOOKING_URL = '/booking';
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
  ticketDetail: 'event/ticketDetail',
  booking: {
    notFound404: '/booking/404',
    ticketDetail: '/ticketDetail'
  },
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
    name: 'music',
    isModule: true,
    path: '/music',
    exact: true,
  },
  {
    name: 'sport',
    isModule: true,
    path: '/sport',
    exact: true,
  },
  {
    name: 'conference',
    isModule: true,
    path: '/conference',
    exact: true,
  },
  {
    name: 'courses',
    isModule: true,
    path: '/courses',
    exact: true,
  },
  {
    name: 'eventHN',
    isModule: true,
    path: '/eventHN',
    exact: true,
  },
  {
    name: 'eventHCM',
    isModule: true,
    path: '/eventHCM',
    exact: true,
  },
  {
    name: 'contact',
    isModule: true,
    path: '/contact',
    exact: true,
  },
  {
    name: 'aboutUs',
    isModule: true,
    path: '/aboutUs',
    exact: true,
  },

  {
    name: 'notFound404',
    isModule: true,
    path: ROUTES.notFound404,
    component: NotFoundBox,
    disableBreadcrumb: true,
    hidden: true,
  },
  {
    name: 'ticketDetail',
    isModule: true,
    path: ROUTES.ticketDetail,
    component: TicketDetail,
    disableBreadcrumb: true,
    exact: true,
  },
];

export const ROUTES_BOOKING: RoutesTabType[] = [
  {
    name: 'notFound404',
    isModule: true,
    path: ROUTES.booking.notFound404,
    component: NotFoundBox,
    disableBreadcrumb: true,
    hidden: true,
  },
  {
    name: 'ticketDetail',
    isModule: true,
    path: ROUTES.booking.ticketDetail,
    component: TicketDetail,
    disableBreadcrumb: true,
    hidden: true,
  },
];
export const ROUTES_ALL: RoutesTabType[] = [...ROUTES_TAB];
