(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const body = document.querySelector('.container_nav');
  const mobileBackd = document.querySelector('[data-backref]');

  const filterActive = document.querySelector('.header_filter li');
  const entryButton = document.querySelector('[data-hbs="8"]');
  const exitButton = document.querySelector('[data-hbs="9"]');
  const mycabinet = document.querySelector('[data-office]');

  //const headerWindow = document.querySelector('.container_nav');

  // body.addEventListener('click', openMenu);
  // filterActive.addEventListener('click', closeMenu);
  // mobileBackd.addEventListener('click', openCabinet);

  body.addEventListener('click', () => {
    openMenu();
    closeMenu();
    openCabinet();
  });

  function openMenu() {
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    menuBtnRef.setAttribute('aria-expanded', !expanded);
    mobileBackd.classList.toggle('is-open');
    menuBtnRef.classList.toggle('is-open');
  }

  function closeMenu(event) {
    if (event.target.nodeName === 'A') {
      openMenu();
    }
  }

  function openCabinet() {
    // const expanded2 =
    //   entryButton.getAttribute('aria-expanded') === 'true' || false;
    // entryButton.setAttribute('aria-expanded', !expanded2);
    // const expanded3 =
    //   exitButton.getAttribute('aria-expanded') === 'true' || false;
    // exitButton.setAttribute('aria-expanded', !expanded3);

    entryButton.classList.toggle('outMyCabinet');
    mycabinet.classList.toggle('inMyCabinet');
    exitButton.classList.toggle('inMyCabinet');
  }
})();
