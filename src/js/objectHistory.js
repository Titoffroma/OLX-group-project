import renderOffice from './js/myOffice'
import appPage from './js/filter'









const routers = [
    {
        path:'/main', // главная страница
        component: appPage,
        meta: { auth: false}
    },
    {
        path:'/account', // мой кабинет
        component: renderOffice,
        meta: { auth: false}
    },
    {
        path:'/favorite', // избранные
        component: fun3,
        meta: { auth: false}
    },
    {
        path:'/own', // мои 
        component: fun4,
        meta: { auth: false}
    },
    
];


let startState = true;
let auth = true
let navbarNav = document.querySelector('body');


function updatePage (e) {
    if (e.target.tagName !== "A") return
    e.preventDefault();
    updateHistory(e);
    updatedContent();
}

function updateHistory(e) {
    const query = e.target.getAttribute('href');
    let router = routers.find( item => item.path === query);
    if (!router) return
    if (!router.meta.auth || !auth) history.pushState(query, null, query) // (state, title[, url])
}

function updatedContent() {
    let router = routers.find( item => item.path === history.state || item.path === location.pathname)
    if (!router) {
        fun5();
        return
    }
    if (!router.meta.auth || !auth) {
        router.component(); 
    }
    else if (router.meta.auth && auth && startState) {
        routers[0].component();
        history.pushState(routers[0].path, null, routers[0].path)  // (state, title[, url])
    } 
    startState = false;
}

window.onpopstate = function(event) {
    updatedContent();
};

navbarNav.addEventListener('click', updatePage);
window.addEventListener('load', updatedContent());

function fun1 () {
 document.querySelector('main div.container').innerHTML = 'MAIN'
}

function fun2 () {
  console.log('account')
  document.querySelector('main div.container').innerHTML = 'ACCOUNT'
 
}

function fun3 () {
   document.querySelector('main div.container').innerHTML = 'FAVORITES'
}

function fun4 () {
  document.querySelector('main div.container').innerHTML = 'OWN'
}

function fun5 () {
  console.log('Not found');
  document.querySelector('main div.container').innerHTML = 'Your Page is not found'
}

function fun6 () {
  console.log('neruhomist');;
  document.querySelector('main div.container').innerHTML = 'FAVORITE'
}





//     <ul>
//       <li><a href="/main">main</a></li>
//       <li><a href="/account">account</a></li>
//       <li><a href="/own">own</a></li>
//       <li><a href="/favorite">favorites</a></li>
//   </ul>





