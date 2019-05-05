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
const config = {
  build: {
    MainDir: './build/',
    css: {
      src: './build/css/',
    },
    jsMain: {
      src: './build/js/',
    },
    jsLibs: {
      src: './build/js/libs/',
    },
    img: {
      src: './build/img/',
    },
    svg: {
      src: './build/img/svg/',
    },
    fonts: {
      src: './build/fonts/',
    },
  },
  dev: {
    fonts: {
      src: './dev/fonts/**/*.*',
    },
    styleLint: {
      src: './dev/src/**/*.{scss,sass}',
    },
    scss: {
      src: ['./dev/pages/**/*.scss'],
      watch: ['./dev/pages/**/*.{scss,sass}', './dev/src/**/*.{scss,sass}'],
    },
    pug: {
      src: './dev/pages/**/*.pug',
      watch: ['./dev/pages/**/*.pug', './dev/src/**/*.pug'],
    },
    jsMain: {
      src: './dev/src/modules/**/*.js',
      watch: ['./dev/src/modules/**/*.js'],
    },
    jsLibs: {
      src: './dev/vendors/JSLibs/**/*.js',
    },
    img: {
      src: './dev/img/**/*.{jpg,png}',
      watch: './dev/img/**/*.{jpg,png}',
    },
    svg: {
      src: './dev/img/**/*.svg',
      watch: './dev/img/**/*.svg',
    },
    json: {
      watch: './data/**/*.json',
    },
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
gulp.task('styleLint:dev', function () {
  return gulp.src([config.dev.styleLint.src, '!./dev/vendors/**/*.{scss,sass}'])
    .pipe(gulpStylelint({
      fix: 'true',
      console: true,
      reporters: [
        
        {formatter: 'string', console: true},
      ],
    }))
});

//Обработка стилей при разработке
gulp.task('styles:dev', function () {
  return gulp.src(config.dev.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.build.css.src))
    .on('end', browserSync.reload);
});

//Обработка стилей в продакшен
gulp.task('styles:prod', function () {
  return gulp.src(config.dev.scss.src)
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
    .pipe(gulp.dest(config.build.css.src));
});

//Обработка скриптов при разработке
gulp.task('scripts:dev', function () {
  return gulp.src(config.dev.jsMain.src)
    .pipe(concat('scripts.js'))
    .pipe(babel())
    .pipe(gulp.dest(config.build.jsMain.src))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

//Обработка скриптов в продакшен
gulp.task('scripts:prod', function () {
  return gulp.src(config.dev.jsMain.src)
    .pipe(concat('scripts.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.build.jsMain.src));
});

//Синхронизация с поднятым веб-сервером
gulp.task('sync:dev', function () {
  browserSync.init({
    server: config.build.MainDir,
  });
});

//Обработка pug файлов при разработке
gulp.task('pug:dev', function () {
  return gulp.src(config.dev.pug.src)
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
    .pipe(gulp.dest(config.build.MainDir))
    .on('end', browserSync.reload);
});

//Перенос изображений при разработке, - сами изображения не минифицируются
gulp.task('img:dev', function () {
  return gulp.src(config.dev.img.src)
    .pipe(gulp.dest(config.build.img.src));
});

//Обработка изображений в продакшен - минификация
gulp.task('img:prod', function () {
  return gulp.src(config.dev.img.src)
    .pipe(plumber())
    .pipe(tinypng({
      key: 'l_n597h7l8zqCe0AzFUT_66xEPZysnrr',
      sigFile: './dev/img/.tinypng-sigs',
      log: true,
      summarize: true,
    }))
    .pipe(gulp.dest(config.build.img.src));
});

//Обработка SVG, удаляем лишние аттрибуты, минифицируем и добавляем в спрайт
gulp.task('svg:dev', () => {
  return gulp.src('./dev/img/svg/*.svg')
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
    .pipe(gulp.dest(config.build.svg.src));
});
//Контентные изображения формата SVG переносим
gulp.task('svg-content:dev', function () {
  return gulp.src('./dev/img/content/*.svg')
    .pipe(gulp.dest(config.build.img.src));
});

//Переносим шрифты
gulp.task('fonts:dev', function () {
  return gulp.src(config.dev.fonts.src)
    .pipe(gulp.dest(config.build.fonts.src));
});

//Очищаем папку build
gulp.task('clean:dev', function () {
  return del([
    config.build.MainDir,
  ]);
});

//Задача слежения за файлами
gulp.task('watch:dev', function () {
  gulp.watch(config.dev.pug.watch, gulp.series('pug:dev'));
  gulp.watch(config.dev.scss.watch, gulp.series('styles:dev', 'styleLint:dev'));
  gulp.watch(config.dev.jsMain.watch, gulp.series('scripts:dev'));
  gulp.watch(config.dev.img.watch, gulp.series('img:dev'));
  gulp.watch(config.dev.svg.watch, gulp.series('svg:dev'));
  gulp.watch(config.dev.json.watch, gulp.series('pug:dev'));
});

gulp.task('dev', gulp.series('clean:dev',
  gulp.parallel(
    'styleLint:dev',
    'styles:dev',
    'pug:dev',
    'scripts:dev',
    'img:dev',
    'svg-content:dev',
    'svg:dev',
    'fonts:dev',
  )));

gulp.task('build', gulp.series('clean:dev',
  gulp.parallel('styles:prod', 'pug:dev', 'scripts:prod', 'img:prod', 'svg:dev', 'fonts:dev')));

gulp.task('default', gulp.series('dev',
  gulp.parallel('watch:dev', 'sync:dev'),
));