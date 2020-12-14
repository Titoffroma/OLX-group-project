import confirmModal from '../templates/pop-up-exit-confirm.hbs';
import fetchFunctions from './fetchMe';
import renderCategories from '../templates/category.hbs';

export default function openModalConfirm() {
  const markup = confirmModal();
  return markup;
}
