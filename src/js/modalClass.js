import renderCardlist from '../templates/card.hbs';

import openAddCardModal from './addCardLogic';
import openEditCardModal from './editCardLogic';

const hbsFunctions = [renderCardlist, openAddCardModal, openEditCardModal];

class Modal {
  constructor(functions) {
    this.functions = functions;
    this.openModal = this.openModal.bind(this);
    this.onEscapeCloseModal = this.onEscapeCloseModal.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
  }
  startListener() {
    document.body.addEventListener('click', this.openModal, {
      once: true,
    });
  }
  openModal(event) {
    event.preventDefault();
    if (event.target.dataset.modal == 'true') {
      const index = event.target.dataset.hbs;
      document
        .querySelector('body')
        .insertAdjacentHTML('beforeend', this.functions[index]());
      const modalRef = document.querySelector('div[data-close]');
      console.log(modalRef);
      modalRef.addEventListener('click', this.onClickCloseModal);
      window.addEventListener('keydown', this.onEscapeCloseModal);
      return;
    }
    this.startListener();
  }
  closeModal() {
    const backdrop = document.querySelector('div[data-close]');
    window.removeEventListener('keydown', this.onEscapeCloseModal);
    backdrop.removeEventListener('click', this.onClickCloseModal);
    backdrop.remove();
    document.body.addEventListener('click', this.openModal, {
      once: true,
    });
  }
  onEscapeCloseModal(event) {
    if (event.code === 'Escape') {
      this.closeModal();
    }
  }
  onClickCloseModal(event) {
    // event.preventDefault();
    if (event.target.hasAttribute('data-close')) {
      this.closeModal();
    }
  }
}
const myModal = new Modal(hbsFunctions);

export default myModal;

// <button data-modal="true">
// <el data-close>
