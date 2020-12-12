// import { setTimeout } from 'core-js';
// import renderCardsHbs from '../templates/cardset.hbs';
// import fetchFunctions from './fetchMe';
// import { pushError, removeError } from './pnotify';
// import myModal from './modalClass';

// const searchBtnMenuRef = document.querySelector(`.header_button__search`);

// const request = {
//   point: fetchFunctions.points.find,
//   query: ''
// };

// searchBtnMenuRef.addEventListener(`click`, onOpenModal);


// function onOpenModal() { 
//     setTimeout(() => {
//          const ref = {
//         inputSearch: document.querySelector(`.pop-up-search-input`),
//         searchBtnModal: document.querySelector(`.pop-up-search-material-icon-search`),
//         };

//          ref.searchBtnModal.addEventListener(`click`, search);

//         async function search(e) {
//         e.preventDefault()
//          request.query = ref.inputSearch.value; 
//             let response = await fetchFunctions.getRequest(request);
//             if (response.length === 0) {
//                 document.querySelector('main div.container').innerHTML = ``;
//                 return pushError('No results were found for your search');
//             }
           
//             renderCards(response);
//             myModal.closeModal();
//         };   

//     } ,200)
// }

// function renderCards(data) {
//     const cards = renderCardsHbs(data);
//     document.querySelector('main div.container').innerHTML = cards;
// };