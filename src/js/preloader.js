const measureAndFixScroll = function () {
  if (getComputedStyle(document.body).overflowY === 'hidden') return;
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

const addPreloader = (parent, option) => {
  const markup =
    '<div class="preloader-backdrop"><div class="preloader"></div></div>';
  if (parent) {
    parent.insertAdjacentHTML('afterbegin', markup);
  }
  delPreloader(option);
};

const delPreloader = option => {
  const preloader = document.querySelector('.preloader-backdrop');
  preloader.classList.add('faiding');
  const initialPad = !option ? measureAndFixScroll() : option;
  if (!option) {
    document.body.style.overflow = 'hidden';
    preloader.style.position = 'absolute';
  }
  setTimeout(() => {
    preloader.remove();
    if (option) return;
    document.body.style.overflowY = 'scroll';
    document.body.style.paddingRight = initialPad;
  }, 2000);
};
addPreloader();
export default addPreloader;
export { measureAndFixScroll, delPreloader };
