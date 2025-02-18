import type { UserConfig } from '@unocss/core'
import type { BunPlugin } from 'bun'
import { loadConfig } from '@unocss/config'
import { createGenerator } from '@unocss/core'

export function plugin(userConfig?: UserConfig): BunPlugin {
  return {
    name: 'bun-plugin-unocss',
    async setup(build) {
      // Load configuration
      const config = userConfig || (await loadConfig()).config
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
}

export default plugin
