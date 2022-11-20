

self.addEventListener("install", (event) => {
    console.log(event)
})

self.addEventListener("activate", (event) => {
    console.log(event)
})

self.addEventListener("message", (event) => console.log(event))

function isJs(request: Request) {
    return new RegExp('\.js$').test(request.url)
}

self.addEventListener("fetch", (event: FetchEvent) => {
    console.log('oooo API!')
    const cacheName = "v2"

    if (event.request.url == "/sw-cached" ||  event.request.url == "/sw-cached/") {
        event.respondWith(fetch(event.request))
        return
    }

    event.respondWith(
        (async () => {
            const cache = await caches.open(cacheName)
            const cachedResponse = await cache.match(event.request)

            console.log('cached response')
            console.dir(cachedResponse)

            if (cachedResponse && cachedResponse.ok) {
                event.waitUntil(cache.add(event.request))
                console.log('got from cached')
                return cachedResponse.clone()
            } else {
                const response = await fetch(event.request)
                console.log('got from server')

                if (!isJs(event.request))
                    cache.put(event.request, response.clone())

                return response.clone()
            }
        })()
    )

})