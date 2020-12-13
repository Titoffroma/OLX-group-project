
(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const menuBtnRefClose = document.querySelector('[data-menu-close]');
  const containerMenu = document.querySelector('[data-menu]');
  const mobileBackd = document.querySelector('[data-backref]');

  const toggleMenu = () => {

    menuBtnRef.addEventListener('click', openMenu);
    menuBtnRefClose.addEventListener('click', closeMenu);

    function openMenu() {
      const expanded = menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
      document.body.classList.toggle('scroll-hidden');
      menuBtnRef.setAttribute('aria-expanded', !expanded);
      mobileBackd.classList.add('is-visible');
      containerMenu.classList.add('is-open');
    };

    function closeMenu() {
      mobileBackd.classList.remove('is-visible');
      containerMenu.classList.remove('is-open');
    }
  }
  })();
  
