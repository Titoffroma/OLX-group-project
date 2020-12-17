import mySelectedAd from '../templates/favoriteAdv.hbs'

import myModal from './modalClass';
import fetchFunctions from './fetchMe'

 function openMyFavorite() {
  const markup = mySelectedAd();
  document.body.addEventListener('click', render);
  return markup;
};



export default function renderFavorite() {
    
    const request = {
        point: fetchFunctions.points.myFav
    };
    
    fetchFunctions.getRequest(request).then(data => {
        document.querySelector('main div.container').innerHTML = mySelectedAd(data);
      });
}
