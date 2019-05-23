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
const settings = {
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
  
  colorsGradient: [
    {
      firstColor: null,
      secondColor: null,
    },
  ],
};

/**
 * Класс Element
 * @class Element
 */
class Element {
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
  constructor(
    settings,
    arrElements,
    color,
    gradient,
    size,
    speed,
    direction,
    directionAngle,
    text,
  ) {
    this.settings = settings;
    this.arrElements = arrElements;
    this.color = color;
    this.gradient = gradient;
    this.size = size;
    this.speed = speed;
    this.direction = direction;
    this.directionAngle = directionAngle;
    this.text = text;
  };
  
  /**
   * Метод инициализации элемента
   */
  init() {
    //Получаем случайную скорость
    this.speed = Element.getRandomInt(this.settings.minSpeed, this.settings.maxSpeed);
    //Получаем случайный угол движения для элемента
    this.directionAngle = Element.getRandomInt(0, 360);
    //Получаем случайный размер для элемента
    this.size = Element.getRandomInt(this.settings.minSize, this.settings.maxSize);
    //Получаем направление движения элемента
    this.direction = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
    //Получаем текст для текущего элемента из массива
    this.text = this.settings.textElements[Element.getRandomInt(0, this.settings.textElements.length)];
    
    this.objGradient = this.settings.colorsGradient[Element.getRandomInt(0, this.settings.colorsGradient.length)];
  };
  
  /**
   * Метод отрисовки элемента
   * @param {number} startAngle начальный угол вращения элемента
   */
  draw(startAngle) {
    
    let dx = this.position.x + this.size / 2;
    let dy = this.position.y + this.size / 2;
    
    startAngle = startAngle * (Math.PI / 180);
    
    //Получаем градиент для текста элемента
    this.gradient = this.getGradientColor(
      this.objGradient.firstColor,
      this.objGradient.secondColor,
      this.position.x,
      this.position.y,
      30, 350);
    
    this.settings.ctx.save();
    this.settings.ctx.translate(dx, dy);
    this.settings.ctx.rotate(startAngle);
    this.settings.ctx.translate(-dx, -dy);
    this.settings.ctx.fillStyle = this.gradient;
    this.settings.ctx.font = `bold ${this.size}px Roboto`;
    this.settings.ctx.textAlign = 'center';
    this.settings.ctx.textBaseline = 'middle';
    this.settings.ctx.fillText(this.text, this.position.x, this.position.y);
    this.settings.ctx.restore();
    
  };
  
  /**
   * Метод получает случайный цвет для элемента
   * @return {string} color цвет текста элемента
   */
  getColor() {
    return this.settings.colorsElements[Element.getRandomInt(0, this.settings.colorsElements.length)];
  };
  
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
  getGradientColor(firstColor, secondColor, x, y, w, h) {
    const gradient = this.settings.ctx.createLinearGradient(x, y, w, h);
    gradient.addColorStop(0, firstColor);
    gradient.addColorStop(1, secondColor);
    return gradient;
  };
  
  /**
   * Метод получает случайное целое число
   * @param {number} min минимальное значение, при котором будет производиться выбор случайного числа
   * @param {number} max максимальное значение, при котором будет производиться выбор случайного числа
   * @return {number} случайное число
   */
  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  
  /**
   * Метод проверяет наличие границы канваса,
   * если есть то меняем направление движения элемента по осям
   */
  border() {
    if (this.position.x + this.size >= this.settings.width || this.position.x - this.size <= 0) {
      this.direction.x *= -1;
    }
    if (this.position.y + this.size >= this.settings.height || this.position.y - this.size <= 0) {
      this.direction.y *= -1;
    }
    this.drawOnBorder();
  };
  
  /**
   * Метод отрисовывает элемент на границе
   */
  drawOnBorder() {
    this.position.x + this.size > this.settings.width
      ? this.position.x = this.settings.width - this.size
      : this.position.x;
    this.position.y + this.size > this.settings.height
      ? this.position.y = this.settings.height - this.size
      : this.position.y;
    this.position.x - this.size < 0
      ? this.position.x = this.size
      : this.position.x;
    this.position.y - this.size < 0
      ? this.position.y = this.size
      : this.position.y;
  };
  
  /**
   * Метод обновляет значения движения элемента
   */
  update() {
    this.border();
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  };
  
  /**
   * Метод устанавливает начальную позицию элемента
   */
  setPosition() {
    let newPosition;
    
    newPosition = {
      x: Element.getRandomInt(0, this.settings.width),
      y: Element.getRandomInt(0, this.settings.height),
    };
    
    this.position = newPosition;
    this.drawOnBorder();
  };
  
  getRandomArrGradient() {
  
  };
}

const AnimateBg = {
  settings,
  currentAmountElements: null,
  arrElements: [],
  
  /**
   * Метод инициализации скрипта
   * @param {{}} userSettings Пользовательские настройки, если не переданы тогда пустой объект
   */
  init(userSettings = {}) {
    //Если пользователь передал настройки то заменяем их
    this.settings = Object.assign(this.settings, userSettings);
    
    //Получаем начальную ширину и высоту окна
    this.settings.width = this.settings.canvas.width = window.innerWidth;
    this.settings.height = this.settings.canvas.height = window.innerHeight;
    
    //Получаем кол-во элементов при текущем запуске скрипта
    this.currentAmountElements = this.getRandomInt(
      this.settings.minAmountElements,
      this.settings.maxAmountElements,
    );
    //Заполняем массив элементами, и сразу инициализируем у каждого элемента переменные, получаем позицию элемента
    for (let i = 0; i < this.currentAmountElements; i++) {
      let element = new Element(this.settings, this.arrElements);
      element.init();
      element.setPosition();
      this.arrElements.push(element);
    }
    //Выполняем запуск рендеринга
    this.render();
  },
  /**
   * Метод получения случайного целого числа
   * @param {number} min минимальное значение, при котором будет производиться выбор случайного числа
   * @param {number} max максимальное значение, при котором будет производиться выбор случайного числа
   * @return {number} случайное целое число
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  /**
   * Метод запуска рендеринга, отрисовка контента
   */
  render() {
    //Получаем ширину и высоту канваса
    this.settings.width = this.settings.canvas.width = window.innerWidth;
    this.settings.height = this.settings.canvas.height = window.innerHeight;
    
    //Отрисовываем задний фон
    this.settings.ctx.fillStyle = this.settings.bgColor;
    this.settings.ctx.fillRect(0, 0, this.settings.width, this.settings.height);
    
    //Отрисовываем каждый элемент массива
    for (let i = 0; i < this.arrElements.length; i++) {
      this.arrElements[i].draw(this.settings.startAngle);
      this.arrElements[i].update();
      this.arrElements[i].settings.startAngle += 0.02;
    }
    //Если ширина экрана меньше 780 пикселей то прекращаем рендеринг сцены
    if (window.innerWidth >= 780) {
      window.requestAnimationFrame(() => {
        this.render();
      });
    } else {
      this.settings.ctx.clearRect(0, 0, this.settings.width, this.settings.height);
    }
  },
};