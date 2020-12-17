window.addEventListener('load', delPreloader);

const measureAndFixScroll = function () {
  const scrollDiv = document.createElement('div');
  scrollDiv.className = 'scrollbar-measure';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  const cont = document.body;
  const contRightPadRaw = getComputedStyle(cont).paddingRight;
  const contRightPad = contRightPadRaw
    .split('')
    .filter(el => !el.search(/[0-9]/))
    .join('');
  cont.style.paddingRight = `${-(-contRightPad - scrollbarWidth)}px`;
  return contRightPadRaw;
};

const addPreloader = parent => {
  const markup =
    '<div class="preloader-backdrop"><div class="preloader"></div></div>';
  if (parent) {
    parent.insertAdjacentHTML('afterbegin', markup);
    console.log('Add');
  }
  delPreloader(parent);
};

const delPreloader = parent => {
  const preloader = document.querySelector('.preloader-backdrop');
  const initialPad = measureAndFixScroll();
  document.body.style.overflow = 'hidden';
  preloader.style.position = 'absolute';
  preloader.classList.add('faiding');
  setTimeout(() => {
    preloader.remove();
    if (document.querySelector('.backdrop')) return;
    document.body.style.overflowY = 'scroll';
    document.body.style.paddingRight = initialPad;
  }, 2000);
};
addPreloader();
export default addPreloader;
export { measureAndFixScroll };
