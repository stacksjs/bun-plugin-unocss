import { afterAll, describe, expect, it } from 'bun:test'
import { plugin as unocss } from '../src/index'

describe('bun-plugin-unocss', () => {
  it('should inject generated CSS into HTML', async () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body>
          <div class="mt-24 text-red-500"></div>
        </body>
      </html>
    `

    await Bun.write('test.html', html)

    // Process with Bun plugin
    const result = await Bun.build({
      entrypoints: ['test.html'],
      outdir: 'out',
      plugins: [unocss],
      root: import.meta.dir, // Add root directory specification
    })

    // Get the output contents directly from build results
    const output = await result.outputs[0].text()

    // Verify CSS properties without spaces (UnoCSS minifies by default)
    expect(output).toInclude('margin-top:6rem') // mt-24
    expect(output).toInclude('color:rgb(239 68 68') // text-red-500
  })

  it('should handle HTML without UnoCSS classes', async () => {
    const html = `<!DOCTYPE html><html><head></head><body></body></html>`
    await Bun.write('test-empty.html', html)

    const result = await Bun.build({
      entrypoints: ['test-empty.html'],
      outdir: 'out',
      plugins: [unocss],
      root: import.meta.dir,
    })

    const output = await result.outputs[0].text()
    // Check for presence of style tag with default layers
    expect(output).toInclude('<style></style>')
    expect(output).toInclude('/* layer: preflights */')
    expect(output).not.toInclude('margin-top:6rem')
  })

  afterAll(async () => {
    await Bun.$`rm -rf out test.html test-empty.html`.quiet()
  })
})
