const aboutSellerContOpened = document.querySelector('.modal-button-box-info');
const aboutSellerContClosed = document.querySelector('.modal-button-box');
const photoCont = document.querySelector('.modal-foto-box');
const mainModalPhoto = document.querySelector('.main-modal-photo');
import hbs from '../templates/product-modal.hbs';

export default function openModalProduct(evt) {
  evt.preventDefault();
  const markup = hbs();
  document.body.addEventListener('click', modalProduct);
  return markup;
}

function modalProduct(evt) {
  aboutSellerContOpened.addEventListener('click', openInfoAboutSeller);
  photoCont.addEventListener('click', changePhoto);
}

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
