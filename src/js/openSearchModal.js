import findModal from '../templates/pop-up-search.hbs';
import cardset from '../templates/cardset.hbs';
import fetchFunctions from './fetchMe';
import { pushError } from './pnotify';
import decideTologin from './main';

export default function openModalFind() {
  const markup = findModal();
  document.body.addEventListener('submit', render);
  return markup;
}

async function render(event) {
  event.preventDefault();
  const request = {
    point: fetchFunctions.points.find,
    query: document.querySelector('.pop-up-search-input').value,
  };
  const data = await fetchFunctions.getRequest(request);
  if (data.length === 0) {
    pushError('Sorry, we could not find any call!');
    return;
  }
  const markup = await decideTologin(data);
  document.querySelector('main div.container').innerHTML = cardset(markup);
  document.querySelector('.backdrop').click();
  if (data.length === 0) {
    pushError('Sorry, we could not find any call!');
    return;
  }
}
