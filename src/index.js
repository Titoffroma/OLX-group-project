import './sass/main.scss';
import './js/main.js';
import 'material-design-icons/iconfont/material-icons.css';
import './js/menu.js';
import './js/filter.js';
import './js/fetchMeDescription';
//import './js/authorization';

import fetchFunctions from './js/fetchMe'

const logInfo = {
  email: 'titoff.roma@gmail.com',
    password: 'qweqwe12',
  
};
const request = {
  point: fetchFunctions.points.login,
  body: logInfo,
  method: 'POST',
};
(async () => {
    await fetchFunctions.login(request);
    console.log(request)
})();




export default function renderPage(event)
{
    event.preventDefault()
    const bodyref = document.querySelector('.run')
    bodyref.addEventListener('click', render)
}


function render(event) {
    console.log(event.target)
    if (event.target.dataset.office) {
        const request = { point: fetchFunctions.points.user, }

        fetchFunctions.getRequest(request).then(data => {
            console.log(data)
            document.querySelector('main div.container').innerHTML = myOffice(data);
        })
         return
    }


    if (event.target.dataset.advert) {
        const newRequest = {
            point: fetchFunctions.points.myCalls,
        
        }
        fetchFunctions.getRequest(newRequest).then(data => {
        
     
            document.querySelector('main div.container').innerHTML = mySelectedAd(data)
        })
        return
    }

    if (event.target.dataset.favor)
    {
        const requestFav = {
        point: fetchFunctions.points.myFav,
        
      };
    fetchFunctions.getRequest(requestFav).then(data => {
        
     
         document.querySelector('main div.container').innerHTML = cardset(data);
      
    });
        return
        }


}