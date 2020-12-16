import renderCardlist from '../templates/card.hbs';
import openAddCardModal from './addCardLogic';
import openEditCardModal from './editCardLogic';
import popupExitConfirm from '../templates/pop-up-exit-confirm.hbs';
import myAdvert from '../templates/my-advert.hbs';
import popupSearch from '../templates/pop-up-search.hbs';
import openModalFind from './openSearchModal';
import openModalConfirm from './openConfirmModal';
import openModalAuth from './authorization';
import openModalProduct from './productModal';
import openEditCard from './editProduct';

const hbsFunctions = [
  renderCardlist,
  openAddCardModal,
  openModalFind,
  popupSearch,
  popupExitConfirm,
  myAdvert,
  openEditCard,
  ,
  openModalAuth,
  openModalConfirm,
  ,
  openModalProduct,
  openEditCardModal,
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
  async openModal(event) {
    if (event.target.dataset.modal == 'true') {
      const index = event.target.dataset.hbs;
      const markup = await this.functions[index](event);
      if (!markup) return;
      event.preventDefault();
      document.body.insertAdjacentHTML('beforeend', markup);
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
