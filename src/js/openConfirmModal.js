import confirmModal from '../templates/pop-up-exit-confirm.hbs';

export default function openModalConfirm() {
  const markup = confirmModal();
  return markup;
}
