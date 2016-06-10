var source = require('vinyl-source-stream');
var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');
var es2015Preset = require('babel-preset-es2015');
var reactPreset = require('babel-preset-react');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var gutil = require('gulp-util');
var notify = require('gulp-notify');

gulp.task('server', function(){
  browserSync({
    server : {
      baseDir: './dist',
      middleware: [historyApiFallback()]
    },
    ghostMode: false
  });
});

gulp.task('scripts', function(){
  browserify({
		entries: ['./js/main.js'],
		debug: true,
		transform: [babelify.configure({
			'presets': [es2015Preset, reactPreset]
		})]
	})
  .bundle()
  .on('error', function(){
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Stop gulp from hanging on this task
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./dist/js'))
  .pipe(reload({stream:true}));
});


gulp.task('style', function(){
  gulp.src('sass/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 2 versions']}))
  .pipe(gulp.dest('./dist/css'))
  .pipe(reload({stream:true}));
});

gulp.task('default', ['scripts', 'style', 'server'], function(){
  gulp.watch(['./js/*', './js/**/*'], ['scripts']);
  gulp.watch('sass/**/*.scss',['style']);
});
