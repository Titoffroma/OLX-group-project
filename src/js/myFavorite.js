import mySelectedAd from '../templates/selected-advert.hbs'
import cardset from '../templates/selected-advert.hbs';
import myModal from './modalClass';
import fetchFunctions from './fetchMe'

export default function openMyFavorite() {
  const markup = mySelectedAd();
  document.body.addEventListener('click', render);
  return markup;
};



function render(event) {
    event.preventDefault();
    const request = {
        point: fetchFunctions.points.myFav
    };
    
    fetchFunctions.getRequest(request).then(data => {
        document.querySelector('main div.container').innerHTML = cardset(data);
      myModal.closeModal();
    });
}
