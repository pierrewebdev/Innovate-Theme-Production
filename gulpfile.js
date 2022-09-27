//run gulp

var gulp = require('gulp');
var babel = require('gulp-babel')
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');	

// =========================================================  //
//Next two Gulp Tasks have to do with converting Sass to CSS
gulp.task('sass', function() {
//root scss file (import all your partials into here)
return gulp.src('./sass/styles.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    // add vendor prefixes
    .pipe(autoprefixer())
    // change the file name to be styles.scss.liquid file
    .pipe(rename('styles.scss.liquid'))
    // remove the extra set of quotations used for escaping the liquid string (we'll explain this in a sec)
    .pipe(replace('"{{', '{{'))
    .pipe(replace('}}"', '}}'))
    // save the file to the theme assets directory
    .pipe(gulp.dest('./assets/'));
});


gulp.task('default', function() {
    // this assumes your sass is in a directory named sass
    gulp.watch(['./sass/**/*.scss'], gulp.series('sass'));
});

// =========================================================  //

//Next 2 tasks have to do with compiling javascript from ES6 to ES5 with babel
var requiredFiles = ['javascript/**/*.js',]

gulp.task('babelTest', async function () {
    return gulp.src(requiredFiles)
        .pipe(babel({presets: ['@babel/preset-env'] })) 
        .pipe(gulp.dest('./assets'));
});

gulp.task('build', gulp.series('babelTest'));


//Need to set up Gulp watch to update itself whenever any changes are made to the javascript or sass folder in my project