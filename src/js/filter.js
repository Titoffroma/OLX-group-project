import hbsFunction from '../templates/filter.hbs';
import renderCategories from '../templates/category.hbs';
import renderPagination from '../templates/pagination.hbs';
import fetchFunctions from './fetchMe.js';
import renderOffice from './myOffice';
import decideTologin from './main';
import { updatedContent, updateState } from './history/mainHistory';
import paginationAll from './pagination-for-All';
// import { openMenu, closeMenu } from './menu';
import { load, save } from './storage';
// import slider from './slider';
import { evtHolder } from './listeners';

export default async function renderFilter() {
  const filterUL = document.querySelector('.header_filter');
  const filterRequest = {
    point: fetchFunctions.points.cat,
  };
  const response = await fetchFunctions.getRequest(filterRequest);
  save('cats', response);
  filterUL.innerHTML = hbsFunction(response);
}

async function appPage(sales) {
  renderFilter();
  const searchQuery = {
    point: fetchFunctions.points.call,
    query: '?page=1',
  };
  const searchResult = await fetchFunctions.getRequest(searchQuery);
  if (sales) return searchResult.sales;
  const markup = await decideTologin(searchResult);
  const orderedSearch = renderPagination(markup);
  document.querySelector('main div.container').innerHTML = orderedSearch;
}

async function onPaginationPage(event) {
  event.preventDefault();
  toggleActive(event);
  const numderPage = event.target.textContent;
  const searchQuery = {
    point: fetchFunctions.points.call,
    query: `?page=${numderPage}`,
  };
  const searchResult = await fetchFunctions.getRequest(searchQuery);
  const markup = await decideTologin(searchResult);
  const orderedSearch = renderCategories(markup);
  document.querySelector('section.categories').innerHTML = orderedSearch;
  updateState(`/page?page=${numderPage}`);
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  document.querySelector('section.categories').innerHTML = orderedSearch;
}
function toggleActive(event) {
  const pagination = document.querySelector('div[data-pagination]');
  pagination.querySelector('.active').classList.remove('active');
  event.target.classList.add('active');
}

async function renderFilterCategory(event) {
  const path = event.target.getAttribute('href');
  event.preventDefault();
  const request = {
    point: fetchFunctions.points.catCalls,
    query: event.target.dataset.filter,
  };
  let response = null;
  if (event.target.dataset.filter == 'sales') {
    updateState(`/sale?${path}`);
    updatedContent();
    response = await appPage(true);
  } else if (event.target.dataset.filter == '0') {
    updateState(`/call?${path}`);
    const calls = load('User').calls;
    calls.map(el => (el.logged = 'logged'));
    response = calls;
  } else if (event.target.dataset.filter == '1') {
    updateState(`/favorites?${path}`);
    response = load('User').favourites;
  } else {
    response = await fetchFunctions.getRequest(request);
    updateState(`/category?value=${path}`);
    updatedContent();
  }

  const markup = await decideTologin(response);
  paginationAll(markup);
}
async function logoutOnClick() {
  const response = await fetchFunctions.logout();
  if (response) appPage();
}
function scrollToOfficeSection(event) {
  const index = event.target.getAttribute('data-office-link');
  if (!document.querySelector('.my-office')) {
    updateState('user', '', 'user');
    updatedContent();
    renderOffice().then(() => {
      document
        .querySelector(`li[data-index="${index}"]`)
        .scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
    return;
  }
  document
    .querySelector(`li[data-index="${index}"]`)
    .scrollIntoView({ block: 'start', behavior: 'smooth' });
}

export {
  appPage,
  renderFilterCategory,
  onPaginationPage,
  logoutOnClick,
  scrollToOfficeSection,
};
