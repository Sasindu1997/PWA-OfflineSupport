const cacheName = 'v2'


//C all install event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed.');
})

// Call Activate Event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated.');

    // Remove unwanted caches
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName) {
                            console.log('Clearing old cache.')
                            return caches.delete(cache)
                        }
                    })
                )
            })
    )
})

// Call fetch event 
self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching.');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            //Make a clone of response
            const resClone = res.clone();

            //open cache
            caches
                .open(cacheName)
                .then(cache => {
                    //Add response to cache
                    cache.put(e.request, resClone)
                })
                return res
        })
        .catch(() => caches.match(e.request).then(res => res))
    )
})