'use strict';

const mainTitle = {
  settings: {
    underScreenClasses: ['Screen-section', 'UnderScreen'],
    innerScreenClasses: ['Screen-section'],
    get underScreen() {
      return document.querySelector(`.UnderScreen`)
    },
    get innerScreen() {
      return document.querySelector(`.Screen`).querySelector(`.Screen-section`)
    },
    get wrapElem1() {
      return document.querySelector('.wrap-mainTitle')
    },
    get wrapElem2() {
      return document.querySelector('.Screen')
    },
  },
  /**
   * Метод инициализации скрипта
   */
  init() {

    if (window.innerWidth > 780
      && this.settings.underScreen
      && !(this.settings.innerScreen)) {
      document
        .querySelector(`.UnderScreen`)
        .remove();
      this.createTitle(this.settings.innerScreenClasses, this.settings.wrapElem2);
    } else if (window.innerWidth < 780
      && !(this.settings.underScreen)
      && this.settings.innerScreen) {
      document
        .querySelector(`.Screen`)
        .querySelector(`.Screen-section`)
        .remove();
      this.createTitle(this.settings.underScreenClasses, this.settings.wrapElem1);
    }
    //Вводим проверку при условии что было изменено разрешение экрана(поменена ориентация экрана)
    window.onresize = () => {
      //Если ширина экрана менее 780px и если секция
      // с заголовком отсутствует под главным экраном,
      // а также если есть секция внутри главного экрана
      if (window.innerWidth < 780
        && !(this.settings.underScreen)
        && this.settings.innerScreen) {
        document
          .querySelector(`.Screen`)
          .querySelector(`.Screen-section`)
          .remove();
        this.createTitle(this.settings.underScreenClasses, this.settings.wrapElem1);
        
        //Если ширина экрана более 780px и если секция
        // с заголовком отсутствует внутри главного экрана,
        // а также если есть секция под главным экраном
      } else if (window.innerWidth > 780
        && this.settings.underScreen
        && !(this.settings.innerScreen)) {
        document
          .querySelector(`.UnderScreen`)
          .remove();
        this.createTitle(this.settings.innerScreenClasses, this.settings.wrapElem2);
      }
    }
  },
  /**
   * Метод создания титульной секции с информацией
   * @param {[]} classSection Массив, который содержит css классы для секции
   * @param {HTMLElement} wrapElem Html элемент(обертка) в который будем добавлять секцию с информацией
   */
  createTitle(classSection, wrapElem) {
    const section = document.createElement('section');
    section.classList.add(...classSection);
    
    const h1 = document.createElement('h1');
    h1.classList.add('Screen-title', 'wow', 'slideInLeft');
    h1.setAttribute('data-wow-duration', '0.5s');
    h1.innerText = 'Дмитрий Алексеев';
    section.appendChild(h1);
    
    const h2 = document.createElement('h1');
    h2.classList.add('Screen-subTitle', 'wow', 'bounceInLeft');
    h2.setAttribute('data-wow-duration', '1.5s');
    h2.innerText = 'Frontend-разработчик и веб-верстальщик';
    section.appendChild(h2);
    
    const btnPrimary = document.createElement('button');
    btnPrimary.classList.add('ButtonPrimary', 'Screen-ButtonPrimary', 'wow', 'bounceInUp');
    btnPrimary.innerText = 'Узнать больше';
    btnPrimary.setAttribute('type', 'button');
    section.appendChild(btnPrimary);
    
    wrapElem.insertBefore(section, wrapElem.firstChild);
  },
};