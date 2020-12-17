import { fun1, fun2, fun3, fun4, fun6, fun7, fun8 } from './updatePageHistory' 
import renderFilter from '../filter'
import renderOffice from '../myOffice'

export const routers = [
    {
        path:'/',
        component: renderFilter,
        meta: { auth: false}
    },
    {
        path:'/account',
        component: renderOffice,
        meta: { auth: false}
    },
    // {
    //     path:'/page',
    //     component: fun6,
    //     meta: { auth: false}
    // },
    // {
    //     path:'/pag',
    //     component: fun7,
    //     meta: { auth: false}
    // }, 
    {
        path:'/search',
        component: fun6,
        meta: { auth: false}
    },
    {
        path:'/category',
        component: fun7,
        meta: { auth: false}
    },
    {
        path:'/goods',
        component: fun8,
        meta: { auth: false}
    }
];