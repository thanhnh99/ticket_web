import React from 'react';
import { RoutesTabType } from '../models/permission';

const TicketDetail = React.lazy(() => import('../modules/ticketpro/ticketDetail/pages/TicketDetail'));

const ChooseTicket = React.lazy(() => import('../modules/ticketpro/booking/pages/chooseTicket'))

const NotFoundBox = React.lazy(() => import('../modules/common/components/NotFoundBox'));

const Home = React.lazy(() => import('../modules/ticketpro/home/pages/Home'));
const EditEventInforForm = React.lazy(() => import('../modules/ticketpro/events/components/EditEventInforForm'));

export const URL_PATH = '/';
export const BOOKING_URL = '/booking';

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
  booking: {
    notFound404: '/booking/404',
    ticketDetail: '/ticketDetail',
    chooseTicket: '/chooseTicket'
  },
  createEvent: '/event/create',
  editEventInfo: '/event/edit'
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
  }
];

export const ROUTES_BOOKING: RoutesTabType[] = [
  {
    name: 'notFound404',
    isModule: true,
    path: ROUTES.booking.notFound404,
    component: NotFoundBox,
    disableBreadcrumb: true,
    hidden: true,
  }
];


export const ROUTES_EVENT: RoutesTabType[] = [
  {
    name: 'Chỉnh sửa thông tin',
    isModule: true,
    path: '/event/edit',
    exact: true,
    component: EditEventInforForm,
  },
  {
    name: 'Thời gian',
    isModule: true,
    path: '/event/edit/time',
    exact: true,
  },
  {
    name: 'Cài đặt',
    isModule: true,
    path: '/event/edit/settings',
    exact: true,
  },
  {
    name: 'Thông tin thanh toán',
    isModule: true,
    path: '/event/edit/payment-info',
    exact: true,
  },

];

export const ROUTES_ALL: RoutesTabType[] = [...ROUTES_TAB];
