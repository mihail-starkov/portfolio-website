'use strict';

//Подключение плагинов
const gulp            = require('gulp'),
      sass            = require('gulp-sass'),
      sourcemaps      = require('gulp-sourcemaps'),
      uglify          = require('gulp-uglify'),
      pug             = require('gulp-pug'),
      gulpPugBeautify = require('gulp-pug-beautify'),
      concat          = require('gulp-concat'),
      rename          = require('gulp-rename'),
      autoprefixer    = require('gulp-autoprefixer'),
      cleanCss        = require('gulp-clean-css'),
      browserSync     = require('browser-sync').create(),
      plumber         = require('gulp-plumber'),
      babel           = require('gulp-babel'),
      del             = require('del'),
      notify          = require('gulp-notify'),
      replace         = require('gulp-replace'),
      svgSprite       = require('gulp-svg-sprite'),
      svgmin          = require('gulp-svgmin'),
      cheerio         = require('gulp-cheerio'),
      gcmq            = require('gulp-group-css-media-queries'),
      gulpStylelint   = require('gulp-stylelint'),
      smartgrid       = require('smart-grid'),
      tinypng         = require('gulp-tinypng-extended');

//Конфиг проекта (пути)
const paths = {
  buildDir: './build',
  devDir: './dev',
  styles: {
    scss: [`./dev/pages/**/*.{scss,sass}`],
    css: `./build/css/`,
    watch: [
      `./dev/pages/**/*.{scss,sass}`,
      `./dev/src/**/*.{scss,sass}`,
    ],
  },
  marking: {
    pug: [`./dev/pages/**/*.{pug,jade}`],
    html: `./build/`,
    watch: [
      `./dev/pages/**/*.{pug,jade}`,
      `./dev/src/**/*.{pug,jade}`,
    ],
  },
  scripts: {
    js: [`./dev/src/**/*.js`],
    vendorsJs: [
      `./dev/vendors/secondaryScripts/**/*.js`,
      `./node_modules/parallax-js/dist/parallax.min.js`,
      `./node_modules/slick-carousel/slick/slick.min.js`,
    ],
    watch: [`./dev/**/*.js`],
    outputDir: `./build/js/`,
    json: {
      watch: [`./data/**/*.json`],
    },
  },
  fonts: {
    srcOut: `./dev/fonts/**/*.`,
    srcIn: `./build/fonts/`,
  },
  img: {
    sprites: `./dev/img/sprites/**/*.{png,svg}`,
    images: `./dev/img/**/*.{png,jpg,svg}`,
    svg: `./dev/img/svg/**/*.svg`,
    outputDir: `./build/img/`,
    watchSvg: [`./dev/img/**/*.{svg}`],
    watch: [`./dev/img/**/*.{png,jpg}`],
  },
};

//Таск компилирующий сетку Smart-Grid
gulp.task('grid', function (cb) {
  smartgrid('./dev/vendors/smart-grid', {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
      maxWidth: '1250px', /* max-width оn very large screen */
      fields: '40px', /* side fields */
    },
    breakPoints: {
      lg: {
        width: '1100px', /* -> @media (max-width: 1100px) */
        fields: '40px', /* side fields */
      },
      md: {
        width: '960px',
        fields: '20px', /* side fields */
      },
      sm: {
        width: '780px',
        fields: '20px', /* side fields */
      },
      xs: {
        width: '560px',
        fields: '20px', /* side fields */
      },
      /*
       We can create any quantity of break points.
       
       some_name: {
       width: 'Npx',
       fields: 'N(px|%|rem)',
       offset: 'N(px|%|rem)'
       }
       */
    },
  });
  cb();
});

//Линтирование Scss файлов
gulp.task('styleLint:dev', () => {
  return gulp.src(paths.styles.scss)
    .pipe(gulpStylelint({
      fix: 'true',
      console: true,
      reporters: [{
        formatter: 'string',
        console: true,
      }],
    }))
});

//Обработка стилей при разработке
gulp.task('styles:dev', () => {
  return gulp.src(paths.styles.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.css))
    .on('end', browserSync.reload);
});

//Обработка стилей в продакшен
gulp.task('styles:prod', () => {
  return gulp.src(paths.styles.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gcmq())
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(cleanCss({
      level: 2,
      compatibility: 'ie8',
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.css));
});

//Обработка скриптов при разработке
gulp.task('scripts:dev', () => {
  return gulp.src(paths.scripts.js)
    .pipe(concat('scripts.js'))
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.outputDir))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

//Копипаст вендорных скриптов при разработке
gulp.task('scriptsCopy:dev', () => {
  return gulp.src(paths.scripts.vendorsJs)
    .pipe(gulp.dest(paths.scripts.outputDir))
});

//Обработка скриптов в продакшен
gulp.task('scripts:prod', () => {
  return gulp.src(paths.scripts.js)
    .pipe(concat('scripts.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scripts.outputDir));
});

//Синхронизация с поднятым веб-сервером
gulp.task('sync:dev', () => {
  browserSync.init({
    server: paths.buildDir,
  });
});

//Обработка pug файлов при разработке
gulp.task('pug:dev', () => {
  return gulp.src(paths.marking.pug)
    .pipe(pug({
      locals: {
        'content': './data/content.json',
      },
      pretty: true,
    }))
    .on('error', notify.onError(function (error) {
      return {
        title: 'Pug',
        message: error.message,
      };
    }))
    .pipe(gulpPugBeautify({omit_empty: true}))
    .pipe(gulp.dest(paths.marking.html))
    .on('end', browserSync.reload);
});

//Перенос изображений при разработке, - сами изображения не минифицируются
gulp.task('img:dev', () => {
  return gulp.src(paths.img.images)
    .pipe(gulp.dest(paths.img.outputDir));
});

//Обработка изображений в продакшен - минификация
gulp.task('img:prod', () => {
  return gulp.src(paths.img.images)
    .pipe(plumber())
    .pipe(tinypng({
      key: 'l_n597h7l8zqCe0AzFUT_66xEPZysnrr',
      sigFile: './dev/img/.tinypng-sigs',
      log: true,
      summarize: true,
    }))
    .pipe(gulp.dest(paths.img.outputDir));
});

//Обработка SVG, удаляем лишние аттрибуты, минифицируем и добавляем в спрайт
gulp.task('svg:dev', () => {
  return gulp.src(paths.img.svg)
    .pipe(svgmin({
      js2svg: {
        pretty: true,
      },
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true},
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(plumber())
    .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: 'sprite.svg',
          },
        },
      },
    ))
    .pipe(gulp.dest(paths.img.outputDir));
});

//Переносим шрифты
gulp.task('fonts:dev', () => {
  return gulp.src(paths.fonts.srcOut)
    .pipe(gulp.dest(paths.fonts.srcIn));
});

//Очищаем папку build
gulp.task('clean:dev', () => {
  return del([
    paths.buildDir,
  ]);
});

//Задача слежения за файлами
gulp.task('watch:dev', () => {
  gulp.watch(paths.marking.watch, gulp.series('pug:dev'));//Watcher на pug файлы
  gulp.watch(paths.styles.watch, gulp.series('styles:dev', 'styleLint:dev'));//Watcher на Scss файлы
  gulp.watch(paths.scripts.watch, gulp.series('scripts:dev'));//Watcher на скрипты
  gulp.watch(paths.img.watch, gulp.series('img:dev'));//Watcher на изображения
  gulp.watch(paths.img.watchSvg, gulp.series('svg:dev'));//Watcher на SVG изображения
  gulp.watch(paths.scripts.json.watch, gulp.series('pug:dev'));//Watcher на Data файлы
});

gulp.task('dev', gulp.series('clean:dev',
  gulp.parallel(
    'styleLint:dev',
    'scriptsCopy:dev',
    'styles:dev',
    'pug:dev',
    'scripts:dev',
    'img:dev',
    'svg:dev',
    'fonts:dev',
  )));

gulp.task('build', gulp.series('clean:dev',
  gulp.parallel('styles:prod', 'pug:dev', 'scripts:prod', 'img:prod', 'svg:dev', 'fonts:dev')));

gulp.task('default', gulp.series('dev',
  gulp.parallel('watch:dev', 'sync:dev'),
));