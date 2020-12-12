import fetchFunctions from './fetchMe';
import modalLogic from './addAndEditModalLogic';

export default function () {
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
        const photo = formElements.file.files[0].name;

        const formData = {
            title,
            description,
            category,
            price,
            phone,
            photo
        };

        const request = {
            point: fetchFunctions.points.call,
            body: formData,
            method: 'POST',
        }

        async function addNewCard() {
            let response = await fetchFunctions.getRequest(request);
            console.log(response);
        }
        
        addNewCard(); 
    }
   
}
