// 強制立即接管控制權
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// 必須要有 fetch 事件監聽，這是 Chrome 允許「安裝」的硬性規定
self.addEventListener('fetch', event => {
  // 不做任何快取邏輯，直接放行網路請求
});
