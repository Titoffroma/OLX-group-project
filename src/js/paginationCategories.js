import fetchFunctions from './fetchMe';
import renderCategories from '../templates/category.hbs';
import renderFilter from '../templates/filter.hbs';
import renderList from '../templates/cardset.hbs';

appPage();
const refs = {
  categoryList: document.querySelector('.categorylist'),
  pagination: document.querySelector('[data-pagination]'),
  cardSet: document.querySelectorAll('.categorylist__description'),
};

refs.pagination.addEventListener('click', onPaginationPage, {
  once: true,
});

async function appPage() {
  const searchQuery = {
    point: fetchFunctions.points.call,
    query: '?page=1',
  };

  const searchResult = await fetchFunctions.getRequest(searchQuery);
  const orderedSearch = renderCategories(searchResult);
  document.querySelector('section.categories').innerHTML = orderedSearch;
}

async function onPaginationPage(event) {
  //event.preventDefault();

  if (event.target.nodeName !== 'A') {
    return;
  }

  const currentActivePage = refs.pagination.querySelector('.active');
  if (currentActivePage) {
    currentActivePage.classList.remove('active');
  }

  const currentPage = event.target;

  const numderPage = currentPage.textContent;
  currentPage.classList.add('active');

  const searchQuery = {
    point: fetchFunctions.points.call,
    query: `?page=${numderPage}`,
  };

  const searchResult = await fetchFunctions.getRequest(searchQuery);
  const orderedSearch = renderCategories(searchResult);
  toScroll();
  document.querySelector('section.categories').innerHTML = orderedSearch;
  refs.pagination.addEventListener('click', onPaginationPage, {
    once: true,
  });
}

export default { onPaginationPage, appPage };

function toScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
