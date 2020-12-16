



// import renderCards from './templates/cardset.hbs';
// import fetchFunctions from './js/fetchMe.js';
// import renderFilter from './js/filter'
// import mySelectedAd from './templates/my-advert.hbs'
// import renderOffice from './js/myOffice'



// const routers = [
//     {
//         path:'/',
//         component: renderFilter,
//         meta: { auth: false}
//     },
//     {
//         path:'/account',
//         component: renderOffice,
//         meta: { auth: false}
//     },
    
//     {
//         path:'/own',
//         component:  fun3,
//         meta: { auth: false}
//     },
    
//     {
//         path:'/all',
//         component:  fun9,
//         meta: { auth: false}
//     },
   
// ];


// let startState = true;

// let navbarNav = document.querySelector('.navbar-nav');

// export default function updatePage(e) {
//    e.preventDefault();
    
//     if (e.target.tagName !== "A") return
    
//     updateHistory(e);
//     updatedContent();
// }

//  function updateHistory(e) {
  
//     const query = e.target.getAttribute('href');
//     console.log(query);
//     let router = routers.find( item => item.path === query);
//      if (!router) return;
//     if (!router.meta.auth || !auth) history.pushState(query, null, query)
// }







// function updatedContent() {
  
//     let router = routers.find( item => item.path === history.state || item.path === location.pathname)
//     if (!router) {
//         fun5();
//         return
//     }
//     if (!router.meta.auth || !auth) {
//         router.component(); 
//     }
//     else if (router.meta.auth && auth && startState) {
//         routers[0].component();
//         history.pushState(routers[0].path, null, routers[0].path) 
//     } 
//     startState = false;
// }

// window.onpopstate = function () {
//      updatedContent(); 
// };

// navbarNav.addEventListener('click', updatePage);
// window.addEventListener('load', updatedContent());




// function fun3 () {
  
//     const request = {
//         point: fetchFunctions.points.myCalls,
       
        
//       };
//     fetchFunctions.getRequest(request).then(data => {
        
     
//          document.querySelector('main div.container').innerHTML = mySelectedAd(data);
   
//     });
// }






// function fun9() {
//     const request = {
//         point: fetchFunctions.points.catCalls,
//         query: 'sales',
//     };


    
//     fetchFunctions.getRequest(request).then((data) => {
//         console.log(history.state);
//         console.log(location.pathname);
//         document.querySelector('main div.container').
//             innerHTML = renderCards(data)
//     })
// }




// function fun5 () {
//     document.querySelector('main div.container').innerHTML = 'Not found';
// }





// <nav class="navbar navbar-expand-lg navbar-light bg-light">
// <div class="container">
//   <div class="collapse navbar-collapse" id="navbarNav">
//     <ul class="navbar-nav">
//       <li class="nav-item">
//         <a class="nav-link active" href="/">home</a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="/account">account</a>
//       </li>
//       <li class="nav-item">
//         <a class="nav-link" href="/own">Own</a>
//       </li>
//     </ul>
//   </div>
// </div>
// </nav>
// <div class="cont">
// <div class="row">
//   <h1 class="title"></h1>
// </div>
// </div>