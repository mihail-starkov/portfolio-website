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
    let menu = document.querySelectorAll('.Menu');
    
    for (let i = 0; i < menu.length; i++) {
      menu[i].addEventListener('click', (e) => {
        this.removeStyleClass();
        if ((e.target.classList.contains('Menu-link'))) {
          this.setStyleClass(e.target);
        }
      });
    }
  },
  /**
   * Метод удаляет класс Css у элемента
   */
  removeStyleClass() {
    let links = document.querySelectorAll('.Menu-link');
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('Menu-link_active');
    }
  },
  /**
   * Метод устанавливает класс Css у элемента в верхнем и нижнем менню
   * @param link {HTMLElement} Элемент по которому был произведен клик
   */
  setStyleClass(link) {
    let links = document.querySelectorAll('.Menu-link');
    for (let i = 0; i < links.length; i++) {
      if (link.text === links[i].text) {
        links[i].classList.add('Menu-link_active');
      }
    }
    link.classList.add('Menu-link_active');
  },
};
menu.init();