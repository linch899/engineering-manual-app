const CACHE_NAME = 'app-v1';

self.addEventListener('install', function(event) {
  // 強制跳過等待，立即激活
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // 立即接管所有頁面，確保 scope 生效
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  // 直接放行，不攔截
});
