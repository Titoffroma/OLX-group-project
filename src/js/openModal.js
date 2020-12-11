import searchingModal from '../templates/pop-up-search.hbs';
import cardset from '../templates/cardset.hbs';
import myModal from './modalClass';



function openModalFind() {
  const markup = searchingModal();
  
  document.body.addEventListener('submit', renderCategory );
  return markup;
}




function renderCategory(event)
{
    event.preventDefault();
    
    const request = {
      point: fetchFunctions.points.find,
      query: document.querySelector('.pop-up-search-input').value,
    };
    
    fetchFunctions.getRequest(request).then(data => {
      document.querySelector('main div.container').innerHTML = cardset(data);
      myModal.closeModal();
    });
    }

export { openModalFind };
