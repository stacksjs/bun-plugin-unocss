import type { BunPlugin } from 'bun'
import { loadConfig } from '@unocss/config'
import { createGenerator } from '@unocss/core'

export const plugin: BunPlugin = {
  name: 'bun-plugin-unocss',
  async setup(build) {
    const { config } = await loadConfig()
    const generator = await createGenerator(config)

    build.onLoad({ filter: /\.html$/ }, async ({ path }) => {
      const html = await Bun.file(path).text()
      const { css } = await generator.generate(html)
      const contents = html.replace('</head>', `<style>${css}</style>\n</head>`)

      return {
        contents,
        loader: 'html',
      }
    })
  },
}

export default plugin
