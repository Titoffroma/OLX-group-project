import preloaderTpl from '../templates/preloader.hbs';

const body = document.querySelector('body');

function renderPreloader(e) {
  const markup = preloaderTpl(e);
  body.insertAdjacentHTML('afterbegin', markup);
}
renderPreloader();

