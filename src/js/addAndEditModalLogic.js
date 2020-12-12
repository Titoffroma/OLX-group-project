import catMarkup from '../templates/category-list.hbs';
import fetchFunctions from './fetchMe';

export default function () {
    const refs = {
        photoElem: document.querySelector('#photoElem'),
        outputImg: document.querySelectorAll('#output_image'),
        openCatListEl: document.querySelector('.select-field'),
        categoryList: document.querySelector('.category-list'),
        addCardForm: document.querySelector('.add-card__form'),
        photoLabel: document.querySelector('.photo-label'),
    }

    let i = 0;

    refs.photoElem.addEventListener('change', previewImage);
    refs.openCatListEl.addEventListener('click', categoryRender, {
      once: true,
    });

    function previewImage(event) {
        const reader = new FileReader();
        i += 1;
        reader.onload = function () {
            if (i >= refs.outputImg.length) {
                refs.photoLabel.innerHTML = '';
                refs.outputImg[0].src = reader.result;
                return;
            }
            refs.outputImg[i].src = reader.result;
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
}