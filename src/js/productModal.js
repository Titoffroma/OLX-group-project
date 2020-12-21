import { load, save, remove } from './storage';
import hbs from '../templates/product-modal.hbs';
import fetchFunctions from './fetchMe';
import { updateState, updatedContent } from './history/mainHistory';
import addPreloader from './preloader';
const refs = {
  get element() {
    return document.querySelector('.main-modal-product-photo');
  },
};

let heartInCard = null;

export default async function openModalProduct(evt) {
  heartInCard = null;
  if (evt.target.getAttribute('data-hbs') == '11') {
    const card = evt.target.closest('.cardset__overlay');
    addPreloader(card, true);
    heartInCard = card.querySelector('.cardset__icons.unauthorized');
  }
  const id = evt.target.getAttribute('data-callid');
  const title = evt.target.getAttribute('data-title');
  updateState(`/goods?value=${title}`);
  updatedContent();
  const data = await fetchProduct(id, title);

  if (evt.target.closest('.cardset__overlay').dataset.liked === 'liked')
    data.liked = 'liked';
  if (!load('User')) data.out = 'visually-hidden';
  slider();
  setTimeout(() => {
    const nodeArrayPhotos = document.querySelectorAll(
      '.product-photo-list-item-img',
    );
    const allPhotos = Array.from(nodeArrayPhotos);
    allPhotos[0].parentElement.classList.add('active-photo');
  }, 200);
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
export { fetchProduct, openInfoAboutSeller, addToFavorite, changePhoto };

// function modalProduct(evt) {
// if (evt.target.hasAttribute('data-id')) return addToFavorite(evt);
// if (!evt.target.closest('.backdrop')) return;

// if (evt.target.classList.contains('product-photo-list-item-img'))
//   return changePhoto(evt);
// if (evt.target.classList.contains('modal-button-box'))
//   return openInfoAboutSeller(evt);
//   if (evt.target.nodeName === 'SPAN') return;
//   if (evt.target.nodeName === 'BUTTON') return;

// }

function openInfoAboutSeller() {
  const aboutSellerContOpened = document.querySelector(
    '.modal-button-box-info',
  );
  const aboutSellerContClosed = document.querySelector('.modal-button-box');
  aboutSellerContClosed.style.opacity = '0';
  aboutSellerContOpened.style.opacity = '1';

  setTimeout(() => {
    aboutSellerContClosed.remove();
  }, 250);
}

function changePhoto(evt) {
  const mainModalPhoto = document.querySelector('.main-modal-product-photo');
  const nodeArrayPhotos = document.querySelectorAll(
    '.product-photo-list-item-img',
  );
  const allPhotos = Array.from(nodeArrayPhotos);
  if (mainModalPhoto.srcset === evt.target.srcset) return;
  if (allPhotos.length === 1) return;
  mainModalPhoto.classList.remove('animate-product-photo-appear');
  mainModalPhoto.classList.add('animate-product-photo-disappear');
  setTimeout(() => {
    mainModalPhoto.srcset = evt.target.srcset;
    mainModalPhoto.classList.remove('animate-product-photo-disappear');
    mainModalPhoto.classList.add('animate-product-photo-appear');
  }, 200);
}

async function addToFavorite(evt) {
  evt.target.classList.add('tapped');
  const liked = evt.target.hasAttribute('data-idl') ? true : false;
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
      evt.target.classList.remove('tapped');
      if (liked)
        return (evt.target.closest('.cardset__overlay').dataset.liked =
          'liked');
      if (heartInCard) {
        if (evt.target.classList.contains('actions-item_title')) {
          evt.target.textContent = 'З обраного';
          evt.target.nextElementSibling.classList.add('liked');
        } else {
          evt.target.previousElementSibling.textContent = 'З обраного';
          evt.target.previousElementSibling.classList.add('liked');
        }
        heartInCard.classList.add('liked');
        heartInCard.closest('.cardset__overlay').dataset.liked = 'liked';
      }
    }
  } else {
    const options = {
      point: `${fetchFunctions.points.fav}${id}`,
      method: 'DELETE',
    };
    const response = await fetchFunctions.getRequest(options);
    if (response) {
      evt.target.classList.remove('liked');
      evt.target.classList.remove('tapped');
      if (liked) {
        if (evt.target.closest('.fav')) {
          evt.target.closest('.fav').remove();
          return (evt.target.closest('.cardset__overlay').dataset.liked = '');
        }
      }
      if (heartInCard) {
        if (evt.target.classList.contains('actions-item_title')) {
          evt.target.textContent = 'В обране';
          evt.target.nextElementSibling.classList.remove('liked');
        } else {
          evt.target.previousElementSibling.textContent = 'В обране';
          evt.target.previousElementSibling.classList.remove('liked');
        }
        heartInCard.classList.remove('liked');
        heartInCard.closest('.cardset__overlay').dataset.liked = '';
        if (heartInCard.closest('.fav')) {
          heartInCard.closest('.fav').remove();
          document.querySelector('.backdrop').click();
        }
        return;
      }
    }
  }
}

function slider() {
  if (document.documentElement.clientWidth < 768) {
    var initialPoint;
    var finalPoint;
    let indexOfPhoto = 0;
    document.addEventListener(
      'touchstart',
      function (event) {
        if (event.target !== refs.element) return;
        event.preventDefault();
        event.stopPropagation();
        initialPoint = event.changedTouches[0];
      },
      false,
    );
    document.addEventListener(
      'touchend',
      function (event) {
        if (event.target !== refs.element) return;
        event.preventDefault();
        event.stopPropagation();
        finalPoint = event.changedTouches[0];
        var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
          if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX) {
              nextPhotoPag();
            } else {
              previousPhotoPag();
            }
          }
        }
      },
      false,
    );

    function nextPhotoPag() {
      const mainModalPhoto = document.querySelector(
        '.main-modal-product-photo',
      );
      const nodeArrayPhotos = document.querySelectorAll(
        '.product-photo-list-item-img',
      );
      const allPhotos = Array.from(nodeArrayPhotos);
      if (allPhotos.length === 1) return;
      mainModalPhoto.classList.remove('animate-product-photo-left-slideIn');
      mainModalPhoto.classList.remove('animate-product-photo-right-slideIn');
      mainModalPhoto.classList.add('animate-product-photo-left-slide');
      setTimeout(() => {
        mainModalPhoto.classList.remove('animate-product-photo-left-slide');
        mainModalPhoto.classList.add('animate-product-photo-right-slideIn');
        if (!(indexOfPhoto + 1 === allPhotos.length)) {
          if (
            allPhotos[indexOfPhoto].parentNode.classList.contains(
              'active-photo',
            )
          ) {
            allPhotos[indexOfPhoto].parentNode.classList.remove('active-photo');
          }
          indexOfPhoto++;
          mainModalPhoto.srcset = allPhotos[indexOfPhoto].srcset;
          if (
            !allPhotos[indexOfPhoto].parentNode.classList.contains(
              'active-photo',
            )
          ) {
            allPhotos[indexOfPhoto].parentNode.classList.add('active-photo');
          }
        } else {
          if (
            allPhotos[indexOfPhoto].parentNode.classList.contains(
              'active-photo',
            )
          ) {
            allPhotos[indexOfPhoto].parentNode.classList.remove('active-photo');
          }
          indexOfPhoto = 0;
          mainModalPhoto.srcset = allPhotos[indexOfPhoto].srcset;
          if (
            !allPhotos[indexOfPhoto].parentNode.classList.contains(
              'active-photo',
            )
          ) {
            allPhotos[indexOfPhoto].parentNode.classList.add('active-photo');
          }
        }
      }, 200);
    }
    function previousPhotoPag() {
      const mainModalPhoto = document.querySelector(
        '.main-modal-product-photo',
      );
      const nodeArrayPhotos = document.querySelectorAll(
        '.product-photo-list-item-img',
      );
      const allPhotos = Array.from(nodeArrayPhotos);
      if (allPhotos.length === 1) return;
      mainModalPhoto.classList.remove('animate-product-photo-left-slideIn');
      mainModalPhoto.classList.remove('animate-product-photo-right-slideIn');
      mainModalPhoto.classList.add('animate-product-photo-right-slide');
      setTimeout(() => {
        mainModalPhoto.classList.remove('animate-product-photo-right-slide');
        mainModalPhoto.classList.add('animate-product-photo-left-slideIn');
        if (!(indexOfPhoto === 0)) {
          if (
            allPhotos[indexOfPhoto].parentNode.classList.contains(
              'active-photo',
            )
          ) {
            allPhotos[indexOfPhoto].parentNode.classList.remove('active-photo');
          }
          indexOfPhoto--;
          mainModalPhoto.srcset = allPhotos[indexOfPhoto].srcset;
          if (
            !allPhotos[indexOfPhoto].parentNode.classList.contains(
              'active-photo',
            )
          ) {
            allPhotos[indexOfPhoto].parentNode.classList.add('active-photo');
          }
        } else {
          if (
            allPhotos[indexOfPhoto].parentNode.classList.contains(
              'active-photo',
            )
          ) {
            allPhotos[indexOfPhoto].parentNode.classList.remove('active-photo');
          }
          indexOfPhoto = allPhotos.length - 1;
          mainModalPhoto.srcset = allPhotos[indexOfPhoto].srcset;
          if (
            !allPhotos[indexOfPhoto].parentNode.classList.contains(
              'active-photo',
            )
          ) {
            allPhotos[indexOfPhoto].parentNode.classList.add('active-photo');
          }
        }
      }, 200);
    }
  } else {
    return;
  }
}
