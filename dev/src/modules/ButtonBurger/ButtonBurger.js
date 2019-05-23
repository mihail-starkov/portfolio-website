'use strict';

const ButtonBurger = {
  /**
   * DTO с настройками по умолчанию
   * @property {string} ButtonBurgerClass CSS класс для дефолтного состояния кнопки
   * @property {HTMLElement} ButtonBurger Кнопка бургер
   * @property {HTMLElement} Swipe Левая колонка Aside(выдвижная)
   * @property {HTMLElement} Content Контент котолрый необходимо подвинуть на ширину выдвижной колонки
   * @property {string} ButtonBurgerModActiveClass CSS класс для кнопки бургер при нажатии на нее
   * @property {string} SwipeClass CSS класс для сдвигаемой левой колонки
   * @property {string} SwipeModActiveClass CSS класс при сдвиге сдвигаемой левой колонки
   * @property {string} ContentClass CSS класс для контента который хотим сдвигать
   * @property {string} ContentModActiveClass CSS класс для сдвига контента
   * @property {{}} keys Объект содержащий номера клавиш, которые под запретом
   */
  settings: {
    ButtonBurgerClass: 'ButtonBurger',
    get ButtonBurger() {
      return document.querySelector(`.${this.ButtonBurgerClass}`)
    },
    ButtonBurgerModActiveClass: 'ButtonBurger_active',
    SwipeClass: 'Swipe',
    get Swipe() {
      return document.querySelector(`.${this.SwipeClass}`)
    },
    SwipeModActiveClass: 'Swipe_active',
    ContentClass: 'Content',
    get Content() {
      return document.querySelector(`.${this.ContentClass}`)
    },
    ContentModActiveClass: 'Content_active',
    keys: {37: 1, 38: 1, 39: 1, 40: 1},
  },
  /**
   * Метод инициализации
   * @param {{}} userSettings Переданные пользовательские настройки, по умолчанию пустой объект
   */
  init(userSettings = {}) {
    this.settings = Object.assign(this.settings, userSettings);
    
    this.settings.ButtonBurger
      .addEventListener('click', (e) => {
        this.settings.ButtonBurger.classList.toggle(this.settings.ButtonBurgerModActiveClass);
        this.settings.Swipe.classList.toggle(this.settings.SwipeModActiveClass);
        this.settings.Content.classList.toggle(this.settings.ContentModActiveClass);
        if (this.settings.Content.classList.contains(this.settings.ContentModActiveClass)) {
          this.disableScroll();
        } else {
          this.enableScroll();
        }
      });
  },
  /**
   * Метод отмены события
   * @param {Event} e Событие, которое нужно проверить и отменять или не отменять
   */
  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  },
  /**
   * Метод проверяет, если была ли нажата одна из клавиш массива keys
   * @param {Event} e Событие при нажатии на кнопку
   * @return {boolean} false для отключения  и отмены действия нажатой клавиши
   */
  preventDefaultForScrollKeys(e) {
    if (this.settings.keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  },
  /**
   * Метод отключения скролла на странице
   */
  disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    document.addEventListener('wheel', this.preventDefault, {passive: false}); // Disable scrolling in Chrome
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    window.ontouchmove = this.preventDefault; // mobile
    document.onkeydown = this.preventDefaultForScrollKeys;
  },
  /**
   * Метод включения скролла на странице
   */
  enableScroll() {
    if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    document.removeEventListener('wheel', this.preventDefault, {passive: false}); // Enable scrolling in Chrome
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  },
};

