import { load, save, remove } from './storage';
import hbs from '../templates/product-modal.hbs';
import fetchFunctions from './fetchMe';
import desideTologin from './main.js';

const changeLike = { like: null };

document.body.addEventListener('click', modalProduct);

export default async function openModalProduct(evt) {
  if (evt.target.getAttribute('data-hbs') == '11')
    console.log(
      evt.target
        .closest('.cardset__overlay')
        .querySelector('.cardset__icons.unauthorized'),
    );
  const id = evt.target.getAttribute('data-callid');
  const title = evt.target.getAttribute('data-title');
  const data = await fetchProduct(id, title);
  if (evt.target.hasAttribute('data-liked')) data.liked = 'liked';
  if (!load('User')) data.out = 'unlogged';
  const markup = hbs(data);
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
  if (evt.target.hasAttribute('data-id')) return addToFavorite(evt);
  if (!evt.target.closest('.backdrop')) return;
  const aboutSellerContOpened = document.querySelector(
    '.modal-button-box-info',
  );
  const aboutSellerContClosed = document.querySelector('.modal-button-box');
  const mainModalPhoto = document.querySelector('.main-modal-product-photo');
  if (evt.target.classList.contains('product-photo-list-item-img'))
    return changePhoto(evt);
  if (evt.target.classList.contains('modal-button-box'))
    return openInfoAboutSeller(evt);
  if (evt.target.nodeName === 'SPAN') return;
  if (evt.target.nodeName === 'BUTTON') return;
  evt.preventDefault();

  function openInfoAboutSeller(evt) {
    aboutSellerContClosed.style.opacity = '0';
    aboutSellerContOpened.style.opacity = '1';

    setTimeout(() => {
      aboutSellerContClosed.remove();
    }, 250);
  }

  function changePhoto(evt) {
    mainModalPhoto.src = evt.target.src;
  }

  async function addToFavorite(evt) {
    evt.preventDefault();
    console.log(evt.target);
    const id = evt.target.getAttribute('data-id');
    const opt = {
      point: fetchFunctions.points.myFav,
    };
    const resp = await fetchFunctions.getRequest(opt);

    if (!resp.favourites.find(el => el._id === id)) {
      const options = {
        point: `${fetchFunctions.points.fav}${id}`,
        method: 'POST',
      };
      const response = await fetchFunctions.getRequest(options);
      if (response) {
        evt.target.classList.add('liked');
        if (changeLike.like) changeLike.like.classList.add('liked');
      }
    } else {
      const options = {
        point: `${fetchFunctions.points.fav}${id}`,
        method: 'DELETE',
      };
      const response = await fetchFunctions.getRequest(options);
      if (response) {
        evt.target.classList.remove('liked');
        if (changeLike.like) changeLike.like.classList.remove('liked');
      }
    }
  }
}

export { modalProduct };
