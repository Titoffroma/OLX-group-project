import { fun6, fun7, fun8, fun10 } from './updatePageHistory' 
import renderFilter from '../filter'
import renderOffice from '../myOffice'

export const routers = [
    {
        path:'/',
        component: renderFilter,
        meta: { auth: false}
    },
    {
        path:'/user',
        component: renderOffice,
        meta: { auth: false}
    },
   
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
    },
    // {
    //     path:'/page',
    //     component: fun10,
    //     meta: { auth: false}
    // },
    
];

