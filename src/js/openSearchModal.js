import findModal from '../templates/pop-up-search.hbs';
import cardset from '../templates/cardset.hbs';
import myModal from './modalClass';
import fetchFunctions from './fetchMe';
import { pushError } from './pnotify';

export default function openModalFind() {
  const markup = findModal();
  document.body.addEventListener('submit', render);
  return markup;
}

function render(event) {
  event.preventDefault();
  const request = {
    point: fetchFunctions.points.find,
    query: document.querySelector('.pop-up-search-input').value,
  };
  fetchFunctions.getRequest(request).then(data => {
    if (data.length === 0) {
      pushError('Sorry, we could not find any call!');
      return;
    }

    document.querySelector('main div.container').innerHTML = cardset(data);
    myModal.closeModal();
    document.querySelector('.backdrop').click();
  });
}
