const sass = require('gulp-sass')(require('sass'));

const project_folder = "dist";
const source_folder = "src";

const path = {
  build: {
    html: project_folder,
    css: project_folder + "/css",
    js: project_folder + "/js",
    img: project_folder + "/img"
  },
  src: {
    html: source_folder + "/*.html",
    css: source_folder + "/scss/styles.scss",
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/*.{svg,jpg,png}"
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{svg,jpg,png}",
  },
  clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  clean = require('gulp-clean');

const browserSync = () => {
  browsersync.init({
    server: {
      baseDir: project_folder
    },
    port: 3000,
    notify: false
  })
};

const html = () => {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
};

const img = () => {
  return src(path.src.img)
    .pipe(dest(path.build.img))
};

const css = () => {
  return src(path.src.css)
    .pipe(sass())
    .pipe(dest(path.build.css))
};

const js = () => {
  return src(path.src.js)
    .pipe(dest(path.build.js))
};

const cleaner = () => {
  return src('dist',
    { read: false })
    .pipe(clean());
};

const watchFiles = () => {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
}

let build = gulp.series(gulp.parallel(html, js, css, img));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.img = img;
exports.css = css;
exports.js = js;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.clean = cleaner;