import { load, save, remove } from './storage';
import fetchFunctions from './fetchMe';
import editCardHbs from '../templates/edit-card.hbs';

const logInfo = {
  email: 'drn@gmail.com',
  password: 'edcvfr',
};

const newRequest = {
    point: fetchFunctions.points.user,
   //   body: logInfo,
   // query: '1',
};

async function openEditCard() {
   const response = await fetchFunctions.getRequest(newRequest);
   console.log('get user - unauthorized -', response);
   
   const markup = editCardHbs(response);
  document.querySelector('main').innerHTML = markup;

  function onEditCard(e) {
    e.preventDefault();
    const refs = {
      checkboxEl: document.querySelector('.checkbox-field'),
      submitBtn: document.querySelector('.on-change'),
      addCardForm: document.querySelector('.add-card__form'),
    };

    const formElements = e.target.elements;

        const title = formElements.title.value;
        const description = formElements.description.value;
        const category = formElements.category.value;
        const price = formElements.price.value;
        const phone = formElements.phone.value;
       // const photo = formElements.file.files[0].name;

        const changedFormData = {
            title,
            description,
            category,
          price,
          phone,
        // photo,
        };

    if (!e.target.elements.checkbox.checked) {
      // refs.submitBtn.textContent = "Зберегти";
       const patchRequest = {
                point: fetchFunctions.points.call,
                body: changedFormData,
                method: 'POST',
               // query: '5fcd4aa4def4362c44184e33',
            }

            async function patchCard() {
                let response = await fetchFunctions.getRequest(patchRequest);
              console.log(response);
      }
      patchCard()
        } else {
       //refs.submitBtn.textContent = 'Видалити';
       const deleteRequest = {
                point: fetchFunctions.points.call,
                method: 'DELETE',
               // query: '5fcd4aa4def4362c44184e33'
            }

            async function deleteCard() {
                let response = await fetchFunctions.getRequest(deleteRequest);
                console.log(response);
            }
            deleteCard()
        }  
   };

  document.body.addEventListener('submit', onEditCard);
   return markup;
};

openEditCard()
