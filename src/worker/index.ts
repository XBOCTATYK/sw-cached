

self.addEventListener("install", (event) => {
    console.log(event)
})

self.addEventListener("activate", (event) => {
    console.log(event)
})

self.addEventListener("message", (event) => console.log(event))

self.addEventListener("fetch", (event: FetchEvent) => {
    console.log('oooo API!')
    const cacheName = "v1"

    if (event.request.url == "/sw-cached" ||  event.request.url == "/sw-cached/") {
        event.respondWith(fetch(event.request))
    }

    event.respondWith(
        (async () => {
            const cache = await caches.open(cacheName)
            const cachedResponse = await cache.match(event.request)

            if (cachedResponse) {
                event.waitUntil(cache.add(event.request))
                return cachedResponse
            } else {
                const response = await fetch(event.request)
                await cache.put(event.request, response)

                return response
            }
        })()
    )

})