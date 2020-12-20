import fetchFunctions from '../fetchMe';

import renderPagination from '../../templates/pagination.hbs';
import renderOffice from '../myOffice';
import decideTologin from '../main';

const BASE_URL = 'https://callboard-backend.herokuapp.com/call'

export const getDataSearch = async (query) => {

    try {

          return await fetch(`${BASE_URL}/find?search=${query}`).then( res => res.json())
          .then( res => res)


            
    } catch (e) {
        console.log(e)
    }
}





export const getDataCategory = async (query) => {
    try {
        return await fetch(`${BASE_URL}/specific/${query}`)
            .then( res => res.json())
            .then( res => res)
    } catch (e) {
        console.log(e)
    }
}



export const getPage = async (page) => {
    try {
           return await fetch(`${BASE_URL}/${page}`)
               .then( res => res.json())
               .then( res => res)
       } catch (e) {
           console.log(e)
       }
   
   }
   
