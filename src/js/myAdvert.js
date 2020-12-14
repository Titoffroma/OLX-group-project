import mySelectedAd from '../templates/my-advert.hbs'
import myModal from './modalClass';
import fetchFunctions from './fetchMe'

export default function openMyAdvert() {
  const markup = mySelectedAd();
  document.body.addEventListener('click', render);
  return markup;
};



function render(event) {
    event.preventDefault();
    const request = {
        point: fetchFunctions.points.myCalls,
        
      };
    fetchFunctions.getRequest(request).then(data => {
        
     
         document.querySelector('main div.container').innerHTML = mySelectedAd(data);
      myModal.closeModal();
    });
}
