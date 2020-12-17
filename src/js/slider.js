const slider = event => {
  const slider = event.target.closest('.categorylist').children[1];
  const slide = slider.children[0];
  const { y: Y } = slider.getBoundingClientRect();
  const { y } = slide.getBoundingClientRect();
  const slidesTotal = Math.round(slide.offsetHeight / slider.offsetHeight);
  const slided = Math.round((Y - y) / slider.offsetHeight);
  if (slidesTotal === 1) return;
  if (event.target.dataset.slide === 'right') {
    if (slided + 1 === slidesTotal)
      return (slide.style.transform = 'translateY(0)');
    slide.style.transform = `translateY(-${
      (slided + 1) * slider.offsetHeight
    }px)`;
  }
  if (event.target.dataset.slide === 'left') {
    if (y === Y) return;
    if (-slided + 1 === slidesTotal) return;
    slide.style.transform = `translateY(${
      (-slided + 1) * slider.offsetHeight
    }px)`;
  }
};

export default slider;
