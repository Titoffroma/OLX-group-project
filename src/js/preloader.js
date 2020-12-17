window.addEventListener('load', delPreloader);

const addPreloader = parent => {
  const markup =
    '<div class="preloader-backdrop"><div class="preloader"></div></div>';
  if (parent) {
    parent.insertAdjacentHTML('afterbegin', markup);
    console.log('Add');
  }
  delPreloader();
};

const delPreloader = () => {
  const preloader = document.querySelector('.preloader-backdrop');
  document.body.style.overflow = 'hidden';
  preloader.style.position = 'absolute';
  preloader.classList.add('faiding');
  setTimeout(() => {
    preloader.remove();
    if (document.querySelector('.backdrop')) return;
    document.body.style.overflowY = 'scroll';
  }, 2000);
};
addPreloader();
export default addPreloader;
