
const slider = () => {
  
  let slidesToShow;
  let slidesToScroll;
  const cardsets = document.querySelectorAll('.cardset');
  console.log(cardsets);

  if (document.body.clientWidth >= 1280) {
    slidesToShow = 4;
    slidesToScroll = 4;
  } else if (document.body.clientWidth >= 768) {
    slidesToShow = 2;
    slidesToScroll = 2;
  } else {
    slidesToShow = 1;
    slidesToScroll = 0;
  };

  Array.from(cardsets).map(cardset => {
    let cardsetItems = cardset.children;  

    for (let i = slidesToShow; i < cardsetItems.length; i += 1) {
     cardset.children[i].classList.add('visually-hidden');    
    }
    console.log(cardsetItems.length);
  })

 
  
  let acc = slidesToScroll * 2; 
  let j = 0;

  document.body.addEventListener('click', (event) => {

    const currentBtn = event.target;
    const sliderСontainer = currentBtn.closest('.categorylist');
    let sliderWrapper = sliderСontainer.lastElementChild; //<--cardset
    let sliderSlides = sliderWrapper.children; //<--Li
    let itemCount = sliderSlides.length;  
  

    if (currentBtn.classList.contains('arrow-right')) {
      const btnNext = currentBtn.classList.contains('arrow-right');
      console.log('next');
     
      for (let i = j; i < acc; i += 1) {       
         sliderWrapper.children[i].classList.toggle('visually-hidden');
          acc += 1;
          j += 1;
              
        if (j === itemCount) {          
          btnNext.disabled = true;
         break;
        }; 
         
      };
              
      
    } else if (currentBtn.classList.contains('arrow-left')) {
      const btnPrev = currentBtn.classList.contains('arrow-left');
      console.log('prev');
     
      for (let i = 0; i < acc; i += 1) {
        if (j === 0) {
          
          btnPrev.disabled = true;
         break;
        } 
        
         sliderWrapper.children[i].classList.toggle('visually-hidden');
          acc -= 1;
          j -= 1;
        
      };
            
    };
  });


}

export default slider;
