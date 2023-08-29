//Make sure service workers are supported
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../PWA-OfflineSupport/sw_cached_site.js')
            .then(reg => console.log(`Service Worker: Registered: ${reg}`))
            .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}