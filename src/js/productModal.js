import
const aboutSellerContOpened = document.querySelector('.modal-button-box-info');
const aboutSellerContClosed = document.querySelector('.modal-button-box');
const photoCont = document.querySelector('.modal-foto-box');
const mainModalPhoto = document.querySelector('.main-modal-photo');
try {
  aboutSellerContOpened.addEventListener('click', openInfoAboutSeller);
  photoCont.addEventListener('click', changePhoto);
} catch (error) {
  console.log(error);
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
