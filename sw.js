// =====================================================
// Service Worker — 工程參考手冊 App
// 版本號：每次更新 data/manual.json 或其他檔案後，
//         請將下方 v1 改為 v2、v3… 以強制使用者重新快取
// =====================================================
const CACHE_NAME = 'engineering-manual-v2';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './data/manual.json'
];

// ── 安裝：預先快取所有必要檔案 ──
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// ── 啟動：清除舊版快取，接管所有分頁 ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── 攔截請求：優先從快取回應，快取沒有再走網路 ──
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
