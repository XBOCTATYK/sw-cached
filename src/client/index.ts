import '../css/styles.css'

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("cache-worker.js");
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

registerServiceWorker().then(() => {
    document.querySelector('html').addEventListener('click', () => {
        navigator.serviceWorker.getRegistrations().then(workers => {
            workers.forEach(worker => worker.active.postMessage('uuuuu!'))
        })

        fetch('/sw-cached/public/api/stock.json').then(res => res.json()).then(console.log)
    })
})


