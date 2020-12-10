import './sass/main.scss';
import './js/main.js';
import 'material-design-icons/iconfont/material-icons.css';
import './js/menu.js';

//import modal from './js/open-modal-class'

import renderCardlist from './templates/pop-up-exit-confirm.hbs';
import popup from './templates/pop-up-search.hbs'



const hbsFunctions = [renderCardlist, popup];




export default class Modal {
  constructor(functions) {
    this.functions = functions;
    this.openModal = this.openModal.bind(this);
    this.onEscapeCloseModal = this.onEscapeCloseModal.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    this.startListener();
  }
  startListener() {
    document.body.addEventListener('click', this.openModal, {
      once: true,
    });
  }
  openModal(event) {
    event.preventDefault();
    if (event.target.dataset.modal == 'true') {
      console.log(event.target);
      const index = event.target.dataset.hbs;
      document
        .querySelector('body')
        .insertAdjacentHTML('beforeend', this.functions[0]());
      const modalRef = document.querySelector('.back');
      modalRef.addEventListener('click', this.onClickCloseModal);
      window.addEventListener('keydown', this.onEscapeCloseModal);
      return;
    }
    this.startListener();
  }
  closeModal() {
    const backdrop = document.querySelector('.back');
    window.removeEventListener('keydown', this.onEscapeCloseModal);
    backdrop.removeEventListener('click', this.onClickCloseModal);
    document.querySelector('.back').remove();
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
    event.preventDefault();
    if (event.target.hasAttribute('data-close')) {
      this.closeModal();
    }
  }
}
const myModal = new Modal(hbsFunctions);

