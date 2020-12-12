import React from 'react';
import { RoutesTabType } from '../models/permission';

const NotFoundBox = React.lazy(() => import('../modules/common/components/NotFoundBox'));

const Home = React.lazy(() => import('../modules/ticketpro/home/pages/Home'));

const ApprovalManagement = React.lazy(() => import('../modules/ticketpro/admin/pages/ApprovalManagement'))

const OrderManagement = React.lazy(() => import('../modules/ticketpro/orders/pages/index'))

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
  editEventInfo: '/event/edit',
  approvalManagement: '/approvalManagement',
  createEventInfo: "/event/create/info",
  orders: "/orders",
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
  {
    name: 'approvalManagement',
    isModule: true,
    path: ROUTES.approvalManagement,
    component: ApprovalManagement,
    exact: true,
  },
  {
    name: 'ordersManagement',
    isModule: true,
    path: ROUTES.orders,
    component: OrderManagement,
    exact: true,
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
