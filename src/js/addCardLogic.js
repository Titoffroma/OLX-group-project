import addCardModal from '../templates/add-card.hbs'
import fetchFunctions from './fetchMe';
import modalLogic from './addAndEditModalLogic';
import { load, save, remove } from './storage';

export default function openAddCardModal() {
  const markup = addCardModal();
  document.body.addEventListener('click', addCardModalClick, {once: true});
  return markup;
}

function addCardModalClick() {
    modalLogic();
    onOpenAddCardModal();
}

function onOpenAddCardModal() { 
    const photoElem = document.querySelector('#photoElem');
    const addCardForm = document.querySelector('.add-card__form');
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
        // console.log(requestOptions);
        const answer = await fetch(URL, requestOptions);
        console.log(answer);
    }
}