import hbsFunction from '../templates/filter.hbs';
import renderCategories from '../templates/category.hbs';
import renderPagination from '../templates/pagination.hbs';
import fetchFunctions from './fetchMe.js';
import renderOffice from './myOffice';
import decideTologin from './main';
import { updatedContent, updateState } from './history/mainHistory';
import paginationAll from './pagination-for-All';
import { openMenu, closeMenu, openCabinet } from './menu';
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

// объект для переноса event в функции для работы с history
const evtHolder = {
  _target: undefined,
  get target() {
    return this._target;
  },
  set target(evt) {
    this._target = evt;
  },
};

export { evtHolder };

function listenAllClicks(event) {
  // окрытие бургера
  if (event.target.hasAttribute('data-menu-open')) {
    openMenu(event);
  }
  // закрытие бургера
  if (event.target.hasAttribute('data-menu-close')) {
    closeMenu(event);
  }
  // открытие дропдауна кабинета в бургере
  if (event.target.hasAttribute('data-drop')) {
    openCabinet();
  }
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
    updateState('/', '', '/');
    updatedContent();
    return;
  }
  // переход в мой кабинет
  if (event.target.hasAttribute('data-office')) {
    updateState('user', '', 'user');
    updatedContent();
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
    return scrollToOfficeSection(event);
  }
  // логика добавления карточки товара
  if (event.target.closest('.cardset')) event.preventDefault();
  if (event.target.hasAttribute('data-id')) return addToFavorite(event);
  if (event.target.classList.contains('product-photo-list-item-img'))
    return changePhoto(event);
  if (event.target.classList.contains('modal-button-box'))
    return openInfoAboutSeller(event);
}
