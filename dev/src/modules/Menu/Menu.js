'use strict';

/**
 * Объект меню
 */
const menu = {
  /**
   * DTO Объект с настройками по умолчанию
   * @property {string} menuClass CSS Class для всех меню на странице
   * @property {string} menuLinkClass CSS Class для всех ссылок на странице
   * @property {string} menuLinkModActiveClass CSS Class для активированный ссылки(по которой перешли)
   * @property {string} dataAttr DATA аттрибут, содержащий CSS Id секции, к которой необходимо перейти
   */
  settings: {
    menuClass: 'Menu',
    menuLinkClass: 'Menu-link',
    menuLinkModActiveClass: 'Menu-link_active',
    dataAttr: 'data-section',
  },
  /**
   *Метод инициализации скрипта
   */
  init(userSettings = {}) {
    this.settings = Object.assign(this.settings, userSettings);
    document
      .querySelectorAll(`.${this.settings.menuClass}`)
      .forEach(menu => {
        menu.addEventListener('click', (e) => {
          e.preventDefault();
          if ((e.target.classList.contains(`${this.settings.menuLinkClass}`))) {
            this.moveToSection(e.target);
            this.removeStyleClass();
            this.setStyleClass(e.target);
          }
        });
      });
    
  },
  /**
   * Метод прокручивает страницу к нужной секции
   * @param {EventTarget} link элемент на котором произошло событие клик
   */
  moveToSection(link) {
    document
      .getElementById(this.getDesiredSection(link))
      .scrollIntoView({behavior: 'smooth', block: 'start'});
  },
  /**
   * Метод Получает нужную секцию, к которой нужно перейти и отдает
   * @param {EventTarget} link элемент на котором произошло событие клик
   * @return {string} Возвращает CSS Id из аттрибута для перехода к нужной секции страницы
   */
  getDesiredSection(link) {
    return link.getAttribute(this.settings.dataAttr);
  },
  /**
   * Метод удаляет CSS класс у элемента
   */
  removeStyleClass() {
    document
      .querySelectorAll(`.${this.settings.menuLinkClass}`)
      .forEach(link => {
        link.classList.remove(this.settings.menuLinkModActiveClass);
      });
  },
  /**
   * Метод устанавливает класс Css у элемента в верхнем и нижнем менню
   * @param {EventTarget} transLink Элемент по которому был произведен клик
   */
  setStyleClass(transLink) {
    document
      .querySelectorAll(`.${this.settings.menuLinkClass}`)
      .forEach(link => {
        if (transLink.text === link.text) {
          link.classList.add(this.settings.menuLinkModActiveClass);
        }
      });
    transLink.classList.add(this.settings.menuLinkModActiveClass);
  },
};
menu.init();