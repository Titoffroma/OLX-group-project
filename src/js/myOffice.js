import myOffice from '../templates/my-office.hbs'



import fetchFunctions from './fetchMe'

export default function openMyOffice() {
  const markup = myOffice();
  document.body.addEventListener('click', render);
  return markup;
};



function render(event) {
    event.preventDefault();
    const request = {
        point: fetchFunctions.points.user,
        
      };
    fetchFunctions.getRequest(request).then(data => {
        console.log(data);
     
         document.querySelector('main div.container').innerHTML = myOffice(data);
      myModal.closeModal();
    });


    



}
