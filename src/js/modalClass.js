import renderCardlist from '../templates/card.hbs';
import renderAddCard from '../templates/add-card.hbs';
import popupExitConfirm from '../templates/pop-up-exit-confirm.hbs';
import myOffice from '../templates/my-office.hbs';
import myAdvert from '../templates/my-advert.hbs';
import selectedAdvert from '../templates/selected-advert.hbs';
import popupSearch from '../templates/pop-up-search.hbs';
import openModalFind from './openSearchModal';
import openModalConfirm from './openConfirmModal';
import openModalAuth from './authorization';

const hbsFunctions = [
  renderCardlist,
  renderAddCard,
  openModalFind,
  popupSearch,
  popupExitConfirm,
  myOffice,
  myAdvert,
  selectedAdvert,
  openModalAuth,
  openModalConfirm,
];

class Modal {
  constructor(functions) {
    this.functions = functions;
    this.openModal = this.openModal.bind(this);
    this.onEscapeCloseModal = this.onEscapeCloseModal.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
  }
  startListener() {
    document.body.addEventListener('click', this.openModal, { once: true });
  }
  openModal(event) {
    if (event.target.dataset.modal == 'true') {
      event.preventDefault();
      const index = event.target.dataset.hbs;
      document
        .querySelector('body')
        .insertAdjacentHTML('beforeend', this.functions[index]());
      const modalRef = document.querySelector('div[data-close]');
      document.body.style.overflow = 'hidden';
      modalRef.addEventListener('click', this.onClickCloseModal);
      window.addEventListener('keydown', this.onEscapeCloseModal);
    }
    this.startListener();
  }
  closeModal() {
    const backdrop = document.querySelector('div[data-close]');
    window.removeEventListener('keydown', this.onEscapeCloseModal);
    backdrop.removeEventListener('click', this.onClickCloseModal);
    backdrop.remove();
    document.body.style.overflowY = 'scroll';
  }
  onEscapeCloseModal(event) {
    if (event.code === 'Escape') {
      this.closeModal();
    }
  }
  onClickCloseModal(event) {
    if (event.target.hasAttribute('data-close')) {
      event.preventDefault();
      this.closeModal();
    }
  }
}
const myModal = new Modal(hbsFunctions);

export default myModal;
