// 最簡 Service Worker，僅為滿足 PWA 安裝觸發條件
self.addEventListener('fetch', function(event) {
  // 不做任何攔截，直接放行網路請求
});