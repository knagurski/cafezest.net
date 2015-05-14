var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')();

var imageSrc = [
  '_src/images/**/*.jpg',
  '_src/images/**/*.gif',
  '_src/images/**/*.png',
  '_src/images/**/*.svg'
];

gulp.task('images', function () {
  return gulp.src(imageSrc)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest('assets/images'));
});

gulp.task('sass', function(){
  var src = [
    'assets/vendor/normalize.css/normalize.css',
    '_src/styles/style.scss'
  ];

  return gulp.src(src)
    .pipe(plugins.sass())
    .pipe(plugins.concat('style.css'))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
      cascade: false
    }))
    .pipe(gulp.dest('assets/styles'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglifycss())
    .pipe(gulp.dest('assets/styles'));
});

gulp.task('js', function(){
  return gulp.src('assets/vendor/modernizr/modernizr.js')
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix:'.min'}))
    .pipe(gulp.dest('assets/scripts'));
});

gulp.task('default', ['images', 'sass', 'js']);

gulp.task('watch', ['default'], function(){
  // watch for image changes
  gulp.watch(imageSrc, ['images']);

  // watch for SASS changes
  gulp.watch('_src/styles/**/*.scss', ['sass']);
});