import home from './home.html'

const server = Bun.serve({
  // Add HTML imports to `static`
  static: {
    // Bundle & route home.html to "/home"
    '/': home,
  },

  // Enable development mode for:
  // - Detailed error messages
  // - Rebuild on request
  development: true,

  // Handle API requests
  async fetch(req) {
    console.log('on server')

    // Return 404 for unmatched routes
    return new Response('Not Found', { status: 404 })
  },
})

console.log(`Listening on ${server.url}`)
