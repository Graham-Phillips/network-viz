var gulp = require('gulp');
var print = require('gulp-print');
var webpack = require('webpack-stream');

gulp.task('wp', function() {
    return gulp.src(['babel-polyfill','src/SpiderClient.js'])
    .pipe(webpack( {
      output: {
          filename: 'bundle.js'
      },
      module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
       }
    } ))
    .pipe(gulp.dest('../server/pub/js'));
});

gulp.task('libs', function(){
    return gulp.src([
        'node_modules/systemjs/dist/system.js'])
        .pipe(print())
        .pipe(gulp.dest('../server/pub/libs'));
});

gulp.task('build', ['wp', 'libs'], function(){
    return gulp.src(['src/**/*.html', 'src/**/*.css'])
            .pipe(print())
            .pipe(gulp.dest('../server/pub'));
});

gulp.task('default', ['build']);
