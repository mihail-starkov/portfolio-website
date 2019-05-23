'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ButtonBurger = {
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
      return document.querySelector(".".concat(this.ButtonBurgerClass));
    },

    ButtonBurgerModActiveClass: 'ButtonBurger_active',
    SwipeClass: 'Swipe',

    get Swipe() {
      return document.querySelector(".".concat(this.SwipeClass));
    },

    SwipeModActiveClass: 'Swipe_active',
    ContentClass: 'Content',

    get Content() {
      return document.querySelector(".".concat(this.ContentClass));
    },

    ContentModActiveClass: 'Content_active',
    keys: {
      37: 1,
      38: 1,
      39: 1,
      40: 1
    }
  },

  /**
   * Метод инициализации
   * @param {{}} userSettings Переданные пользовательские настройки, по умолчанию пустой объект
   */
  init: function init() {
    var _this = this;

    var userSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.settings = Object.assign(this.settings, userSettings);
    this.settings.ButtonBurger.addEventListener('click', function (e) {
      _this.settings.ButtonBurger.classList.toggle(_this.settings.ButtonBurgerModActiveClass);

      _this.settings.Swipe.classList.toggle(_this.settings.SwipeModActiveClass);

      _this.settings.Content.classList.toggle(_this.settings.ContentModActiveClass);

      if (_this.settings.Content.classList.contains(_this.settings.ContentModActiveClass)) {
        _this.disableScroll();
      } else {
        _this.enableScroll();
      }
    });
  },

  /**
   * Метод отмены события
   * @param {Event} e Событие, которое нужно проверить и отменять или не отменять
   */
  preventDefault: function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  },

  /**
   * Метод проверяет, если была ли нажата одна из клавиш массива keys
   * @param {Event} e Событие при нажатии на кнопку
   * @return {boolean} false для отключения  и отмены действия нажатой клавиши
   */
  preventDefaultForScrollKeys: function preventDefaultForScrollKeys(e) {
    if (this.settings.keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  },

  /**
   * Метод отключения скролла на странице
   */
  disableScroll: function disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    document.addEventListener('wheel', this.preventDefault, {
      passive: false
    }); // Disable scrolling in Chrome

    window.onwheel = this.preventDefault; // modern standard

    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE

    window.ontouchmove = this.preventDefault; // mobile

    document.onkeydown = this.preventDefaultForScrollKeys;
  },

  /**
   * Метод включения скролла на странице
   */
  enableScroll: function enableScroll() {
    if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    document.removeEventListener('wheel', this.preventDefault, {
      passive: false
    }); // Enable scrolling in Chrome

    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }
};
'use strict';

var buttonScrollingPage = {
  /**
   *  DTO Объект с настройками
   *  @property {string} buttonId CSS ID кнопки
   */
  settings: {
    buttonId: 'ButtonTop'
  },

  /**
   * Метод инициализации скрипта
   * @param {{}} userSettings Пользовательские настройки
   */
  init: function init() {
    var _this2 = this;

    var userSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.settings = Object.assign(this.settings, userSettings);
    document.getElementById("".concat(this.settings.buttonId)).addEventListener('click', this.scrollingTopPage);

    window.onscroll = function () {
      _this2.isShowButton();
    };
  },

  /**
   * Метод прокрутки всей страницы на верх
   */
  scrollingTopPage: function scrollingTopPage() {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  },

  /**
   * Метод, определяет - показывать кнопку "Наверх" или нет
   */
  isShowButton: function isShowButton() {
    var btnTop = document.getElementById("".concat(this.settings.buttonId));

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btnTop.style.display = 'block';
    } else {
      btnTop.style.display = 'none';
    }
  }
};
/**
 * DTO настройки скрипта по умолчанию
 * @property {string} canvasId CSS Id канваса
 * @property {HTMLElement} canvas -тег Canvas
 * @property {CanvasRenderingContext2D} ctx -контекст  Canvas
 * @property {number} width -ширина  Canvas - по умолчанию null
 * @property {number} height -высота  Canvas - по умолчанию null
 * @property {string} bgColor -цвет фона canvas по умолчанию transparent
 * @property {[]} colorsElements -массив, содержащий цвета элементов
 * @property {[]} textElements -массив, содержащий текст элементов
 * @property {number} maxAmountElements - Минимальное число элементов
 * @property {number} minAmountElements - Максимальное число элементов
 * @property {number} minSize - Минимальный размер элемента
 * @property {number} maxSize - Максимальный размер элемента
 * @property {number} minSpeed - Минимальная скорость элемента
 * @property {number} maxSpeed - Максимальная скорость элемента
 * @property {number} startAngle - Начальный угол вращения
 */

var settings = {
  canvasId: 'Animate',

  get canvas() {
    return document.getElementById(this.canvasId);
  },

  get ctx() {
    return this.canvas.getContext('2d');
  },

  width: null,
  height: null,
  bgColor: 'transparent',
  colorsElements: ['red', 'green', 'blue'],
  textElements: ['<div>', '{ }', '</>', '#', 'JS', 'JSON', 'Html', 'CSS', 'Pug', 'Sass', 'Gulp', 'Jquery'],
  maxAmountElements: 25,
  minAmountElements: 25,
  minSize: 15,
  maxSize: 50,
  minSpeed: 1,
  maxSpeed: 1.5,
  startAngle: 0,
  colorsGradient: [{
    firstColor: null,
    secondColor: null
  }]
};
/**
 * Класс Element
 * @class Element
 */

var Element =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @param {{}} settings переданные настройки
   * @param {[]} arrElements переданный массив элементов
   * @param {string} color цвет элемента
   * @param {CanvasGradient} gradient градиент для текста
   * @param {number} size размер элемента
   * @param {number} speed скорость элемента
   * @param {number} direction направление элемента
   * @param {number} directionAngle угол направления
   * @param {string} text Текст элемента
   */
  function Element(settings, arrElements, color, gradient, size, speed, direction, directionAngle, text) {
    _classCallCheck(this, Element);

    this.settings = settings;
    this.arrElements = arrElements;
    this.color = color;
    this.gradient = gradient;
    this.size = size;
    this.speed = speed;
    this.direction = direction;
    this.directionAngle = directionAngle;
    this.text = text;
  }

  _createClass(Element, [{
    key: "init",

    /**
     * Метод инициализации элемента
     */
    value: function init() {
      //Получаем случайную скорость
      this.speed = Element.getRandomInt(this.settings.minSpeed, this.settings.maxSpeed); //Получаем случайный угол движения для элемента

      this.directionAngle = Element.getRandomInt(0, 360); //Получаем случайный размер для элемента

      this.size = Element.getRandomInt(this.settings.minSize, this.settings.maxSize); //Получаем направление движения элемента

      this.direction = {
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed
      }; //Получаем текст для текущего элемента из массива

      this.text = this.settings.textElements[Element.getRandomInt(0, this.settings.textElements.length)];
      this.objGradient = this.settings.colorsGradient[Element.getRandomInt(0, this.settings.colorsGradient.length)];
    }
  }, {
    key: "draw",

    /**
     * Метод отрисовки элемента
     * @param {number} startAngle начальный угол вращения элемента
     */
    value: function draw(startAngle) {
      var dx = this.position.x + this.size / 2;
      var dy = this.position.y + this.size / 2;
      startAngle = startAngle * (Math.PI / 180); //Получаем градиент для текста элемента

      this.gradient = this.getGradientColor(this.objGradient.firstColor, this.objGradient.secondColor, this.position.x, this.position.y, 30, 350);
      this.settings.ctx.save();
      this.settings.ctx.translate(dx, dy);
      this.settings.ctx.rotate(startAngle);
      this.settings.ctx.translate(-dx, -dy);
      this.settings.ctx.fillStyle = this.gradient;
      this.settings.ctx.font = "bold ".concat(this.size, "px Roboto");
      this.settings.ctx.textAlign = 'center';
      this.settings.ctx.textBaseline = 'middle';
      this.settings.ctx.fillText(this.text, this.position.x, this.position.y);
      this.settings.ctx.restore();
    }
  }, {
    key: "getColor",

    /**
     * Метод получает случайный цвет для элемента
     * @return {string} color цвет текста элемента
     */
    value: function getColor() {
      return this.settings.colorsElements[Element.getRandomInt(0, this.settings.colorsElements.length)];
    }
  }, {
    key: "getGradientColor",

    /**
     * Метод получает градиент для текста элемента
     * @param {string} firstColor Первый цвет градиента
     * @param {string} secondColor Второй цвет градиента
     * @param {number} x начальная координата градиента относительно верхнего левого угла canvas по оси x
     * @param {number} y начальная координата градиента относительно верхнего левого угла canvas по оси y
     * @param {number} w координата конечной точки градиента по оси x
     * @param {number} h координата конечной точки градиента по оси y
     * @return {CanvasGradient} Возвращает градиент
     */
    value: function getGradientColor(firstColor, secondColor, x, y, w, h) {
      var gradient = this.settings.ctx.createLinearGradient(x, y, w, h);
      gradient.addColorStop(0, firstColor);
      gradient.addColorStop(1, secondColor);
      return gradient;
    }
  }, {
    key: "border",

    /**
     * Метод проверяет наличие границы канваса,
     * если есть то меняем направление движения элемента по осям
     */
    value: function border() {
      if (this.position.x + this.size >= this.settings.width || this.position.x - this.size <= 0) {
        this.direction.x *= -1;
      }

      if (this.position.y + this.size >= this.settings.height || this.position.y - this.size <= 0) {
        this.direction.y *= -1;
      }

      this.drawOnBorder();
    }
  }, {
    key: "drawOnBorder",

    /**
     * Метод отрисовывает элемент на границе
     */
    value: function drawOnBorder() {
      this.position.x + this.size > this.settings.width ? this.position.x = this.settings.width - this.size : this.position.x;
      this.position.y + this.size > this.settings.height ? this.position.y = this.settings.height - this.size : this.position.y;
      this.position.x - this.size < 0 ? this.position.x = this.size : this.position.x;
      this.position.y - this.size < 0 ? this.position.y = this.size : this.position.y;
    }
  }, {
    key: "update",

    /**
     * Метод обновляет значения движения элемента
     */
    value: function update() {
      this.border();
      this.position.x += this.direction.x;
      this.position.y += this.direction.y;
    }
  }, {
    key: "setPosition",

    /**
     * Метод устанавливает начальную позицию элемента
     */
    value: function setPosition() {
      var newPosition;
      newPosition = {
        x: Element.getRandomInt(0, this.settings.width),
        y: Element.getRandomInt(0, this.settings.height)
      };
      this.position = newPosition;
      this.drawOnBorder();
    }
  }, {
    key: "getRandomArrGradient",
    value: function getRandomArrGradient() {}
  }], [{
    key: "getRandomInt",

    /**
     * Метод получает случайное целое число
     * @param {number} min минимальное значение, при котором будет производиться выбор случайного числа
     * @param {number} max максимальное значение, при котором будет производиться выбор случайного числа
     * @return {number} случайное число
     */
    value: function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }]);

  return Element;
}();

var AnimateBg = {
  settings: settings,
  currentAmountElements: null,
  arrElements: [],

  /**
   * Метод инициализации скрипта
   * @param {{}} userSettings Пользовательские настройки, если не переданы тогда пустой объект
   */
  init: function init() {
    var userSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    //Если пользователь передал настройки то заменяем их
    this.settings = Object.assign(this.settings, userSettings); //Получаем начальную ширину и высоту окна

    this.settings.width = this.settings.canvas.width = window.innerWidth;
    this.settings.height = this.settings.canvas.height = window.innerHeight; //Получаем кол-во элементов при текущем запуске скрипта

    this.currentAmountElements = this.getRandomInt(this.settings.minAmountElements, this.settings.maxAmountElements); //Заполняем массив элементами, и сразу инициализируем у каждого элемента переменные, получаем позицию элемента

    for (var i = 0; i < this.currentAmountElements; i++) {
      var element = new Element(this.settings, this.arrElements);
      element.init();
      element.setPosition();
      this.arrElements.push(element);
    } //Выполняем запуск рендеринга


    this.render();
  },

  /**
   * Метод получения случайного целого числа
   * @param {number} min минимальное значение, при котором будет производиться выбор случайного числа
   * @param {number} max максимальное значение, при котором будет производиться выбор случайного числа
   * @return {number} случайное целое число
   */
  getRandomInt: function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  /**
   * Метод запуска рендеринга, отрисовка контента
   */
  render: function render() {
    var _this3 = this;

    //Получаем ширину и высоту канваса
    this.settings.width = this.settings.canvas.width = window.innerWidth;
    this.settings.height = this.settings.canvas.height = window.innerHeight; //Отрисовываем задний фон

    this.settings.ctx.fillStyle = this.settings.bgColor;
    this.settings.ctx.fillRect(0, 0, this.settings.width, this.settings.height); //Отрисовываем каждый элемент массива

    for (var i = 0; i < this.arrElements.length; i++) {
      this.arrElements[i].draw(this.settings.startAngle);
      this.arrElements[i].update();
      this.arrElements[i].settings.startAngle += 0.02;
    } //Если ширина экрана меньше 780 пикселей то прекращаем рендеринг сцены


    if (window.innerWidth >= 780) {
      window.requestAnimationFrame(function () {
        _this3.render();
      });
    } else {
      this.settings.ctx.clearRect(0, 0, this.settings.width, this.settings.height);
    }
  }
};
'use strict';
/**
 * Объект меню
 */


var menu = {
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
    dataAttr: 'data-section'
  },

  /**
   *Метод инициализации скрипта
   */
  init: function init() {
    var _this4 = this;

    var userSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.settings = Object.assign(this.settings, userSettings);
    document.querySelectorAll(".".concat(this.settings.menuClass)).forEach(function (menu) {
      menu.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.classList.contains("".concat(_this4.settings.menuLinkClass))) {
          _this4.moveToSection(e.target);

          _this4.removeStyleClass();

          _this4.setStyleClass(e.target);
        }
      });
    });
  },

  /**
   * Метод прокручивает страницу к нужной секции
   * @param {EventTarget} link элемент на котором произошло событие клик
   */
  moveToSection: function moveToSection(link) {
    document.getElementById(this.getDesiredSection(link)).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  },

  /**
   * Метод Получает нужную секцию, к которой нужно перейти и отдает
   * @param {EventTarget} link элемент на котором произошло событие клик
   * @return {string} Возвращает CSS Id из аттрибута для перехода к нужной секции страницы
   */
  getDesiredSection: function getDesiredSection(link) {
    return link.getAttribute(this.settings.dataAttr);
  },

  /**
   * Метод удаляет CSS класс у элемента
   */
  removeStyleClass: function removeStyleClass() {
    var _this5 = this;

    document.querySelectorAll(".".concat(this.settings.menuLinkClass)).forEach(function (link) {
      link.classList.remove(_this5.settings.menuLinkModActiveClass);
    });
  },

  /**
   * Метод устанавливает класс Css у элемента в верхнем и нижнем менню
   * @param {EventTarget} transLink Элемент по которому был произведен клик
   */
  setStyleClass: function setStyleClass(transLink) {
    var _this6 = this;

    document.querySelectorAll(".".concat(this.settings.menuLinkClass)).forEach(function (link) {
      if (transLink.text === link.text) {
        link.classList.add(_this6.settings.menuLinkModActiveClass);
      }
    });
    transLink.classList.add(this.settings.menuLinkModActiveClass);
  }
};
menu.init();
'use strict';
/**
 * Объект SwipeMenu
 */


var swipeMenu = {
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
    contentModActiveClass: 'Content_active'
  },

  /**
   * Метод инициализации скрипта
   * @param {{}} userSettings пользовательские настройки
   */
  init: function init() {
    var _this7 = this;

    var userSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.settings = Object.assign(this.settings, userSettings);
    document.querySelector(".".concat(this.settings.swipeMenuClass)).addEventListener('click', function (e) {
      if (e.target.classList.contains(_this7.settings.menuLinkClass)) {
        document.querySelector(".".concat(_this7.settings.swipeClass)).classList.remove(_this7.settings.swipeModActiveClass);
        document.querySelector(".".concat(_this7.settings.buttonBurgerClass)).classList.remove(_this7.settings.buttonBurgerModActiveClass);
        document.querySelector(".".concat(_this7.settings.contentClass)).classList.remove(_this7.settings.contentModActiveClass);
      }
    });
  }
};