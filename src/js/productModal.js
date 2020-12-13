import hbs from '../templates/product-modal.hbs';
import fetchFunctions from './fetchMe';

export default async function openModalProduct(evt) {
  const id = evt.target.getAttribute('data-id');
  const title = evt.target.getAttribute('data-title');
  const data = await fetchProduct(id, title);
  console.log(data);
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
  evt.preventDefault();
  function openInfoAboutSeller(evt) {
    aboutSellerContClosed.style.opacity = '0';
    aboutSellerContOpened.style.opacity = '1';

    setTimeout(() => {
      aboutSellerContOpened.style.cursor = 'default';
    }, 250);
  }

  function changePhoto(evt) {
    if (evt.target.classList.contains('photo-list-item-img')) {
      const currentPhoto = evt.target;
      const src = currentPhoto.src;
      mainModalPhoto.setAttribute('src', src);
    }
  }
  async function addToFavorite(evt) {
    const id = evt.currentTarget.getAttribute('data-id');
    const options = {
      point: `${fetchFunctions.points.fav}${id}`,
      method: 'POST',
    };
    const response = await fetchFunctions.getRequest(options);
    if (response) {
      favoriteIcon.style.color = '#FF6B09';
    }
  }
  const favoriteIcon = document.querySelector('.product-favorite-icon');
  const toFavorite = document.querySelector('.actions-item_button');
  const aboutSellerContOpened = document.querySelector(
    '.modal-button-box-info',
  );
  const aboutSellerContClosed = document.querySelector('.modal-button-box');
  const photoCont = document.querySelector('.modal-product-photo-box');
  const mainModalPhoto = document.querySelector('.main-modal-product-photo');
  aboutSellerContOpened.addEventListener('click', openInfoAboutSeller);
  photoCont.addEventListener('click', changePhoto);
  toFavorite.addEventListener('click', addToFavorite);
}
