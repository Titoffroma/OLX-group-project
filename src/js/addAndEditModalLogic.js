import catMarkup from '../templates/category-list.hbs';
import { load } from './storage';

export default function () {
  const refs = {
    photoElem: document.querySelector('#photoElem'),
    outputImg: document.querySelectorAll('#output_image'),
    categoryList: document.querySelector('.select-input'),
    addCardForm: document.querySelector('.add-card__form'),
    photoLabel: document.querySelectorAll('.photo-label'),
    formInputs: document.querySelectorAll('.add-card__input'),
    errorMessage: document.querySelectorAll('.error-message'),
    phoneInput: document.querySelector('input[name="phone"]'),
    categoryInput: document.querySelector('.select-input'),
    priceInput: document.querySelector('.price-input'),
  };

  categoryRender();
  validateInput();

  refs.photoElem.addEventListener('change', previewImage);
  let i = -1;
  const photoLabelList = Array.from(refs.photoLabel);

  function previewImage(event) {
    const reader = new FileReader();
    i += 1;
    reader.onload = function () {
      if (i < refs.outputImg.length - 1) {
        refs.outputImg[i].src = reader.result;
        photoLabelList[i].classList.remove('active');
        refs.photoLabel[i + 1].classList.add('active');
      }
      refs.outputImg[i].src = reader.result;
      photoLabelList[i].classList.remove('active');
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  function categoryRender() {
    refs.categoryInput.insertAdjacentHTML('afterbegin', catMarkup(load('cats')));
  }

  function validateInput() {
    const formInputList = Array.from(refs.formInputs);
    formInputList.forEach(input => {
      input.addEventListener('blur', event => {
        const currentIndex = formInputList.indexOf(event.currentTarget);
        const errorsMessageList = Array.from(refs.errorMessage);

        if (input.value.trim() === '') {
          input.classList.add('invalid');

          errorsMessageList[currentIndex].innerHTML =
            'Заповніть будьласка це поле';
        } else {
          input.classList.remove('invalid');
          errorsMessageList[currentIndex].innerHTML = '';
        }
      });
    });

    refs.categoryInput.addEventListener('input', () => {
      if (
        refs.categoryInput.value === 'free' ||
        refs.categoryInput.value === 'work' ||
        refs.categoryInput.value === 'trade'
      ) {
        refs.priceInput.value = 0;
        refs.priceInput.setAttribute('disabled', 'disabled');
        refs.priceInput.classList.remove('invalid');
        refs.priceInput.style.backgroundColor = '#fff';
        document.querySelector('.price-error').innerHTML = '';
      } else {
        refs.priceInput.removeAttribute('disabled');
      }
    });

    refs.phoneInput.addEventListener('input', () => {
      if (!Number(refs.phoneInput.value) && refs.phoneInput.value !== '+') {
        refs.phoneInput.value = '';
      }
    });
  }
}
