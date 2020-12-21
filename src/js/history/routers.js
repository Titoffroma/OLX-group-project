import { fun6, fun7, fun8, fun9 } from './updatePageHistory';
import { appPage } from '../filter';
import renderOffice from '../myOffice';

export const routers = [
  {
    path: '/',
    component: appPage,
    meta: { auth: false },
  },
  {
    path: '/user',
    component: renderOffice,
    meta: { auth: false },
  },

  {
    path: '/search',
    component: fun6,
    meta: { auth: false },
  },
  {
    path: '/category',
    component: fun7,
    meta: { auth: false },
  },
  {
    path: '/page',
    component: fun8,
    meta: { auth: false },
  },
  {
    path: '/sale',
    component: fun9,
    meta: { auth: false },
  },
];
