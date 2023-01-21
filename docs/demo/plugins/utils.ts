import { baseParse } from '@vue/compiler-core'
import type { ElementNode, AttributeNode } from '@vue/compiler-core'
import { MarkdownRenderer } from 'vitepress'
import { sep } from 'path'

const scriptRE = /<\/script>/
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/

export function parseProps(content: string) {
  const ast = baseParse(content)

  const firstChild = ast.children[0] as ElementNode
  const props = firstChild.props as AttributeNode[]

  const result: Record<string, string | undefined> = {}
  for (const { name, value } of props) {
    result[name] = value?.content
  }
  return result
}

let index = 1
type DemoInfo = {
  path: string
  title?: string
  desc?: string
  code: string
}
export function getDemoComponent(
  md: MarkdownRenderer,
  env: any,
  { path, title, desc, code }: DemoInfo,
) {
  const componentName = `Demo${index++}`  
  path = normalizePath(path)
  injectImportStatement(env, componentName, path)

  const highlightedCode = md.options.highlight!(code, 'vue', '')
  return `
    <demo
      code="${encodeURIComponent(code)}"
      highlightedCode="${encodeURIComponent(highlightedCode)}"
      title="${title}"
      desc="${desc}"
    >
      <${componentName}></${componentName}>
    </demo>
  `.trim()
}

function injectImportStatement(env: any, componentName: string, path: string) {
  const importComponentStatement = `import ${componentName} from '${path}';`.trim()

  if (!env.sfcBlocks.scripts) {
    env.sfcBlocks.scripts = []
  }

  const tags = env.sfcBlocks.scripts as {content: string}[]

  const isUsingTS =
    tags.findIndex((tag) => scriptLangTsRE.test(tag.content)) > -1
  // 判断位置
  const existingSetupScriptIndex = tags?.findIndex((tag) => {
    return (
      scriptRE.test(tag.content) &&
      scriptSetupRE.test(tag.content) &&
      !scriptClientRE.test(tag.content)
    )
  })

  // 存在
  if (existingSetupScriptIndex > -1) {
    const tagSrc = tags[existingSetupScriptIndex]
    tags[existingSetupScriptIndex].content  = tagSrc.content.replace(scriptRE, `${importComponentStatement} 
    </script>`)
  } else {
    // 没有找到 直接插入一个
    tags.unshift({
      content: `
        <script ${isUsingTS ? 'lang="ts"' : ''} setup >
          ${importComponentStatement}
        </script>
      `.trim(),
    })

  }

}

function normalizePath(path: string) {
  return path.split(sep).join('/')
}
