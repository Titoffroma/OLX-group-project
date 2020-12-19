import hbsFunction from '../templates/filter.hbs';
import renderCategories from '../templates/category.hbs';
import renderPagination from '../templates/pagination.hbs';
import fetchFunctions from './fetchMe.js';
import renderOffice from './myOffice';
import decideTologin from './main';
import { updatedContent, updateState } from './history/mainHistory';
import paginationAll from './pagination-for-All';
import { openMenu, closeMenu } from './menu';
import { save } from './storage';
import slider from './slider';
import {
  scrollToOfficeSection,
  appPage,
  renderFilterCategory,
  onPaginationPage,
  logoutOnClick,
} from './filter';
import { onPaginationAllPage } from './pagination-for-All';
import {
  openInfoAboutSeller,
  addToFavorite,
  changePhoto,
} from './productModal';
export default function InitiateListeners() {
  document.body.addEventListener('click', listenAllClicks);
}

function listenAllClicks(event) {
  console.log(event.target);
  // переход на обьявления одной категории
  if (event.target.hasAttribute('data-filter')) {
    renderFilterCategory(event);
    return;
  }
  // переход на пагинацию по всем категориям
  if (event.target.classList.contains('pagination__link')) {
    onPaginationPage(event);
    return;
  }
  // переход на пагинацию по одной категории
  if (event.target.classList.contains('btn-pag')) {
    onPaginationAllPage(event);
    return;
  }
  // переход на домашнюю страницу
  if (event.target.hasAttribute('data-clear-filter')) {
    appPage();
    updateState('/', '', '/');
    return;
  }
  // переход в мой кабинет
  if (event.target.hasAttribute('data-office')) {
    const url = 'user';
    updateState(url, '', url);
    renderOffice();
    return;
  }
  // выход из аккаунта
  if (event.target.hasAttribute('data-out')) {
    logoutOnClick();
    return;
  }
  // прокрутка слайдов
  if (event.target.hasAttribute('data-slide')) return slider(event);
  // прокрутка к разделу в моем кабинете
  if (event.target.hasAttribute('data-office-link')) {
    scrollToOfficeSection(event);
    return;
  }
  // окрытие бургера
  if (event.target.hasAttribute('data-menu-open')) {
    openMenu(event);
    return;
  }
  // закрытие бургера
  if (event.target.hasAttribute('data-menu-close')) {
    closeMenu(event);
    return;
  }
  // логика добавления карточки товара
  if (event.target.closest('.cardset')) event.preventDefault();
  if (event.target.hasAttribute('data-id')) return addToFavorite(event);
  if (event.target.classList.contains('product-photo-list-item-img'))
    return changePhoto(event);
  if (event.target.classList.contains('modal-button-box'))
    return openInfoAboutSeller(event);
}
