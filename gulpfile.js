var gulp = require('gulp');
var babel = require('gulp-babel')
var sass = require('gulp-sass')(require('sass'));
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var purgecss = require('gulp-purgecss')	

// =========================================================  //
//Next two Gulp Tasks have to do with converting Sass to CSS
gulp.task('buildStyles', function() {
//root scss file (import all your partials into here)
return gulp.src('./src/sass/theme.scss')
    .pipe(sass().on('error', sass.logError))
    // save the file to the theme assets directory
    // .pipe(purgecss({content: ["*.html"]}))
    .pipe(gulp.dest('./src/assets/'));
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


//run all tasks as soon as gulp is used in terminal

gulp.task('default', function() {
    // this assumes your sass is in a directory named sass
    gulp.watch(['./src/sass/**/*.scss', './src/javascript/**/*.js', './src/**/*.liquid'], gulp.series(['buildStyles', 'babelConvert', 'theme-dist']));
});

