import addCardModal from '../templates/add-card.hbs';
import openModalAuth from './authorization';
import modalLogic from './addAndEditModalLogic';
import { load, save, remove } from './storage';
import { pushError } from './pnotify';

export default function openAddCardModal() {
  if (!load('User')) return openModalAuth();
  const markup = addCardModal();
  document.body.addEventListener('click', addCardModalClick, { once: true });
  return markup;
}

function addCardModalClick(event) {
  if (event.target.hasAttribute('data-close')) {
    return;
  }
  modalLogic();
  onOpenAddCardModal(event);
}

function onOpenAddCardModal(event) {
  // event.preventDefault();
  const photoElem = document.querySelector('#photoElem');
  const addCardForm = document.querySelector('.add-card__form');
  const closeBtn = document.querySelector('span[data-close]');
  const formData = new FormData();
  const myHeaders = new Headers();

  addCardForm.addEventListener('submit', onFormSubmit);
  photoElem.addEventListener('input', function () {
    formData.append('file', photoElem.files[0]);
  });

  async function onFormSubmit(e) {
    e.preventDefault();
    const formElements = e.currentTarget.elements;
    const title = formElements.title.value;
    const description = formElements.description.value;
    const category = formElements.category.value;
    const price = formElements.price.value;
    const phone = formElements.phone.value;

    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', Number(price));
    formData.append('phone', phone);
    myHeaders.append('Authorization', `Bearer ${load('Token').accessToken}`);
    const URL = 'https://callboard-backend.herokuapp.com/call';
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: formData,
    };

    const answer = await fetch(URL, requestOptions);
    if (answer.ok) {
      closeBtn.click();
      pushError('Ваше оголошення успішно опубліковане');
    }

    const error = await answer.json();
    if (error.message) {
      pushError(error.message);
    }
  }
}
