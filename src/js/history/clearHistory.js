// const listCategories = document.querySelector('#btn-clear');

// const updateView = (e) => {
//     e.preventDefault();
//     if (history.state)  history.go(-1);
// }

// listCategories.addEventListener('click', updateView)



// const ref ={
//     pagin: document.querySelector('div[data-pagination]'),
//     btn1: document.querySelector('.btn1'),
//     btn2: document.querySelector('.btn2'),
//     btn3: document.querySelector('.btn3')
//   }
  
  
  
  
//   window.onpopstate = function(e){
//     console.log(e.state);
//     if (e.state ==='/')
//     {   
//         ref.pagin.querySelector('.active').classList.remove('active');
//         ref.btn1.classList.add('active');
//     };
//     if (e.state ==='/page?page=2')
//     {   
//         ref.pagin.querySelector('.active').classList.remove('active');
//         ref.btn2.classList.add('active');
//     };
//     if (e.state ==='/page?page=3')
//     {   
//         ref.pagin.querySelector('.active').classList.remove('active');
//         ref.btn3.classList.add('active');
//     };
   
//   }