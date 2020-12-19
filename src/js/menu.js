import { measureAndFixScroll } from './preloader';
const menuBtnRef = document.querySelector('[data-menu-button]');
const closeBurgerMenu = document.querySelector('.menu-button-close');
const mobileBackd = document.querySelector('[data-backref]');

const scrollFix = {
  _initialPadding: 0,
  get initialPadding() {
    return this._initialPadding;
  },
  set initialPadding(padding) {
    this._initialPadding = padding;
  },
};

if (document.documentElement.clientWidth < 1280) {
  mobileBackd.classList.add('hide');
}

function openMenu(event) {
  event.preventDefault();
  const expanded = menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
  scrollFix.initialPadding = measureAndFixScroll();
  console.log('set', scrollFix.initialPadding);
  menuBtnRef.setAttribute('aria-expanded', !expanded);
  mobileBackd.classList.toggle('hide');
  closeBurgerMenu.classList.toggle('hide');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    mobileBackd.classList.toggle('is-hidden');
    menuBtnRef.classList.toggle('is-hidden');
    closeBurgerMenu.classList.toggle('burger-is-open');
  }, 250);
}

function closeMenu(event) {
  event.preventDefault();
  if (event.target.nodeName === 'A' || 'SPAN') {
    mobileBackd.classList.toggle('is-hidden');
    menuBtnRef.classList.toggle('is-hidden');
    closeBurgerMenu.classList.toggle('burger-is-open');

    setTimeout(() => {
      mobileBackd.classList.toggle('hide');
      closeBurgerMenu.classList.toggle('hide');
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = scrollFix.initialPadding;
      console.log('get', scrollFix.initialPadding);
    }, 250);
  }
  return;
}

export { openMenu, closeMenu };
