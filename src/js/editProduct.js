import fetchFunctions from './fetchMe';
import editCardHbs from '../templates/edit-card.hbs';
import modalLogic from './addAndEditModalLogic';
import { load, save, remove } from './storage';
import { pushError } from './pnotify';

async function productFetch(id, title) {
  const options = {
    point: fetchFunctions.points.find,
    query: title,
  };
  const response = await fetchFunctions.getRequest(options);
  return response.find(el => {
    if (el._id === id) {
      return true;
    }
  });
}

export default async function openEditCard(evt) {
  const id = evt.target.getAttribute('data-changeid');
  const title = evt.target.getAttribute('data-title');
  const data = await productFetch(id, title);
  const imgUrl = data.imageUrls;

  function onAddImg() {
    const liText = `<li class="photo-item">
                                <input id="photoElem" class="photo-input" type="file" name="file" multiple
                                    accept="image/*" required />
                                <label for="photoElem" class="photo-label"><span
                                        class="material-icons">add</span></label>
                                <img id="output_image" />
                            </li>`;
    document
      .querySelector('.photo-list')
      .insertAdjacentHTML(`beforeend`, liText.repeat(5 - imgUrl.length));
  }

  const markup = editCardHbs(data);

  function onEditCard(e) {
    modalLogic();
    e.preventDefault();
    const photoElem = document.querySelector('#photoElem');
    const cardForm = document.querySelector('.add-card__form');
    const closeBtn = document.querySelector('span[data-close]');
    const formData = new FormData();
    const myHeaders = new Headers();

    if (imgUrl.length > 0) {
      onAddImg();
    }

    ref.btnChekRef.addEventListener('click', () => {
      if (ref.btnChekRef.checked === true) {
        document.querySelector(`.on-change`).textContent = 'Видалити';
      } else {
        document.querySelector(`.on-change`).textContent = 'Зберегти';
      }
    });
    cardForm.addEventListener('submit', onFormSubmit);
    photoElem.addEventListener('change', function (e) {
      formData.append('file', photoElem.files[0]);
    });

    async function onFormSubmit(e) {
      e.preventDefault();
      if (!e.target.elements.checkbox.checked) {
        const formElements = e.currentTarget.elements;
        const title = formElements.title.value;
        const description = formElements.description.value;
        const category = formElements.category.value;
        const price = formElements.price.value;
        const phone = formElements.phone.value;

        formData.set('title', title);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('price', Number(price));
        formData.set('phone', phone);
        myHeaders.append(
          'Authorization',
          `Bearer ${load('Token').accessToken}`,
        );
        const URL = `https://callboard-backend.herokuapp.com/call/${id}`;
        const requestOptions = {
          method: 'PATCH',
          redirect: 'follow',
          headers: myHeaders,
          body: formData,
        };

        const answer = await fetch(URL, requestOptions);
        if (answer.ok) {
          closeBtn.click();
          pushError('Ваше оголошення успішно редаговане');
        }

        const error = await answer.json();
        if (error.message) {
          pushError(error.message);
        }
      } else {
        const deleteRequest = {
          point: fetchFunctions.points.call,
          method: 'DELETE',
          redirect: 'follow',
          query: id,
        };
        async function deleteCard() {
          let response = await fetchFunctions.getRequest(deleteRequest);
        }
        deleteCard();
        closeBtn.click();
      }
    }
  }

  document.body.addEventListener('click', onEditCard, { once: true });

  const ref = {
    get btnChekRef() {
      return document.querySelector(`.checkbox`);
    },
  };
  return markup;
}
