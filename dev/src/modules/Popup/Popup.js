'use strict';

const popup = {
  /**
   * DTO Обьект с настройками по умолчанию
   * @param {string} maskPhoneId CSS Id для поля ввода
   * @param {string} matrix - матрица по которой будет отображаться номер(маска)
   * @param {boolean} isStatus - если true тогда отправляем форму,иначе false
   */
  settings: {
    maskPhoneId: 'maskPhone',
    matrix: '+7 (___) ___-__-__',
    isStatus: false,
  },
  /**
   * Метод инициализирует popup
   * @param {{}} userSettings Пользоватльские настройки, переданные через init
   */
  init(userSettings = {}) {
    this.settings = Object.assign(this.settings, userSettings);
    //Обработчик на создания Popup динамически
    document
      .querySelectorAll(`.ButtonDefault`).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.createForm(e);
      });
    });
    
    document
      .querySelectorAll(`.ButtonPrimary`).forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.createForm(e);
      });
    });
    
  },
  /**
   * Метод отправляет заполненую форму
   * @param {Event} e событие при отправке формы
   */
  sendForm(e) {
    if (!this.settings.isStatus) {
      e.preventDefault();
    }
  },
  /**
   * Метод закрывает Popup и удаляет из Dom
   */
  closeForm() {
    document.querySelector(`.Popup`).remove();
  },
  /**
   * Метод устанавливает курсор в поле ввода телефона
   * @param {EventTarget} elem input с номером телефона
   */
  setCursorPosition(elem) {
    let pos = elem.value.length;
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select()
    }
  },
  /**
   * Метод определяет матрицу по которой будет отображаться вводимый номер телефона
   * @param {Event} e Событие при изменении поля ввода номера телефона
   */
  mask(e) {
    
    let i            = 0,
        defaultValue = this.settings.matrix.replace(/\D/g, ''),
        val          = e.target.value.replace(/\D/g, '');
    
    if (defaultValue.length >= val.length) {
      val = defaultValue;
    }
    
    e.target.value = this.settings.matrix.replace(/./g, function (a) {
      
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      
    });
    
    if (event.type === 'blur') {
      
      if (event.target.value.length === 2) {
        event.target.value = '';
      }
      
    } else {
      this.setCursorPosition(e.target);
    }
    
  },
  /**
   * Метод создаём Popup
   * @param {Event} e Событие по кнопке
   */
  hideElement(e) {
    if(e.target.classList.contains('Popup-text')){
      e.target.classList.add('Popup-text_hide');
      setTimeout(() => {
        e.target.innerHTML = '<label>c&nbsp;<input class="Popup-time" type="time" name="fromTime" min="00:00" max="23:59" value="09:00"></label><label>&nbsp;до&nbsp;<input class="Popup-time" type="time" name="toTime" min="00:00" max="23:59" value="22:00"></label>';
        e.target.classList.remove(`Popup-text_hide`);
        e.target.classList.add(`Popup-text_show`);
      }, 500);
      e.target.removeEventListener('click', this.hideElement);
    }

  },
  createForm(e) {
    let popup = document.createElement('div');
    popup.classList.add('Popup');
    
    let overlay = document.createElement('div');
    overlay.classList.add('Popup-overlay');
    overlay.addEventListener('click', () => {
      this.closeForm();
    });
    popup.appendChild(overlay);
    
    let form = document.createElement('form');
    form.classList.add('Popup-form');
    form.setAttribute('method', 'GET');
    popup.appendChild(form);
    
    let heading = document.createElement('h2');
    heading.classList.add('Popup-heading');
    heading.innerText = 'Оставьте свой номер телефона и я Вам перезвоню!';
    form.appendChild(heading);
    
    let labelPair = document.createElement('label');
    labelPair.classList.add('Popup-pair');
    form.appendChild(labelPair);
    
    let svgPhone = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgPhone.classList.add('icon', 'icon-phone', 'Phone-icon', 'Popup-phoneIcon');
    svgPhone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgPhone.setAttribute('viewBox', '0 0 512 512');
    svgPhone.innerHTML = '<path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/>';
    labelPair.appendChild(svgPhone);
    
    let inputMask = document.createElement('input');
    inputMask.classList.add('Popup-numPhone');
    inputMask.id = 'maskPhone';
    inputMask.setAttribute('type', 'text');
    inputMask.setAttribute('name', 'phone');
    inputMask.addEventListener('input', (e) => {
      this.mask(e)
    }, false);
    inputMask.addEventListener('focus', (e) => {
      this.mask(e)
    }, false);
    inputMask.addEventListener('blur', (e) => {
      this.mask(e)
    }, false);
    labelPair.appendChild(inputMask);
    
    let spanText = document.createElement('span');
    spanText.classList.add('Popup-text');
    spanText.innerText = 'Выбрать время для звонка';
    spanText.addEventListener('click', this.hideElement);
    form.appendChild(spanText);
    
    let row = document.createElement('div');
    row.classList.add('Popup-row');
    form.appendChild(row);
    
    let btnSend = document.createElement('button');
    btnSend.setAttribute('type', 'submit');
    btnSend.classList.add('Popup-ButtonSend');
    btnSend.innerText = 'Жду звонка';
    btnSend.addEventListener('click', (e) => {
      this.sendForm(e);
    });
    form.appendChild(btnSend);
    
    let btnClose = document.createElement('button');
    btnClose.setAttribute('type', 'button');
    btnClose.classList.add('Popup-ButtonClose', 'ButtonClose');
    btnClose.addEventListener('click', (e) => {
      this.closeForm();
    });
    form.appendChild(btnClose);
    
    document.body.appendChild(popup);
  },
};