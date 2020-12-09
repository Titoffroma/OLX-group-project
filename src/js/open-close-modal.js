
// example
// const openModal = document.querySelector('.open')
// const closeModal = document.querySelector('.close')
// const backdrop = document.querySelector('.modal-exit-confirmation-backdrop')
// const closeByBtn = document.querySelector('.modal-exit-confirm-container-btn-clear')


// openModal.addEventListener('click', onClickOpenModal)
// backdrop.addEventListener('click', onClickOverlayCloseModal)
// closeModal.addEventListener('click', onClickCloseModal)


function onClickOpenModal(event) {
  event.preventDefault();
  window.addEventListener("keydown", onEscapeCloseModal);
  backdrop.classList.remove("visually-hidden");
  }

function onClickCloseModal(event) {
  backdrop.classList.add("visually-hidden");
  window.removeEventListener("keydown", onEscapeCloseModal);
  }

function onClickOverlayCloseModal(event) {
   if (event.target === event.currentTarget) {
    onClickCloseModal();
  }
}

function onEscapeCloseModal(event) {
  if (event.code === "Escape") {
    onClickCloseModal();
  }
  
}