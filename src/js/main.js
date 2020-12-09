import { load, save, remove } from './storage';
import { pushError, removeError } from './pnotify';

import editModal from '../templates/edit-card.hbs';
const bodyPage = document.querySelector('body');
bodyPage.insertAdjacentHTML('afterbegin', editModal());
