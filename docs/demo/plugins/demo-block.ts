import { dirname, resolve } from 'path'
import { MarkdownRenderer } from 'vitepress'
import { parseProps } from './utils'

function pluginDemoBlock(md: MarkdownRenderer) {

  const addRenderRule = (type: string) => {
    const defaultRender = md.renderer.rules[type]
    
    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      console.log('token ', tokens)
      const token = tokens[idx]
      const content = token.content.trim()

      if (!/^<demo/.test(content)) {
        return defaultRender!(tokens, idx, options, env, self)
      }

      const { path } = env
      const props = parseProps(content)

      if (!props.src) {
        console.error(`miss src props in ${path}`)
        return defaultRender!(tokens, idx, options, env, self)
      }

      const frontmatter = env.frontmatter

      const mdDir = dirname(frontmatter.realPath ?? path)
      const srcPath = resolve(mdDir, props.src)

      console.log('----src path', srcPath)
      console.log('----', env)

      return ''
    }

  }

  addRenderRule('html_inline')
}

export default pluginDemoBlock