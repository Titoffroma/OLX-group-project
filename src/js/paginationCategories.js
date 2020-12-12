import fetchFunctions from './fetchMe';
import renderCategories from '../templates/category.hbs';
import renderFilter from '../templates/filter.hbs';
import renderList from '../templates/watchAll.hbs';

const refs = {
  categoryList: document.querySelector('.categorylist'),
  pagination: document.querySelector('[data-pagination]'),
  watchAll: document.querySelector('.categorylist__link'),
};

appPage();
refs.pagination.addEventListener('click', onPaginationPage);

// {
//   once: true;
// }
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
  event.preventDefault();

  if (event.target.nodeName !== 'A') {
    return;
  }

  const currentActivePage = refs.pagination.querySelector('.active');
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

  console.log(searchResult);
}

function openItemsByFilter() {
  document.querySelector('section.categories').innerHTML = renderList(
    searchResult,
  );
}

export default { onPaginationPage };
