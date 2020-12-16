import hbsFunction from '../templates/filter.hbs';
import renderCards from '../templates/cardset.hbs';
import renderCategories from '../templates/category.hbs';
import renderPagination from '../templates/pagination.hbs';
import fetchFunctions from './fetchMe.js';
import renderOffice from './myOffice';
import decideTologin from './main';

async function renderFilter() {
  const filterUL = document.querySelector('.header_filter');
  const clearFilterRef = document.querySelector('.header_filter_button');
  const filterRequest = {
    point: fetchFunctions.points.cat,
  };
  const response = await fetchFunctions.getRequest(filterRequest);
  filterUL.innerHTML = hbsFunction(response);
  document.body.addEventListener('click', Mycallback);
  appPage();
}
renderFilter();


  

async function appPage(sales) {
  if (location.pathname !== history.state) {
    const value = location.pathname
    history.pushState(value, '', value)
    return
  };

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
  const pagination = document.querySelector('div[data-pagination]');
  event.preventDefault();

  addPathName(event);


  const currentActivePage = pagination.querySelector('.active');
  if (currentActivePage) {
    currentActivePage.classList.remove('active');
  }
  const currentPage = event.target;
  currentPage.classList.add('active');
  const numderPage = event.target.textContent;
  const searchQuery = {
    point: fetchFunctions.points.call,
    query: `?page=${numderPage}`,
  };
  const searchResult = await fetchFunctions.getRequest(searchQuery);
  const markup = await decideTologin(searchResult);
  const orderedSearch = renderCategories(markup);
  document.querySelector('section.categories').innerHTML = orderedSearch;
  window.scrollTo({
    top: 0,
  });
}

async function Mycallback(event) {
  if (event.target.hasAttribute('data-filter')) {
    event.preventDefault();
    addPathName(event);
    const request = {
      point: fetchFunctions.points.catCalls,
      query: event.target.dataset.filter,
    };
    let response = null;
    if (event.target.dataset.filter === 'sales') {
      response = await appPage(true);
    } else {
      response = await fetchFunctions.getRequest(request);
    }
    const markup = await decideTologin(response);
    document.querySelector('main div.container').innerHTML = renderCards(
      markup,
    );
  }



  if (event.target.classList.contains('pagination__link')) {
    const controlActiveFilter = document.body.querySelector(
      'pagination__link.active',
    );
    if (controlActiveFilter) {
      controlActiveFilter.classList.remove('active');
    }
    const currentFilter = event.target;
    currentFilter.classList.add('active');
    if (event.target.hasAttribute('data-clear-filter')) {
      appPage();
      history.pushState(null, null, '/')
    }
    onPaginationPage(event);
  }

  if (event.target.hasAttribute('data-office')) {
    renderOffice();
  }
  if (event.target.hasAttribute('data-out')) {
    const response = await fetchFunctions.logout();
    if (response) appPage();
  }
  if (event.target.closest('.cardset')) event.preventDefault();
}

function addPathName(e) {
  const query = e.target.getAttribute('href')
  history.pushState(query, null, query)
};