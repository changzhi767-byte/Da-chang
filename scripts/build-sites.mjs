import { mkdir, rename, writeFile } from "node:fs/promises"

const worker = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)

    if (
      response.status === 404 &&
      request.method === "GET" &&
      request.headers.get("accept")?.includes("text/html")
    ) {
      const fallbackUrl = new URL("/index.html", request.url)
      return env.ASSETS.fetch(new Request(fallbackUrl, request))
    }

    return response
  },
}
`

const distUrl = new URL("../dist/", import.meta.url)
const clientUrl = new URL("./client/", distUrl)

await mkdir(clientUrl, { recursive: true })

for (const entry of ["index.html", "shadcn.html", "assets"]) {
  await rename(new URL(entry, distUrl), new URL(entry, clientUrl))
}

await mkdir(new URL("./server/", distUrl), { recursive: true })
await writeFile(new URL("../dist/server/index.js", import.meta.url), worker)
