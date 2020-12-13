import { load, save, remove } from './storage';
import hbs from '../templates/product-modal.hbs';
import fetchFunctions from './fetchMe';

console.log(load('Token'));

export default async function openModalProduct(evt) {
  const id = evt.target.getAttribute('data-callid');
  const title = evt.target.getAttribute('data-title');
  const data = await fetchProduct(id, title);
  const markup = hbs(data);
  document.body.addEventListener('click', modalProduct);
  return markup;
}

async function fetchProduct(id, title) {
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

function modalProduct(evt) {
  // evt.preventDefault();

  const favoriteIcon = document.querySelector('.product-favorite-icon');
  const toFavorite = document.querySelector('.actions-item_button');
  const aboutSellerContOpened = document.querySelector(
    '.modal-button-box-info',
  );
  const aboutSellerContClosed = document.querySelector('.modal-button-box');
  const photoCont = document.querySelector('.modal-product-photo-box');
  const mainModalPhoto = document.querySelector('.main-modal-product-photo');

  console.log(evt.target);

  if (evt.target.classList.contains('product-photo-list-item-img'))
    return changePhoto(evt);
  if (evt.target.hasAttribute('data-id')) return addToFavorite(evt);
  if (evt.target.classList.contains('modal-button-box'))
    return openInfoAboutSeller(evt);

  function openInfoAboutSeller(evt) {
    aboutSellerContClosed.style.opacity = '0';
    aboutSellerContOpened.style.opacity = '1';

    setTimeout(() => {
      aboutSellerContClosed.remove();
    }, 250);
  }

  function changePhoto(evt) {
    console.log(evt.target.src);
    mainModalPhoto.src = evt.target.src;
  }

  async function addToFavorite(evt) {
    const id = evt.target.getAttribute('data-id');
    const options = {
      point: `${fetchFunctions.points.fav}${id}`,
      method: 'POST',
    };
    const response = await fetchFunctions.getRequest(options);
    if (response) {
      favoriteIcon.style.color = '#FF6B09';
    }
  }
}
