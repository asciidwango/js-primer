"use strict";

const CACHE_NAME = "cache-v1";
const urlsToCache = [
    "./index.html",
    "./landing/img/cover.png",
    "./landing/img/cover.png",
    "./landing/img/js-primer.png",
    "./landing/img/repo-actions-watch.png",
    "./landing/css/style.css",
    "./landing/index.html",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache");
                // 指定されたリソースをキャッシュに追加する
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // ホワイトリストにないキャッシュ(古いキャッシュ)は削除する
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            // cacheあればcacheを参照, なければfetchしてcacheする
            if (response) return response;
            return fetch(event.request).then(response => {
                if (!response.ok) {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        })
    );
});
