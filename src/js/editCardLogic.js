import editCardModal from '../templates/edit-card.hbs';

import fetchFunctions from './fetchMe';
import modalLogic from './addAndEditModalLogic';

export default function () {
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
    };

    function onFormSubmit(e) {
        // e.preventDefault();
 
        const formElements = e.currentTarget.elements;

        const title = formElements.title.value;
        const description = formElements.description.value;
        const category = formElements.category.value;
        const price = formElements.price.value;
        const phone = formElements.phone.value;
        const photo = formElements.file.files[0].name;

        const changedFormData = {
            title,
            description,
            category,
            price,
            phone,
            photo
        };

        if (!formElements.checkbox.checked) {
             const patchRequest = {
                point: fetchFunctions.points.call,
                body: changedFormData,
                method: 'PATCH',
                // query: '1'
            }

            async function patchCard() {
                let response = await fetchFunctions.getRequest(patchRequest);
                console.log(response);
            }
            
            patchCard(); 
        } else {
            const deleteRequest = {
                point: fetchFunctions.points.call,
                method: 'DELETE',
                // query: '1'
            }

            async function deleteCard() {
                let response = await fetchFunctions.getRequest(deleteRequest);
                console.log(response);
            }
            
            deleteCard(); 
        }

       
    }
}


