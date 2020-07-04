const cacheName = 'dz-timer-v1'
const appShellFiles = [
  './',
  'favicon.ico',
  'icons/icon-512.png',
  'res/logo/blacksite.png',
  'res/logo/jungle.png',
  'res/logo/sirocco.png',
  'res/preview/blacksite.blur.webm',
  'res/preview/jungle.blur.webm',
  'res/preview/sirocco.blur.webm',
]

self.addEventListener('install', e => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName)
      await cache.addAll(appShellFiles)
    })())
})

self.addEventListener('fetch', e => {
  e.respondWith(
    (async () => {
      let r = await caches.match(e.request)

      if (!r) {
        r = await fetch(e.request)
      }

      return r
    })())
})

self.addEventListener('activate', e => {
  e.waitUntil(
    (async () => {
      const keyList = await caches.keys()

      for (const key of keyList) {
        if (key !== cacheName) {
          await caches.delete(key)
        }
      }
    })())
})