'use strict';

let SwipeMenu = document.querySelector('.Swipe-Menu');
SwipeMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains('Menu-link')) {
    document.querySelector('.Swipe').classList.remove('Swipe_active');
    document.querySelector('.ButtonBurger').classList.remove('ButtonBurger_active');
    document.querySelector('.Content').classList.remove('Content_active');
  }
});