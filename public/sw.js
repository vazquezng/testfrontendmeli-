function getChromeVersion() {
  const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
  return raw ? parseInt(raw[2], 10) : false;
}
if (self.location.hostname !== "localhost") {
  if (getChromeVersion() === false || getChromeVersion() > 59) {
    importScripts("swWorkbox.js");
  }
}

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const validCacheSet = new Set(Object.values(currentCacheNames));
      return Promise.all(
        cacheNames
          .filter(cacheName => !validCacheSet.has(cacheName))
          .map(cacheName => {
            console.log("deleting cache", cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("message", event => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
//
// const currentCacheNames = Object.assign(
//   { precacheTemp: `${workbox.core.cacheNames.precache}-temp` },
//   workbox.core.cacheNames
// );

// clean up old SW caches
