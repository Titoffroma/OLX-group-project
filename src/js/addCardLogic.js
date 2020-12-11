import fetchFunctions from './fetchMe';
import catMarkup from '../templates/category-list.hbs';

export default function () {
    const photoElem = document.querySelector('#photoElem');
    const outputImg = document.querySelectorAll('#output_image');
    const openCatListBtn = document.querySelector('.open-category');
    const categoryList = document.querySelector('.category-list')

    let i = 0;

    photoElem.addEventListener('change', previewImage);
    openCatListBtn.addEventListener('click', categoryRender, {
      once: true,
    });

    function previewImage(event) {
        const reader = new FileReader();
        i += 1;
        
        reader.onload = function () {
            if (i >= outputImg.length) {
                const photoLabel = document.querySelector('.photo-label');
                photoLabel.innerHTML = '';
                outputImg[0].src = reader.result;
                return;
            }
            
            outputImg[i].src = reader.result;
        }

        reader.readAsDataURL(event.target.files[0]);
    }

    function categoryRender() {
        const request = {
            point: fetchFunctions.points.cat,
        };

        async function getCategoryList() {
            let response = await fetchFunctions.getRequest(request);
            const result = catMarkup(response);
            categoryList.insertAdjacentHTML('afterbegin', result); 
        };
        getCategoryList(); 
        
    }
}
