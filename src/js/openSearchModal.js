import findModal from '../templates/pop-up-search.hbs';
import cardset from '../templates/cardset.hbs';
import fetchFunctions from './fetchMe';
import { pushError } from './pnotify';
import decideTologin from './main';
import { updateState } from './history/mainHistory';
import { updatedContent } from './history/mainHistory';

export default function openModalFind() {
  const markup = findModal();
  document.body.addEventListener('submit', render, { once: true });
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
  updateState(`/search?value=${request.query}`);
  updatedContent();
  const markup = await decideTologin(data);
  document.querySelector('main div.container').innerHTML = cardset(markup);
  document.querySelector('.backdrop').click();
}
