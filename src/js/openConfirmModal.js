import confirmModal from '../templates/pop-up-exit-confirm.hbs';
import fetchFunctions from './fetchMe';
import renderCategories from '../templates/category.hbs';



export default function openModalConfirm() {
  const markup = confirmModal();
  document.body.addEventListener('click', logOut);
  return markup;
};

function logOut(event) {
  if (event.target.hasAttribute('data-out'))
  {
    const request = {
    point: fetchFunctions.points.call,
    query: '?page=1',
  };

    fetchFunctions.getRequest(request).then(data => {
    const orderedSearch = renderCategories(data);
      document.querySelector('main div.container').innerHTML = orderedSearch;
    }) }
};

