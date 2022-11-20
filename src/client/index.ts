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

const serviceWorkerChannel = new MessageChannel()

registerServiceWorker().then(() => {
    navigator.serviceWorker.getRegistrations().then(workers => {
        console.log('Sending message with port')
        workers.forEach(worker => worker.active.postMessage('uuuuu!', [serviceWorkerChannel.port2]))
    })

    document.querySelector('html').addEventListener('click', () => {
        serviceWorkerChannel.port1.postMessage('hello!')

        fetch('/static/api/stock.json').then(res => res.json()).then(console.log)
    })

    document.body.innerHTML = '<button id="workerReload">Reload worker</button>'

    document.getElementById('workerReload').addEventListener('click', () => {
        navigator.serviceWorker.getRegistrations().then(workers => {
            workers.forEach(worker => worker.update())
        })
    })

    serviceWorkerChannel.port1.onmessage = e => {
        console.log(e.data)
    }
})


