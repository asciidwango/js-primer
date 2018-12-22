// workbox init setting
importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js"
);
importScripts(
    "https://unpkg.com/service-worker-updatefound-refresh-dialog/dist/service-worker-updatefound-refresh-dialog.umd.js"
);

workbox.core.setCacheNameDetails({ prefix: "js-primer-v1" });
workbox.googleAnalytics.initialize();

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(/\.+/, workbox.strategies.networkFirst());
