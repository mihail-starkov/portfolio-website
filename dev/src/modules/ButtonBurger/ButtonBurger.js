'use strict';

let ButtonBurger = document.querySelector('.ButtonBurger');

ButtonBurger.addEventListener('click', () => {
  ButtonBurger.classList.toggle('ButtonBurger_active');
  
  document.querySelector('.Swipe')
    .classList.toggle('Swipe_active');
  document.querySelector('.Content')
    .classList.toggle('Content_active');
  
  
  
});