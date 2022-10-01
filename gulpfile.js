//run gulp

var gulp = require('gulp');
var babel = require('gulp-babel')
var sass = require('gulp-sass')(require('sass'));
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');	

// =========================================================  //
//Next two Gulp Tasks have to do with converting Sass to CSS
gulp.task('sass', function() {
//root scss file (import all your partials into here)
return gulp.src('./src/sass/styles.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    // add vendor prefixes
    .pipe(autoprefixer())
    // change the file name to be styles.scss.liquid file
    .pipe(rename('styles.css'))
    // remove the extra set of quotations used for escaping the liquid string (we'll explain this in a sec)
    // .pipe(replace('"{{', '{{'))
    // .pipe(replace('}}"', '}}'))
    // save the file to the theme assets directory
    .pipe(gulp.dest('./src/assets/'));
});


gulp.task('default', function() {
    // this assumes your sass is in a directory named sass
    gulp.watch(['./src/sass/**/*.scss', './src/javascript/**/*.js'], gulp.series(['sass', 'babelConvert']));
});

// =========================================================  //

//Next 2 tasks have to do with compiling javascript from ES6 to ES5 with babel
var requiredFiles = ['./src/javascript/**/*.js',]

gulp.task('babelConvert', async function (){
    return gulp.src(requiredFiles)
        .pipe(babel({presets: ['@babel/preset-env'] })) 
        .pipe(gulp.dest('./src/assets'));
});

//gulp task to send shopify theme into dist folder
gulp.task("theme-dist", async function(){
    gulp.src(["./src/**/*", "!./src/sass*/**/*", "!./src/javascript*/**/*"], {nodir: true})
    //send to dist folder
        .pipe(gulp.dest("./dist"))
})


gulp.task('build', gulp.series('theme-dist'));


//Need to set up Gulp watch to update itself whenever any changes are made to the javascript or sass folder in my project