'use strict';

/**
 * Объект меню
 * @property {CSS} defaultMenuClass Класс контейнера меню для метода render
 * @property {CSS} defaultMenuListClass Класс ul для метода render
 * @property {CSS} defaultMenuListItemClass Класс li для метода render
 * @property {CSS} headerMenuClass Класс контейнера меню Header
 * @property {CSS} headerMenuListClass Класс для элемента Header ul
 * @property {CSS} headerMenuItemClass Класс для элемента Header li
 * @property {CSS} footerMenuClass Класс контейнера меню Footer
 * @property {CSS} footerMenuListClass Класс для элемента Footer ul
 * @property {CSS} footerMenuItemClass Класс для элемента Footer li
 * @property {CSS} infoMenuClass Класс контейнера меню info
 * @property {CSS} infoMenuListClass Класс для элемента info ul
 * @property {CSS} InfoMenuItemClass Класс для элемента info li
 * @property {CSS} burgerMenuClass Класс контейнера меню burger
 * @property {CSS} burgerMenuListClass Класс для элемента burger ul
 * @property {CSS} burgerMenuListItemClass Класс для элемента burger li
 * @property {CSS} subMenuListClass Класс контейнера меню submenu ul
 * @property {CSS} subMenuItemClass Класс для элемента submenu li
 * @property {CSS} btnBurgerId Класс для кнопки burgerMenu
 */
const menu = {
  init() {
    let btnBurger = document.querySelector('.btn_burger');
    btnBurger.addEventListener('click', () => {
      btnBurger.classList.toggle('btn_burger-active');
      document.querySelector('.wrap-swipe-Menu')
        .classList.toggle('wrap-swipe-menu_active');
      document.querySelector('.content')
        .classList.toggle('content_active');
    });
    let menu = document.querySelectorAll('.menu');
    for (let i = 0; i < menu.length; i++) {
      menu[i].addEventListener('click', (e) => {
        this.removeStyleClass();
        if ((e.target.classList.contains('menu__link'))) {
          this.setStyleClass(e.target);
        }
      });
    }
  },
  
  removeStyleClass() {
    let links = document.querySelectorAll('.menu__link');
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('menu__link_active');
    }
  },
  setStyleClass(link) {
    let links = document.querySelectorAll('.menu__link');
    for (let i = 0; i < links.length; i++) {
      if (link.text === links[i].text) {
        links[i].classList.add('menu__link_active');
      }
    }
    link.classList.add('menu__link_active');
  },
};
window.onload = () => menu.init();