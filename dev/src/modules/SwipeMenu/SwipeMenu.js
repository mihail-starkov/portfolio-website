'use strict';

/**
 * Объект SwipeMenu
 */
const swipeMenu = {
  /**
   * DTO настройки по умолчанию
   * @property {string} swipeMenuClass CSS class для меню swipe
   * @property {string} menuLinkClass CSS class для ссылок
   * @property {string} swipeClass CSS class для тега Aside(выдвижная колонка)
   * @property {string} swipeModActiveClass CSS class для тега Aside(выдвижная колонка) для сдвига колонки
   * @property {string} buttonBurgerClass CSS class для кнопки бургера
   * @property {string} buttonBurgerModActiveClass CSS class для кнопки бургера, когда она активирована
   * @property {string} contentClass CSS class для всего контента
   * @property {string} contentModActiveClass CSS class для всего контента, когда необходимо его сдвинуть
   */
  settings: {
    swipeMenuClass: 'Swipe-Menu',
    menuLinkClass: 'Menu-link',
    swipeClass: 'Swipe',
    swipeModActiveClass: 'Swipe_active',
    buttonBurgerClass: 'ButtonBurger',
    buttonBurgerModActiveClass: 'ButtonBurger_active',
    contentClass: 'Content',
    contentModActiveClass: 'Content_active',
  },
  /**
   * Метод инициализации скрипта
   * @param {{}} userSettings пользовательские настройки
   */
  init(userSettings = {}) {
    this.settings = Object.assign(this.settings, userSettings);
    
    document.querySelector(`.${this.settings.swipeMenuClass}`)
      .addEventListener('click', (e) => {
        if (e.target.classList.contains(this.settings.menuLinkClass)) {
          document
            .querySelector(`.${this.settings.swipeClass}`)
            .classList.remove(this.settings.swipeModActiveClass);
          document
            .querySelector(`.${this.settings.buttonBurgerClass}`)
            .classList.remove(this.settings.buttonBurgerModActiveClass);
          document
            .querySelector(`.${this.settings.contentClass}`)
            .classList.remove(this.settings.contentModActiveClass);
        }
      });
  },
};