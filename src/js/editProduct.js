import fetchFunctions from './fetchMe';
import editCardHbs from '../templates/edit-card.hbs';
import modalLogic from './addAndEditModalLogic';

const logInfo = {
  email: 'drn@gmail.com',
  password: 'edcvfr',
};
let callId = '';

const newRequest = {
    point: fetchFunctions.points.myCalls,
};


export default async function openEditCard() {
  
   const response = await fetchFunctions.getRequest(newRequest);
  console.log('get user - unauthorized -', response);
  
  
   
   document.body.addEventListener(`click`, onOpenEditModal)
   const markup = editCardHbs(response);
    

  
  function onOpenEditModal(e) {
    callId = e.target.dataset.changeid;
    console.log(callId);
    return callId;
  };

  function onEditCard(e) {
    //e.preventDefault();
    modalLogic();
    console.log(callId);
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
        const fileUrl = formElements.file.files[0].name;
        const fileType = formElements.file.files[0].type;
     

        const changedFormData = {
            title,
            description,
            category,
            price,
            phone,
            file: `${fileUrl}; type=${fileType}`,
        };

    

    if (!e.target.elements.checkbox.checked) {
       const patchRequest = {
                point: fetchFunctions.points.call,
                body: changedFormData,
                redirect: 'follow',
                method: 'PATCH',
                query: callId,
            }
            async function patchCard() {
                let response = await fetchFunctions.getRequest(patchRequest);
      }
      patchCard()
        } else {
       const deleteRequest = {
                point: fetchFunctions.points.call,
                method: 'DELETE',
                redirect: 'follow',
               query: callId,
                
            }
            async function deleteCard() {
                let response = await fetchFunctions.getRequest(deleteRequest);
            }
            deleteCard()
        }  
  };
  
  document.body.addEventListener('submit', onEditCard);
   return markup;
};

//openEditCard()

