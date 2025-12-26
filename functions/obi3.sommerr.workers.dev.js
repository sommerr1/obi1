export async function onRequest(context) {
  const url = new URL(context.request.url)
  const ext = url.pathname.split('.').pop()

  const mime = {
    js: "application/javascript",
    mjs: "application/javascript",
    css: "text/css",
    html: "text/html",
    json: "application/json",
    wasm: "application/wasm",
    svg: "image/svg+xml",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    ico: "image/x-icon"
  }[ext]

  const response = await context.next()

  if (mime) {
    return new Response(response.body, {
      headers: {
        ...Object.fromEntries(response.headers),
        "Content-Type": mime
      }
    })
  }

  return response
}
