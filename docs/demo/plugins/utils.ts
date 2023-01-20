import { baseParse } from '@vue/compiler-core'
import type { ElementNode, AttributeNode } from '@vue/compiler-core'
import { MarkdownRenderer } from 'vitepress'
import { sep } from 'path'

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
}
export function getDemoComponent(md: MarkdownRenderer, { path }: DemoInfo) {
  const componentName = `Demo${index++}`  
  path = normalizePath(path)

}

function normalizePath(path: string) {
  return path.split(sep).join('/')
}
