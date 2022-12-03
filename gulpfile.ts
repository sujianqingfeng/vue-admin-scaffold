import { src, parallel, dest } from 'gulp'
import path from 'path'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import glob from 'fast-glob'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import { Project } from 'ts-morph'
import { mkdir, writeFile } from 'fs/promises'

import type { Plugin, OutputOptions, RollupBuild  } from 'rollup'
import type { CompilerOptions, SourceFile } from 'ts-morph'

const resolve = (...paths: string[]) => path.resolve(__dirname, ...paths)

const scssPath =  resolve('./src/style.scss')
const distFolder = resolve('dist')

function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

const excludeFiles = (files: string[]) => {
  const excludes = ['gulpfile']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}

const pathRewriter = (p: string, dest: string) => {
  return p.replace('types/src/', `${dest}/`)
}

async function buildTsDefinitions() {
  const compilerOptions: CompilerOptions = {
    baseUrl: resolve('.'),
    outDir: resolve(distFolder, 'types'),
    emitDeclarationOnly: true,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false
  }
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: resolve('tsconfig.json'),
    skipAddingFilesFromTsConfig: true
  })

  // add source file

  project.addSourceFileAtPath(resolve('./shims.d.ts'))

  const filePaths = excludeFiles(await glob('**/*.{js,ts,vue}', {
    cwd: resolve('src'),
    absolute: true,
    onlyFiles: true
  }))

  const sourceFiles: SourceFile[] = []

  await Promise.all(filePaths.map(async (file) => {
    // console.log('file', file)
    if (file.endsWith('.vue')) {
      console.log('---')

    } else {
      const sourceFile = project.addSourceFileAtPath(file)
      sourceFiles.push(sourceFile)
    }
  }))

  // type check
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length) {
    const diagnosticsStr = project.formatDiagnosticsWithColorAndContext(diagnostics)
    console.error(diagnosticsStr)
    const error = new Error('Failed to generate dts.')
    console.error(error)
    throw error
  }

  await project.emit({
    emitOnlyDtsFiles: true
  })

  const tasks = sourceFiles.map(async (sourceFile) => {
    // const filePath = sourceFile.getFilePath()
    // console.log('sourcefile path', filePath)

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    // console.log('emitFiles', emitFiles )

    const subTasks = emitFiles.map(async (outputFile) => {
      const filePath = outputFile.getFilePath()
      // console.log('emit file path', filePath )
      
      const text = outputFile.getText()

      const writeDts = async (dest: string) => {
        const rewriterPath = pathRewriter(filePath, dest)
        await mkdir(path.dirname(rewriterPath), {
          recursive: true
        })
        await writeFile(rewriterPath, text, 'utf8')
      }

      await writeDts('es')
      await writeDts('lib')
    })

    await Promise.all(subTasks)
  })

  await Promise.all(tasks)
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
    external: ['vue', '@sujian/utils']
  })

  await writeBundles(bundle, [
    {
      format: 'esm',
      dir: resolve(distFolder, 'es'),
      preserveModules: true,
      entryFileNames: '[name].mjs'
    },
    {
      format: 'commonjs',
      dir: resolve(distFolder, 'lib'),
      preserveModules: true,
      entryFileNames: '[name].js'
    }
  ])
}

function buildStyle() {
  const sass = gulpSass(dartSass)
  return src(scssPath)
    .pipe(sass.sync())
    .pipe(dest(distFolder))
}

function copyScss() {
  return src(scssPath).pipe(dest(distFolder))
}

const build = parallel(buildModules, buildTsDefinitions, buildStyle, copyScss)

export default build
