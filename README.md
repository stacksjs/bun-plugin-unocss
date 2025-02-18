![Social Card of Bun Plugin unocss](https://github.com/stacksjs/bun-plugin-unocss/blob/main/.github/art/cover.jpg)

[![npm version][npm-version-src]][npm-version-href]
[![GitHub Actions][github-actions-src]][github-actions-href]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm downloads][npm-downloads-src]][npm-downloads-href]
<!-- [![Codecov][codecov-src]][codecov-href] -->

# bun-plugin-unocss

> "Instant On-demand Atomic CSS Engine" - UnoCSS

## Features

- 💉 Automatic injection of generated CSS into HTML files
- 🪄 On-demand CSS generation using UnoCSS core
- 🚀 Seamless integration with Bun's build system
- 📦 Support for HTML file processing with UnoCSS rules
- 🎨 Highly configurable
- 🔄 Real-time CSS generation during development
- ⚡ Zero-config setup with automatic UnoCSS config detection

## Usage

```bash
bun install -d bun-plugin-unocss
```

### Bundler

You may now use the plugin now via `Bun.build`:

```ts
// build.ts
import type { UserConfig } from 'unocss'
import { plugin as unocss } from 'bun-plugin-unocss'
// import unocss from 'bun-plugin-unocss'

const config: UserConfig = {
  // Your UnoCSS config
}

Bun.build({
  entrypoints: ['./src/index.html'],
  outdir: './dist',
  plugins: [
    unocss, // by default, it will look for the Uno config file in the project root
  ],
})
```

### Server

Additionally, it can also be used in conjunction with HTML imports, via `Bun.serve()`:

```ts
// server.ts
import home from './home.html'

const server = Bun.serve({
  static: {
    // Bundle & route home.html to "/home"
    '/': home,
  },

  async fetch(req) {
    console.log('any other request', req.url)

    // Return 404 for unmatched routes
    return new Response('Not Found', { status: 404 })
  },
})

console.log(`Listening on ${server.url}`)
```

```html
<!-- home.html -->
<!DOCTYPE html>
<html>

<head>
  <title>Home</title>
</head>

<body>
  <div id="root">Root Element</div>
  <div class="mt-24 text-red-500">Test</div>
</body>

</html>
```

#### Configuration

For this to work, though, you have to ensure that the plugin is defined in your `bunfig.toml`:

```toml
[serve.static]
plugins = [ "bun-plugin-unocss" ]
```

## Testing

```bash
bun test
```

## Changelog

Please see our [releases](https://github.com/stacksjs/bun-plugin-unocss/releases) page for more information on what has changed recently.

## Contributing

Please review the [Contributing Guide](https://github.com/stacksjs/contributing) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/stacks/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

“Software that is free, but hopes for a postcard.” We love receiving postcards from around the world showing where `bun-plugin-unocss` is being used! We showcase them on our website too.

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094, United States 🌎

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## Credits

Many thanks to the following core technologies & people who have contributed to this package:

- [UnoCSS](https://unocss.dev)
- [Anthony Fu](https://github.com/antfu)
- [Chris Breuer](https://github.com/chrisbbreuer)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [LICENSE](https://github.com/stacksjs/bun-plugin-unocss/tree/main/LICENSE.md) for more information.

Made with 💙

<!-- Badges -->
[npm-version-src]: <https://img.shields.io/npm/v/bun-plugin-unocss?style=flat-square>
[npm-version-href]: <https://npmjs.com/package/bun-plugin-unocss>
[npm-downloads-src]: <https://img.shields.io/npm/dm/bun-plugin-unocss?style=flat-square>
[npm-downloads-href]: <https://npmjs.com/package/bun-plugin-unocss>
[github-actions-src]: <https://img.shields.io/github/actions/workflow/status/stacksjs/bun-plugin-unocss/ci.yml?style=flat-square&branch=main>
[github-actions-href]: <https://github.com/stacksjs/bun-plugin-unocss/actions?query=workflow%3Aci>

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/stacksjs/bun-plugin-unocss/main?style=flat-square
[codecov-href]: https://codecov.io/gh/stacksjs/bun-plugin-unocss -->
