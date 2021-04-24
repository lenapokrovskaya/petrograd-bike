let preprocessor = 'sass'; // Выбор препроцессора в проекте - sass или less


// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');
  // Подключаем Browsersync
const browserSync = require('browser-sync').create();

// Подключаем gulp-concat
const concat = require('gulp-concat');
 
// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass');
const less = require('gulp-less');

// Подключаем sprite svg

const svgstore = require("gulp-svgstore");

// Подключаем gulp-rename
const rename = require("gulp-rename");
 
// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
 
// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

// Подключаем gulp-imagemin для работы с изображениями
const imagemin = require('gulp-imagemin');
 
// Подключаем модуль gulp-newer
const newer = require('gulp-newer');
 
// Подключаем модуль del
const del = require('del');




// Определяем логику работы Browsersync
function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'source/' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: false // Режим работы: true или false
	})
}

function scripts() {
return src([ // Берём файлы из источников
	'source/js/main-nav.js', // Пример подключения библиотеки
	'source/js/script.js', // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
	])
.pipe(concat('script.min.js')) // Конкатенируем в один файл
.pipe(uglify()) // Сжимаем JavaScript
.pipe(dest('source/js/')) // Выгружаем готовый файл в папку назначения
.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}


function startwatch() {
// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
watch(['source/**/*.js', '!source/**/*.min.js'], scripts);

// Мониторим файлы препроцессора на изменения
watch('source/**/' + preprocessor + '/**/*', styles);

// Мониторим файлы HTML на изменения
watch('source/**/*.html').on('change', browserSync.reload);

}

function styles() {
	return src('source/' + preprocessor + '/main.' + preprocessor + '') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
	.pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat('style.min.css')) // Конкатенируем в файл app.min.js
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest('source/css/')) // Выгрузим результат в папку "app/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}
////////////
// function sprite() {
//   return src('source/img/**/icon-*.svg')
//     .pipe(svgstore())
//     .pipe(rename('sprite.svg'))
//     .pipe(dest('build/img/'))
// }
// exports.sprite = sprite;
// /////////////


function buildcopy() {
	return src([ // Выбираем нужные файлы
		'source/css/**/*.min.css',
		'source/js/**/*.min.js',
		'source/img/**/*',
		'source/fonts/**/*',
		'source/**/*.html',
		], { base: 'source' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest('docs')) // Выгружаем в папку с финальной сборкой
}

function cleandist() {
	return del('docs/**/*', { force: true }) // Удаляем всё содержимое папки "dist/"
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;
 
// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;

// Экспортируем функцию styles() в таск styles
exports.styles = styles;



// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, scripts, browsersync, startwatch);
// Создаём новый таск "build", который последовательно выполняет нужные операции
exports.build = series(cleandist, styles, scripts, buildcopy);

