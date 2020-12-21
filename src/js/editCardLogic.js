import editCardModal from '../templates/edit-card.hbs';
import fetchFunctions from './fetchMe';
import modalLogic from './addAndEditModalLogic';

export default function openEditCardModal() {
  const markup = editCardModal();
  document.body.addEventListener('submit', onOpenEditCardModal);
  return markup;
}

function onOpenEditCardModal() {
  modalLogic();
  const refs = {
    checkboxEl: document.querySelector('.checkbox-field'),
    submitBtn: document.querySelector('.on-change'),
    addCardForm: document.querySelector('.add-card__form'),
  };

  refs.checkboxEl.addEventListener('click', onCheckboxClick);
  refs.addCardForm.addEventListener('submit', onFormSubmit);

  function onCheckboxClick(e) {
    if (!e.target.checked) {
      refs.submitBtn.textContent = 'Зберегти';
    } else {
      refs.submitBtn.textContent = 'Видалити';
    }
  }

  function onFormSubmit(e) {
    // e.preventDefault();

    const formElements = e.currentTarget.elements;
    const title = formElements.title.value;
    const description = formElements.description.value;
    const category = formElements.category.value;
    const price = formElements.price.value;
    const phone = formElements.phone.value;
    const fileUrl = formElements.file.files[0].name;
    const fileType = formElements.file.files[0].type;

    const changedFormData = {
      title,
      description,
      category,
      price: Number(price),
      phone,
      file: `${fileUrl}; type=${fileType}`,
    };

    if (!formElements.checkbox.checked) {
      const cardToPatch = {
        point: fetchFunctions.points.call,
        body: changedFormData,
        method: 'PATCH',
        contentType: true,
        // query: 'id???'
      };
      async function patchCard() {
        let response = await fetchFunctions.getRequest(cardToPatch);
      }
      patchCard();
    } else {
      const cardToDelete = {
        point: fetchFunctions.points.call,
        method: 'DELETE',
        contentType: true,
        // query: 'id???'
      };
      async function deleteCard() {
        let response = await fetchFunctions.getRequest(cardToDelete);
      }
      deleteCard();
    }
  }
}
