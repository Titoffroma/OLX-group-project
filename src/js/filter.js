
import fetchFunctions from './fetchMe';
import renderFilter from '../templates/filter.hbs';
import renderList from '../templates/cardset.hbs';
import renderCategories from '../templates/category.hbs';
import onPaginationPage from './paginationCategories';

openFilterHeader();

const refs = {
  filter: document.querySelector('.header_filter'),
  btnFilter: document.querySelector('.header_filter_button'),
  pagination: document.querySelector('.pagination'),
  cardSet: document.querySelectorAll('.categorylist__description'),
};

refs.btnFilter.addEventListener('click', clearFilter, {
  once: true,
});

refs.filter.addEventListener('click', openCardsByFilter, {
  once: true,
});

refs.cardSet.addEventListener('click', openCards, {
  once: true,
});

async function openFilterHeader() {
  const searchCategories = {
    point: fetchFunctions.points.cat,
  };

  const categoriesResult = await fetchFunctions.getRequest(searchCategories);

  const filterCategories = renderFilter(categoriesResult);
  document.querySelector('.header_filter').innerHTML = filterCategories;
}

async function clearFilter() {
  refs.btnFilter.addEventListener('click', clearFilter, {
    once: true,
  });

  const currentFilter = refs.filter.querySelector('.active');
  if (currentFilter) {
    currentFilter.classList.remove('active');
  }
}

async function openCardsByFilter(event) {
  refs.filter.addEventListener('click', openCardsByFilter, {
    once: true,
  });

  event.preventDefault();
  //refs.pagination.classList.add('visually-hidden');

  if (event.target.nodeName !== 'A') {
    return;
  }

  const controlActiveFilter = refs.filter.querySelector('.active');
  if (controlActiveFilter) {
    controlActiveFilter.classList.remove('active');
  }
  const currentFilter = event.target;
  currentFilter.classList.add('active');

  const currentActivePage = refs.pagination.querySelector('.active');

  //currentActivePage.classList.remove('active');

  const category = currentFilter.textContent;
  // const numderPage = currentPage.textContent;
  const searchCards = {
    point: fetchFunctions.points.catCalls + `${category}`,
    // query: `?page=${numderPage}`,
  };
  const cardsResult = await fetchFunctions.getRequest(searchCards);
  const filterCards = renderList(cardsResult);
  document.querySelector('section.categories').innerHTML = filterCards;
}

async function openCards(event) {
  refs.cardSet.addEventListener('click', openCards, {
    once: true,
  });

  event.preventDefault();
  //refs.pagination.classList.add('visually-hidden');

  if (event.target.nodeName !== 'A') {
    return;
  }

  //   const controlActiveFilter = refs.filter.querySelector('.active');
  //   if (controlActiveFilter) {
  //     controlActiveFilter.classList.remove('active');
  //   }
  const currentFilter = event.target;
  //currentFilter.classList.add('active');
  console.log(currentFilter);
  //const currentActivePage = refs.pagination.querySelector('.active');

  //currentActivePage.classList.remove('active');

  const category = currentFilter.textContent;
  // const numderPage = currentPage.textContent;
  const searchCards = {
    point: fetchFunctions.points.catCalls + `${category}`,
    // query: `?page=${numderPage}`,
  };
  const cardsResult = await fetchFunctions.getRequest(searchCards);
  const filterCards = renderList(cardsResult);
  document.querySelector('section.categories').innerHTML = filterCards;
}

export { openFilterHeader, clearFilter, openCardsByFilter };