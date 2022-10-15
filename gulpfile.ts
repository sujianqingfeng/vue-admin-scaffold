import { src, parallel, dest } from 'gulp'
import path from 'path'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import type { Plugin, OutputOptions, RollupBuild  } from 'rollup'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import glob from 'fast-glob'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'

const resolve = (...paths: string[]) => path.resolve(__dirname, ...paths)

const scssPath =  resolve('./src/style.scss')
const libFolder = resolve('dist')

function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

async function buildModules() {
  const input = await glob('**/*.{js,ts,vue}', {
    cwd: resolve('src'),
    absolute: true,
    onlyFiles: true
  })

  const bundle = await rollup({
    input,
    plugins: [
      vue({
        isProduction: false
      }) as Plugin,
      esbuild({
        loaders: {
          '.vue': 'ts'
        }
      }),
      commonjs()
    ],
    external: ['vue', '@sujian/utils', 'deepmerge']
  })

  await writeBundles(bundle, [
    {
      format: 'esm',
      dir: resolve(libFolder, 'es')
    },
    {
      format: 'commonjs',
      dir: resolve(libFolder, 'lib')
    }
  ])
}

function buildStyle() {
  const sass = gulpSass(dartSass)
  return src(scssPath)
    .pipe(sass.sync())
    .pipe(dest(libFolder))
}

function copyScss() {
  return src(scssPath).pipe(dest(libFolder))
}

const build = parallel(buildModules, buildStyle, copyScss)

export default build
