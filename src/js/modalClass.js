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
import teamModal from './team-modal';
import { measureAndFixScroll } from './preloader';

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
  teamModal,
];

class Modal {
  constructor(functions) {
    this.functions = functions;
    this.openModal = this.openModal.bind(this);
    this.onEscapeCloseModal = this.onEscapeCloseModal.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    this.scroll = '';
  }
  get oldScroll() {
    return measureAndFixScroll();
  }
  startListener() {
    document.body.addEventListener('click', this.openModal, { once: true });
  }
  async openModal(event) {
    this.startListener();
    if (event.target.dataset.modal == 'true') {
      const index = event.target.dataset.hbs;
      const markup = await this.functions[index](event);
      if (!markup) return;
      event.preventDefault();
      document.body.insertAdjacentHTML('afterbegin', markup);
      const modalRef = document.querySelector('div[data-close]');
      setTimeout(() => {
        modalRef.classList.add('opened');
      }, 100);
      this.scroll = this.oldScroll;
      document.body.style.overflow = 'hidden';
      modalRef.addEventListener('click', this.onClickCloseModal);
      window.addEventListener('keydown', this.onEscapeCloseModal);
    }
  }
  closeModal() {
    const backdrop = document.querySelector('div[data-close]');
    window.removeEventListener('keydown', this.onEscapeCloseModal);
    backdrop.removeEventListener('click', this.onClickCloseModal);
    backdrop.classList.remove('opened');
    setTimeout(() => {
      backdrop.remove();
      document.body.style.overflowY = 'scroll';
      document.body.style.paddingRight = this.scroll;
    }, 500);
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
