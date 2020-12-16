import fetchFunctions from './fetchMe';
import editCardHbs from '../templates/edit-card.hbs';
import modalLogic from './addAndEditModalLogic';
//import fetchProduct from './productModal';


async function productFetch(id, title) {
  const options = {
    point: fetchFunctions.points.find,
    query: title,
  };
  const response = await fetchFunctions.getRequest(options);
  return response.find(el => {
    if (el._id === id) {
      return true;
    }
  });
}

 

export default async function openEditCard(evt) {
    const id = evt.target.getAttribute('data-changeid');
    const title = evt.target.getAttribute('data-title');
    const data = await productFetch(id, title);
    
  const markup = editCardHbs(data);
  

  document.body.addEventListener('click', () => { 
    if (ref.btnChekRef.checked === true) {
      document.querySelector(`.on-change`).textContent = 'Видалити';
    } else {
      document.querySelector(`.on-change`).textContent = 'Зберегти';
    }

   });

    function onEditCard(e) {
     // e.preventDefault();
      modalLogic();
      const refs = {
        checkboxEl: document.querySelector('.checkbox-field'),
        submitBtn: document.querySelector('.on-change'),
        addCardForm: document.querySelector('.add-card__form'),
        photo: document.querySelector('#photoElem'),
      };
      
    
      const formElements = e.target.elements;
      const title = formElements.title.value;
      const description = formElements.description.value;
      const category = formElements.category.value;
      const price = formElements.price.value;
      const phone = formElements.phone.value;
    
      const changedFormData = {
        title,
        description,
        category,
        price,
        phone,
       // file,
      };

    const formData = new FormData();
      refs.photo.addEventListener('change', () => {
      })


      if (!e.target.elements.checkbox.checked) {
        const patchRequest = {
          point: fetchFunctions.points.call,
          body: changedFormData,
          redirect: 'follow',
          method: 'PATCH',
          query: id,
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
          query: id,
                
        }
        async function deleteCard() {
          let response = await fetchFunctions.getRequest(deleteRequest);
        }
        deleteCard()
      }
    };

  document.body.addEventListener('submit', onEditCard);
  const ref = {
    get btnChekRef() {
      return document.querySelector(`.checkbox`);
    },
  };
  return markup;
  
  
};

