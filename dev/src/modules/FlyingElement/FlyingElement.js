/**
 * Класс AnimateBG
 */
class AnimateBg {
  constructor() {
    /**
     * DTO настройки по умолчанию
     * @param {string} canvasId CSS Id элемента canvas
     * @get {HTMLElement} canvas Получаем канвас по CSS id
     * @get {CanvasRenderingContext2D} ctx Получаем контекст канваса
     * @get {number} width Получаем ширину canvas
     * @get {number} height Получаем высоту canvas
     * @param {string} bgColor цвет заднего фона canvas
     * @param {{}} amountElements Объект содержащий минимальное и максимальное кол-во элементов
     * @param {{}} fontSize Объект содержащий минимальный и максимальный размер шрифта
     * @param {{}} speed Объект содержащий минимальную и максимальную скорость элементов
     * @param {number} startAngle начальный угол при вращении элемента
     * @param {[]} arrCoeffs массив коэффициентов уменьшения(увеличения) при вращении элемента
     * @param {[]} arrGradients массив, содержащий объекты цветов для градиента
     * @param {[]} arrWords массив, содержащий слова
     * @param {Boolean} enable включение и отключение скрипта, по умолчанию true(включен)
     */
    this.settings = {
      canvasId: 'Animate',
      canvas: null,
      ctx: null,
      width: null,
      height: null,
      bgColor: 'transparent',
      amountElements: {
        min: 25,
        max: 25,
      },
      fontSize: {
        min: 20,
        max: 30,
      },
      speed: {
        min: 5,
        max: 30,
      },
      arrCoeffs: [0.2, -0.2, 0.5, -0.5],
      arrObjsColors: [
        {
          firstColor: '#ff2f96',
          secondColor: '#ff8f5a',
        },
        {
          firstColor: '#FF0000',
          secondColor: '#ff5a5b',
        },
        {
          firstColor: '#FF7F00',
          secondColor: '#ffaf64',
        },
        {
          firstColor: '#FFFF00',
          secondColor: '#fdff7c',
        },
        {
          firstColor: '#00FF00',
          secondColor: '#66ff73',
        },
        {
          firstColor: '#0000FF',
          secondColor: '#4f57ff',
        },
        {
          firstColor: '#4B0082',
          secondColor: '#715782',
        },
        {
          firstColor: '#8F00FF',
          secondColor: '#b969ff',
        },
      ],
      arrWords: [
        '<DIV>', '{ }', '</>', '#', 'JS', 'Json', 'Html',
        'CSS', 'Pug', 'Sass', 'Gulp', 'Jquery', 'Scss', 'Webpack',
        'SVG', 'Less', 'Stylus', 'Function', 'Math.PI', 'Math.floor',
        'PHP', 'Laravel',
      ],
      painting: false,
      enable: true,
    };
    this.currentAmountElements = null;
    this.arrElements = [];
  }
  
  /**
   * Метод инициализации скрипта
   * @param {{}} userSettings Пользовательские настройки, если не переданы тогда пустой объект
   */
  init(userSettings = {}) {
    //Если пользователь передал настройки то заменяем их
    Object.assign(this.settings, userSettings);
    //Получаем HTMLElement Canvas
    this.settings.canvas = document.getElementById(this.settings.canvasId);
    //Получаем контекст Canvas
    this.settings.ctx = this.settings.canvas.getContext('2d');
    //Получаем ширину экрана и присваеваем ширине canvas
    this.settings.width = this.settings.canvas.width = this.settings.canvas.offsetWidth;
    //Получаем высоту экрана и присваеваем высоте canvas
    this.settings.height = this.settings.canvas.height = this.settings.canvas.offsetHeight;
    //Получаем кол-во элементов при текущем запуске скрипта
    this.currentAmountElements = this.getRandomInt(
      this.settings.amountElements.min,
      this.settings.amountElements.max,
    );
    //Заполняем массив элементами и инициализируем каждый
    for (let i = 0; i < this.currentAmountElements; i++) {
      let element = new Element(this.currentAmountElements, this.arrElements, this.settings);
      element.init();
      element.setPosition();
      this.arrElements.push(element);
    }
    //Выполняем запуск рендеринга
    if (this.settings.enable) {
      this.render();
    }
    
  };
  
  /**
   * Метод получения случайного целого числа
   * @param {number} min минимальное значение, при котором будет производиться выбор случайного числа
   * @param {number} max максимальное значение, при котором будет производиться выбор случайного числа
   * @return {number} случайное целое число
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  
  /**
   * Метод запуска рендеринга, отрисовка контента
   */
  render() {
    //Отрисовываем задний фон
    this.settings.ctx.fillStyle = this.settings.bgColor;
    //Если произошло изменение ширины или высоты экрана, тогда переписываем значения, иначе рендерим как обычно
    if (this.settings.width !== this.settings.canvas.offsetWidth
      || this.settings.height !== this.settings.canvas.offsetHeight) {
      //Получаем ширину экрана и присваеваем ширине canvas
      this.settings.width = this.settings.canvas.width = this.settings.canvas.offsetWidth;
      //Получаем высоту экрана и присваеваем высоте canvas
      this.settings.height = this.settings.canvas.height = this.settings.canvas.offsetHeight;
  }
    if (!this.settings.painting) {
      //Очищаем лишнее после смены позиции элементов
      this.settings.ctx.clearRect(0, 0, this.settings.width, this.settings.height);
    }
    
    //Отрисовываем каждый элемент массива
    for (let i = 0; i < this.arrElements.length; i++) {
      //Отрисовываем текущий элемент
      this.arrElements[i].draw();
      //Проверка, не зашел ли элемент за пределы канваса и Обновление позиции элемента(сдвиг)
      this.arrElements[i].update();
      //Изменение угла вращения элемента
      this.arrElements[i].startAngle += this.arrElements[i].coeffRotate;
    }
    //Запускаем цикл движения элементов
    window.requestAnimationFrame(() => {
      this.render();
    });
  };
}

/**
 * Класс Element
 * @class Element
 */
class Element extends AnimateBg {
  constructor(currentAmountElements, arrElements, settings) {
    super();
    this.currentAmountElements = currentAmountElements;
    this.arrElements = arrElements;
    this.settings = settings;
  };
  
  /**
   * Метод инициализации элемента
   */
  init() {
    //Начальный угол вращения элемента
    this.startAngle = this.getRandomInt(0, 360);
    //Получаем скорость элемента
    this.speed = +(this.getRandomInt(this.settings.speed.min, this.settings.speed.max) / 100).toFixed(1);
    //Получаем направление движения
    this.direction = {
      x: Math.cos(this.startAngle) * this.speed,
      y: Math.sin(this.startAngle) * this.speed,
    };
    //Получаем размер шрифта
    this.fontSize = this.getRandomInt(this.settings.fontSize.min, this.settings.fontSize.max);
    //Получаем слово
    this.word = this.settings.arrWords[this.getRandomInt(0, this.settings.arrWords.length)];
    //Получаем коэффициент вращения элемента
    this.coeffRotate = this.settings.arrCoeffs[this.getRandomInt(0, this.settings.arrCoeffs.length)];
    //Получаем объект с цветовой палитрой
    this.objColors = this.settings.arrObjsColors[this.getRandomInt(0, this.settings.arrObjsColors.length)];
    //Получаем ширину элемента
    this.width = Math.floor(this.settings.ctx.measureText(this.word).width);
    //Получаем высоту элемента
    this.height = Math.floor(this.settings.ctx.measureText('W').width);
    //Получаем размер элемента по диагонали
    this.diagonal = Math.round(Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)));
    //Устанавливаем позицию элемента, присваивая точки  координат x и y
    this.setPosition();
    //Получаем градиент для текста элемента
    this.gradient = this.getGradientColor(this.objColors.firstColor, this.objColors.secondColor,
      this.position.x, this.position.y, this.width, 0);
  };
  
  /**
   * Метод устанавливает начальную позицию элемента
   */
  setPosition() {
    let newPosition;
    
    newPosition = {
      x: this.getRandomInt(0, this.settings.width),
      y: this.getRandomInt(0, this.settings.height),
    };
    
    this.position = newPosition;
    this.drawOnBorder();
  };
  
  /**
   * Метод отрисовывает элемент на границе
   */
  drawOnBorder() {
    this.position.x + this.width > this.settings.width
      ? this.position.x = this.settings.width - this.width
      : this.position.x;
    this.position.y + this.width > this.settings.height
      ? this.position.y = this.settings.height - this.width
      : this.position.y;
    this.position.x - this.width < 0
      ? this.position.x = this.width
      : this.position.x;
    this.position.y - this.width < 0
      ? this.position.y = this.width
      : this.position.y;
  };
  
  /**
   * Метод проверяет наличие границы канваса,
   * если есть то меняем направление движения элемента по осям
   */
  border() {
    if (this.position.x + this.width >= this.settings.width || this.position.x - this.width <= 0) {
      this.direction.x *= -1;
    }
    
    if (this.position.y + this.width >= this.settings.height
      || this.position.y - this.width <= 0) {
      this.direction.y *= -1;
    }
    this.drawOnBorder();
    
  };
  
  /**
   * Метод отрисовки элемента
   */
  draw() {
    //Сохраняем канвас перед поворотом системы координат
    this.settings.ctx.save();
    //Получаем середину элемента по оси X
    let dx = this.position.x + this.diagonal / 2;
    //Получаем середину элемента по оси Y
    let dy = this.position.y + this.diagonal / 2;
    //Получаем из градусов радианы
    let startAngle = this.startAngle * (Math.PI / 180);
    //Смещаем точки координат в центр элемента
    this.settings.ctx.translate(dx, dy);
    //Делаем поворот элемента на полученный радиан
    this.settings.ctx.rotate(startAngle);
    //Возвращаем точки координат в исходное положение
    this.settings.ctx.translate(-dx, -dy);
    
    this.settings.ctx.fillStyle = this.gradient;
    
    this.settings.ctx.font = `900 ${this.fontSize}px Arial`;
    
    let heightSup = Math.floor(this.settings.ctx.measureText('H').width);
    
    this.settings.ctx.fillText(this.word, this.position.x, this.position.y);
    
    // this.settings.ctx.rect(this.position.x, this.position.y + this.height - heightSup, this.width, -this.height);
    
    // this.settings.ctx.stroke();
    
    this.settings.ctx.restore();
    
  };
  
  /**
   * Метод получает градиент для текста элемента
   * @param {string} firstColor первый цвет градиента
   * @param {string} secondColor второй цвет градиента
   * @param {number} xStart координата X начальной точки градиента
   * @param {number} yStart координата Y начальной точки градиента
   * @param {number} xEnd координата X конечной точки градиента
   * @param {number} yEnd координата Y конечной точки градиента
   * @return {CanvasGradient} возвращает градиент
   */
  getGradientColor(firstColor, secondColor, xStart, yStart, xEnd, yEnd) {
    const gradient = this.settings.ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
    gradient.addColorStop(0, firstColor);
    gradient.addColorStop(1, secondColor);
    return gradient;
  };
  
  /**
   * Метод обновляет значения движения элемента
   */
  update() {
    this.border();
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  };
}