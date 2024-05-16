importScripts('/javascripts/idb-utility.js');


// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
    console.log('Service Worker: Installing....');
    event.waitUntil((async () => {

        console.log('Service Worker: Caching App Shell at the moment......');
        try {
            const cache = await caches.open("static");
            cache.addAll([
                '/',
                '/add-plant',
                '/insert',
                '/manifest.json',
                '/javascripts/insert.js',
                '/javascripts/index.js',
                '/javascripts/idb-utility.js',
                '/javascripts/db.js',
                '/javascripts/search.js',
                '/stylesheets/style.css',
                '/images/image_icon.png',
            ]);
            console.log('Service Worker: App Shell Cached');
        }
        catch{
            console.log("error occurred while caching...")
        }

    })());
});

//clear cache on reload
self.addEventListener('activate', event => {
// Remove old caches
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            return keys.map(async (cache) => {
                if(cache !== "static") {
                    console.log('Service Worker: Removing old cache: '+cache);
                    return await caches.delete(cache);
                }
            })
        })()
    )
})

// Fetch event to fetch from network first, then cache
self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open('dynamic');
        try {
            // Try fetching from the network
            const networkResponse = await fetch(event.request);
            if ((event.request.method === 'GET') && (event.request.url.startsWith('http') || event.request.url.startsWith('https'))) {
                // We clone the response here because the response is a stream
                // and can only be consumed once. Since we're consuming it twice
                // (once for cache, once for return), we clone it.
                cache.put(event.request, networkResponse.clone());
            }
            console.log('Calling network: ' + event.request.url);
            return networkResponse;
        } catch (error) {
            // If network fetch fails, fetch from the cache
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) {
                console.log('Service Worker: Fetching from Cache: ', event.request.url);
                return cachedResponse;
            }
            throw error; // If neither network nor cache fetch succeeds, throw an error
        }
    })());
});

//Sync event to sync the plants
self.addEventListener('sync', event => {
    if (event.tag === 'sync-plant') {
        console.log('Service Worker: Syncing new Todos');
    }
});
