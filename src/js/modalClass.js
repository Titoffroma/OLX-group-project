import renderCardlist from '../templates/card.hbs';
const hbsFunctions = [renderCardlist];

document.body.style.height = '300px';
document.body.insertAdjacentHTML(
  'beforeend',
  '<div class="div" data-hbs="0" data-modal="true" style="background: blue; width: 200px; height: 200px;"><div data-close style="background: green; width: 50px; height: 50px;">close</div></div>',
);
class Modal {
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
        .insertAdjacentHTML('beforeend', this.functions[index]());
      const modalRef = document.querySelector('.cardset__item');
      modalRef.addEventListener('click', this.onClickCloseModal);
      window.addEventListener('keydown', this.onEscapeCloseModal);
      return;
    }
    this.startListener();
  }
  closeModal() {
    const backdrop = document.querySelector('.cardset__item');
    window.removeEventListener('keydown', this.onEscapeCloseModal);
    backdrop.removeEventListener('click', this.onClickCloseModal);
    document.querySelector('.cardset__item').remove();
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
// <button data-modal="true">
// <el data-close>
