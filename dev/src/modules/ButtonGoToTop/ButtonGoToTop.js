'use strict';

const buttonScrollingPage = {
  /**
   *  DTO Объект с настройками
   *  @property {string} buttonId CSS ID кнопки
   */
  settings: {
    buttonId: 'ButtonTop',
    buttonModShowClass: 'ButtonGoToTop_show',
  },
  /**
   * Метод инициализации скрипта
   * @param {{}} userSettings Пользовательские настройки
   */
  init(userSettings = {}) {
    this.settings = Object.assign(this.settings, userSettings);
    
    document
      .getElementById(`${this.settings.buttonId}`)
      .addEventListener('click', this.scrollingTopPage);
    window.onscroll = () => {
      this.isShowButton();
    };
  },
  /**
   * Метод прокрутки всей страницы на верх
   */
  scrollingTopPage() {
    document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
  },
  /**
   * Метод, определяет - показывать кнопку "Наверх" или нет
   */
  isShowButton() {
    const btnTop = document.getElementById(`${this.settings.buttonId}`);
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btnTop.classList.add(this.settings.buttonModShowClass);
    } else {
      btnTop.classList.remove(this.settings.buttonModShowClass);
    }
  },
};