import { afterAll, describe, expect, it } from 'bun:test'
import { plugin } from '../src/index'
import unoConfig from '../uno.config'

function findHtmlOutput(result: Awaited<ReturnType<typeof Bun.build>>, name: string) {
  const output = result.outputs.find(o => o.path.endsWith(`/${name}`))
  if (!output)
    throw new Error(`No output found for ${name}`)
  return output
}

describe('bun-plugin-unocss', () => {
  it('should inject generated CSS into HTML', async () => {
    const htmlPath = `${import.meta.dir}/test.html`
    await Bun.write(htmlPath, `
    <!DOCTYPE html>
    <html>
      <head><title>Test</title></head>
      <body>
        <div class="mt-24 text-red-500"></div>
      </body>
    </html>
  `)

    const result = await Bun.build({
      entrypoints: [htmlPath],
      outdir: `${import.meta.dir}/out`,
      plugins: [plugin(unoConfig)],
    })

    const output = await findHtmlOutput(result, 'test.html').text()
    expect(output).toInclude('.mt-24{margin-top:6rem')
    expect(output).toInclude('color:rgb(239 68 68')
  })

  it('should handle HTML without UnoCSS classes', async () => {
    const html = `<!DOCTYPE html><html><head></head><body></body></html>`
    const htmlPath = `${import.meta.dir}/test-empty.html`
    await Bun.write(htmlPath, html)

    const result = await Bun.build({
      entrypoints: [htmlPath],
      outdir: `${import.meta.dir}/out`,
      plugins: [plugin(unoConfig)],
    })

    const output = await findHtmlOutput(result, 'test-empty.html').text()
    expect(output).toInclude('<style>')
    expect(output).toInclude('</style>')
  })

  afterAll(async () => {
    const { unlinkSync, rmSync } = await import('node:fs')
    const { join } = await import('node:path')
    const dir = import.meta.dir

    rmSync(join(dir, 'out'), { recursive: true, force: true })

    const glob = new Bun.Glob('test.{html,jsx,tsx}')
    for (const file of glob.scanSync(dir)) {
      unlinkSync(join(dir, file))
    }
    const emptyGlob = new Bun.Glob('test-empty.html')
    for (const file of emptyGlob.scanSync(dir)) {
      unlinkSync(join(dir, file))
    }
  })
})
