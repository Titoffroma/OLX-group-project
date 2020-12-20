import { measureAndFixScroll } from './preloader';
const menuBtnRef = document.querySelector('[data-menu-button]');
const closeBurgerMenu = document.querySelector('.menu-button-close');
const mobileBackd = document.querySelector('[data-backref]');
const cabinet = document.querySelector('[data-drop]');
const shield = document.querySelector('.header_filter__scroll-shield');

const scrollFix = {
  _initialPadding: 0,
  get initialPadding() {
    return this._initialPadding;
  },
  set initialPadding(padding) {
    this._initialPadding = padding;
  },
};

function openMenu(event) {
  event.preventDefault();
  const expanded = menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
  scrollFix.initialPadding = measureAndFixScroll();
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
    }, 250);
  }
  return;
}

function openCabinet() {
  const cabinetList = document.querySelector('.my-account__cabinet-box');
  const categoryList = document.querySelector('.header_filter');
  categoryList.classList.toggle('is-open');
  cabinet.classList.toggle('open-cab');
  cabinetList.classList.toggle('open-cab');
  shield.classList.toggle('is-open');
}

export { openMenu, closeMenu, openCabinet };
