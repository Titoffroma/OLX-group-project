import { fun6, fun7, fun8, fun9} from './updatePageHistory' 
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
    {
        path:'/page',
        component: fun9,
        meta: { auth: false}
    },

    // {
    //     path:'/category?value=free',
    //     component: fun11,
    //     meta: { auth: false}
    // },

    // {
    //     path:'/category?value=businessAndServices',
    //     component: fun12,
    //     meta: { auth: false}
    // },

    // {
    //     path:'?page=2',
    //     component: fun13,
    //     meta: { auth: false}
    // },
    
];

