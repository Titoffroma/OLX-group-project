import hbsFunction from '../templates/filter.hbs';
import renderCards from '../templates/cardset.hbs';
import fetchFunctions from './fetchMe.js';

async function renderFilter() {
  const filterUL = document.querySelector('.header_filter');
  const clearFilterRef = document.querySelector('.header_filter_button');
  const filterRequest = {
    point: fetchFunctions.points.cat,
  };
  const response = await fetchFunctions.getRequest(filterRequest);
  filterUL.innerHTML = hbsFunction(response);
  document.body.addEventListener('click', Mycallback);
}
renderFilter();

async function Mycallback(event) {
  if (event.target.hasAttribute('data-filter')) {
    event.preventDefault();
    const request = {
      point: fetchFunctions.points.catCalls,
      query: event.target.dataset.filter,
    };
    const response = await fetchFunctions.getRequest(request);
    document.querySelector('div.container').innerHTML = renderCards(response);
  }
}
