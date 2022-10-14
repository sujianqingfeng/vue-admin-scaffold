import { src, parallel, dest } from 'gulp'
import path from 'path'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'

const scssPath =  path.resolve(__dirname, './src/style.scss')
const libFolder = path.resolve(__dirname, 'lib')

function buildStyle() {
  const sass = gulpSass(dartSass)
  return src(scssPath)
    .pipe(sass.sync())
    .pipe(dest(libFolder))
}

function copyScss() {
  return src(scssPath).pipe(dest(libFolder))
}

const build = parallel(buildStyle, copyScss)

export default build
