const path = require('path')
const gulp = require('gulp')
const util = require('gulp-util')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackConfigDev = require('./config/webpack.config.dev')
const webpackConfigProd = require('./config/webpack.config.prod')

gulp.task('copy', () => {
  return gulp.src([
    `./index.html`,
    './manifest.json'
  ])
    .pipe(gulp.dest('./dist'))
})

gulp.task('assets', () => {
  return gulp.src(['./assets/**/*.png', './assets/**/*.ico',])
    .pipe(gulp.dest(`./dist/assets`))
})

gulp.task('sw', () => {
  return gulp.src('./src/sw.js')
    .pipe(gulp.dest(`./dist`))
})

gulp.task('webpack', cb => {
  webpack(webpackConfigProd, (err, stats) => {
    if (err) throw new util.PluginError('webpack', err)
    util.log('[webpack]', stats.toString())
    cb()
  })
})

gulp.task('serve', () => {
  const compiler = webpack(webpackConfigDev)

  const server = new WebpackDevServer(compiler, {
    contentBase: './dist',
    hot: true,
    stats: {
      colors: true
    }
  })

  server.listen(8080, 'localhost', err => {
    if (err) throw new util.PluginError('webpack-dev-server', err)
    util.log('[webpack-dev-server]', 'http://localhost:8080')
  })
})

gulp.task('default', ['assets', 'copy', 'assets', 'serve'])

gulp.task('bundle', ['assets', 'copy', 'assets', 'webpack'])