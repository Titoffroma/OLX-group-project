import myAdvert from '../templates/my-advert.hbs'
import mySelectedAd from '../templates/selected-advert.hbs'
import fetchFunctions from './fetchMe';

    
async function renderOffice (event) {
    const request = {
        point: fetchFunctions.points.myCalls,
    };
    
    const newRequest = {
        point: fetchFunctions.points.myFav,
    };
    
    if (event.target.hasAttribute('data-advert'))
    {
       await fetchFunctions.getRequest(request).then(data => {
            document.querySelector('main div.container').innerHTML = myAdvert(data)
        });
        
        return
    }
    
    if (event.target.hasAttribute('data-favor')) {
        
      await fetchFunctions.getRequest(newRequest).then(data => {
            document.querySelector('main div.container').innerHTML = mySelectedAd(data)
        })

        return
    }


    if (event.target.hasAttribute('data-office')) {
       
        
        await fetchFunctions.getRequest(request).then(data => {
            document.querySelector('main div.container').innerHTML = myAdvert(data)  
        })
        
        await fetchFunctions.getRequest(newRequest).then(data => {
             document.querySelector('main div.container').insertAdjacentHTML('beforeend', mySelectedAd(data) ) 
        })
      
        return
    }

}


