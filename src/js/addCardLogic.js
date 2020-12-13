import addCardModal from '../templates/add-card.hbs'
import fetchFunctions from './fetchMe';
import modalLogic from './addAndEditModalLogic';

export default function openAddCardModal() {
  const markup = addCardModal();
  document.body.addEventListener('submit', onOpenAddCardModal);
  return markup;
}

function onOpenAddCardModal() {
    modalLogic();
    
    const addCardForm = document.querySelector('.add-card__form');
    addCardForm.addEventListener('submit', onFormSubmit);

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

        const formData = {
            title,
            description,
            category,
            price: Number(price),
            phone,
            file: `${fileUrl}; type=${fileType}`,
        };

        console.log(formData);

        const cardToAdd = {
            point: fetchFunctions.points.call,
            body: formData,
            method: 'POST',
            contentType: true,
        }


        async function addNewCard() {
            let response = await fetchFunctions.getRequest(cardToAdd);
            console.log(response);
        }
        
        addNewCard(); 
    }
   
}