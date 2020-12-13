import { load, save, remove } from './storage';
import { pushError, removeError } from './pnotify';
import fetchFunctions from './fetchMe';
import myModal from './modalClass';
import { onPaginationPage } from './paginationCategories';
import fetchLogin from './authorization.js';
myModal.startListener();
desideTologin();

export default function desideTologin() {
  if (load('Token'))
    return document.body
      .querySelector('div.container')
      .classList.add('authorized');
  document.body.querySelector('div.container').classList.remove('authorized');
}
