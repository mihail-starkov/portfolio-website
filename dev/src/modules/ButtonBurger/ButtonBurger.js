'use strict';

const ButtonBurger = {
  /**
   * DTO с настройками по умолчанию
   * @property {string} ButtonBurgerClass CSS класс для дефолтного состояния кнопки
   * @property {HTMLElement} ButtonBurger Кнопка бургер
   * @property {HTMLElement} Swipe Левая колонка Aside(выдвижная)
   * @property {HTMLElement} Content Контент котолрый необходимо подвинуть на ширину выдвижной колонки
   * @property {string} ButtonBurgerModActiveClass CSS класс для кнопки бургер при нажатии на нее
   * @property {string} ButtonBurgerModHideClass CSS класс для кнопки бургер для ее скрытия
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
    ButtonBurgerModHideClass: 'ButtonBurger_hide',
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
    keys: [37, 38, 39, 40],
  },
  /**
   * Метод инициализации
   * @param {{}} userSettings Переданные пользовательские настройки, по умолчанию пустой объект
   */
  init(userSettings = {}) {
    this.settings = Object.assign(this.settings, userSettings);
    document
      .querySelectorAll(`.${this.settings.ButtonBurgerClass}`)
      .forEach((btn) => {
        btn.addEventListener('click', (e) => {
          //Если кнопка с классом ButtonBurger содержит класс с модификатором _active, тогда
          if (e.target.classList.contains(this.settings.ButtonBurgerModActiveClass)
            || e.target.parentNode.classList.contains(this.settings.ButtonBurgerModActiveClass)) {
            //Возвращаем кнопку ButtonBurger обратно
            this.settings.ButtonBurger.classList.remove(this.settings.ButtonBurgerModHideClass);
            //Задвигаем Swipe menu
            this.settings.Swipe.classList.remove(this.settings.SwipeModActiveClass);
            //Возвращаем контент на ширину меню влево
            this.settings.Content.classList.remove(this.settings.ContentModActiveClass);
            //Включаем скроллинг страницы
            this.enableScroll();
          } else {
            //Убираем кнопку-бургер
            this.settings.ButtonBurger.classList.add(this.settings.ButtonBurgerModHideClass);
            //Выдвигаем Swipe menu
            this.settings.Swipe.classList.add(this.settings.SwipeModActiveClass);
            //Сдвигаем контент на ширину меню вправо
            this.settings.Content.classList.add(this.settings.ContentModActiveClass);
            //Выключаем скроллинг страницы
            this.disableScroll();
          }
        });
      })
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
   * @return {boolean} false для отключения  и отмены действия нажатой клавиши
   */
  preventDefaultForScrollKeys(e) {
    if (this.settings.keys.indexOf(e.keyCode)) {
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
    document.onkeydown = (e)=> this.preventDefaultForScrollKeys.call(this, e);
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


