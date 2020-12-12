import fetchFunctions from './fetchMe';
import renderCategories from '../templates/category.hbs';
import renderPagination from '../templates/pagination.hbs';

appPage();

async function appPage() {
  const searchQuery = {
    point: fetchFunctions.points.call,
    query: '?page=1',
  };
  const searchResult = await fetchFunctions.getRequest(searchQuery);
  const orderedSearch = renderPagination(searchResult);
  document.querySelector('main div.container').innerHTML = orderedSearch;
  document.body.addEventListener('click', onPaginationPage, { once: true });
}

async function onPaginationPage(event) {
  document.body.removeEventListener('click', onPaginationPage, { once: true });
  if (event.target.hasAttribute('data-clear-filter')) {
    return appPage();
  }
  if (event.target.classList.contains('pagination__link')) {
    const pagination = document.querySelector('div[data-pagination]');
    event.preventDefault();
    if (event.target.nodeName !== 'A') {
      return;
    }
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
    const orderedSearch = renderCategories(searchResult);
    document.querySelector('section.categories').innerHTML = orderedSearch;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  document.body.addEventListener('click', onPaginationPage, { once: true });
}
