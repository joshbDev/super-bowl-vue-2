import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import fs from 'fs';
import mkdirp from 'mkdirp';
import nodemon from 'gulp-nodemon';
import vueify from 'vueify';

gulp.task('serve', [], () => {
  mkdirp('bundle/');
  return browserify({debug: true})
    .transform(babelify)
    .transform(vueify)
    .require(['./src/index.js'], { entry: true })
    .bundle()
    .on('error', (err) => {console.log(err)})
    .pipe(fs.createWriteStream('bundle/my_bundle.js'))
  })

gulp.task('watch', ['serve', 'nodemon'], () => {
  gulp.watch('src/*', ['serve']);
});

function startNodemon(serverPath, isDebug) {
  let nodemonConfig = {

    // nodemon our expressjs server
    script: serverPath,

    // watch core server file(s) that require server restart on change
    watch: [
      'server/server.js',
      'server/app.js',
      'server/routes.js',
      'server/routes/*.js',
      'server/components/**/*.js'
    ]

  };

  nodemonConfig.nodeArgs = ['--harmony'];

  return nodemon(nodemonConfig);
}

gulp.task('nodemon', function() {
  process.env.NODE_ENV = 'development';
  startNodemon('./server/server.js', true);
});
