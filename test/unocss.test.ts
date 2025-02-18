import { afterAll, describe, expect, it } from 'bun:test'
import { plugin } from '../src/index'
import unoConfig from '../uno.config'

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

    const output = await result.outputs[0].text()
    expect(output).toInclude('.mt-24{margin-top:6rem}')
    expect(output).toInclude('.text-red-500{color:rgb(239 68 68)}')
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

    const output = await result.outputs[0].text()
    expect(output).toInclude('<style>')
    expect(output).toInclude('</style>')
  })

  afterAll(async () => {
    await Bun.$`rm -rf ${import.meta.dir}/out ${import.meta.dir}/test.* ${import.meta.dir}/*.jsx ${import.meta.dir}/*.tsx`.quiet()
  })
})
