import { setTimeout } from 'core-js';
import renderCardsHbs from '../templates/cardset.hbs';
import fetchFunctions from './fetchMe';

const searchBtnMenuRef = document.querySelector(`.header_button__search`);

const request = {
  point: fetchFunctions.points.find,
  query: 'test'
};

searchBtnMenuRef.addEventListener(`click`, onOpenModal);


function onOpenModal(e) { 
    setTimeout(() => {
        const ref = {
    inputSearch: document.querySelector(`.pop-up-search-input`),
    searchBtnModal: document.querySelector(`.pop-up-search-material-icon-search`),
        };

      request.query = ref.inputSearch.value;  
        ref.searchBtnModal.addEventListener(`click`, search);

        console.log(ref.searchBtnModal)
        console.log(ref.inputSearch)
    } ,300)
}


 async function search () {
    let response = await fetchFunctions.getRequest(request);
     renderCards(response)
};

function renderCards(data) {
    const cards = renderCardsHbs(data);
    document.querySelector('main div.container').innerHTML = cards;
};