import catMarkup from '../templates/category-list.hbs';
import fetchFunctions from './fetchMe';

export default function () {
    const refs = {
        photoElem: document.querySelector('#photoElem'),
        outputImg: document.querySelectorAll('#output_image'),
        openCatListEl: document.querySelector('.select-field'),
        categoryList: document.querySelector('.category-list'),
        addCardForm: document.querySelector('.add-card__form'),
        photoLabel: document.querySelectorAll('.photo-label'),
        formInputs: document.querySelectorAll('.add-card__input'),
        errorMessage: document.querySelectorAll('.error-message')
    }

    let i = -1;

    refs.photoElem.addEventListener('change', previewImage);
    refs.openCatListEl.addEventListener('click', categoryRender, {
      once: true,
    });

    const photoLabelList = Array.from(refs.photoLabel);
    photoLabelList[0].classList.add('active');

    function previewImage(event) {
        const reader = new FileReader();
        i += 1;
        reader.onload = function () {
            if (i < refs.outputImg.length -1) {
                refs.outputImg[i].src = reader.result;
            photoLabelList[i].classList.remove('active');
            refs.photoLabel[i+1].classList.add('active');
            }
            refs.outputImg[i].src = reader.result;
            photoLabelList[i].classList.remove('active');
        }

        reader.readAsDataURL(event.target.files[0]);  
    }

    function categoryRender(e) {
        const request = {
            point: fetchFunctions.points.cat,
        };

        async function getCategoryList() {
            let response = await fetchFunctions.getRequest(request);
            const result = catMarkup(response);
            refs.categoryList.insertAdjacentHTML('afterbegin', result); 
        };
        getCategoryList(); 
    }

    function validateInput() {
        const formInputList = Array.from(refs.formInputs);
        formInputList.forEach(input => {
            input.addEventListener('blur', (event) => {
                const currentIndex = formInputList.indexOf(event.currentTarget);
                    const errorsMessageList = Array.from(refs.errorMessage);
                if (input.value.trim() === '') {
                    input.classList.add('invalid');
                    
                    errorsMessageList[currentIndex].innerHTML = 'Заповніть будьласка це поле';
                } else {
                    input.classList.remove('invalid');
                    errorsMessageList[currentIndex].classList.add('visually-hidden')
                } 
            })
        })
    }
    
    validateInput();
}