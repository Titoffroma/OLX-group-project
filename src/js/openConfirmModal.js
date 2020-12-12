import confirmModal from '../templates/pop-up-exit-confirm.hbs';
import myModal from './modalClass';


function openModalConfirm() {
  const markup = confirmModal();
  document.body.addEventListener('click', render);
  return markup;
};



function render(event) {
  event.preventDefault();
  
    document.querySelector('main div.popup-container').innerHTML = confirmModal();
    myModal.closeModal();

};

export { openModalConfirm };