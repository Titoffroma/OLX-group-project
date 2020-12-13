import myOffice from '../templates/my-office.hbs'
import mySelectedAd from '../templates/my-advert.hbs'
// import mySelectedAd from '../templates/selected-advert.hbs'
import cardset from '../templates/selected-advert.hbs';



import fetchFunctions from './fetchMe'


export default function renderPage(event)
{
    event.preventDefault()
    const bodyref = document.querySelector('.run')
    bodyref.addEventListener('click', render)
}


function render(event) {
    console.log(event.target)
    if (event.target.hasAttribute('data-office')) {
        const request = { point: fetchFunctions.points.user, }

        fetchFunctions.getRequest(request).then(data => {
            console.log(data)
            document.querySelector('main div.container').innerHTML = myOffice(data);
        })
         return
    }


    if (event.target.hasAttribute('data-advert')) {
        const newRequest = {
            point: fetchFunctions.points.myCalls,
        
        }
        fetchFunctions.getRequest(newRequest).then(data => {
        
     
            document.querySelector('main div.container').innerHTML = mySelectedAd(data)
        })
        return
    }

    if (event.target.hasAttribute('data-favor'))
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