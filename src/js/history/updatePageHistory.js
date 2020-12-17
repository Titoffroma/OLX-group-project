import { getDataSearch, getDataCategory } from './callHistory'

// let title = document.querySelector('.container');
import renderCards from '../../templates/cardset.hbs';
// import fetchFunctions from './js/fetchMe.js';
// import renderFilter from './js/filter'
// import mySelectedAd from './templates/my-advert.hbs'
// import renderOffice from './js/myOffice'




export function fun5 () {
    console.log('not found');;
}

export async function  fun6 () {
    let url = new URL(location.href).search;
    let data = await getDataSearch(url.split('=')[1]);
    document.querySelector('main div.container').innerHTML = renderCards(data)
  
  
}

export async function  fun7 () {
    const url = new URL(location.href).search;
    const data = await getDataCategory(url.split('=')[1]);
   
    document.querySelector('main div.container').innerHTML = renderCards(data)
  
}

export async function  fun8 () {
    const search = new URL(location.href).search;
   
}