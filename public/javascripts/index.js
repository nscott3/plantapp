// Register service worker to control making site work offline
window.onload = function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then(function (reg) {
                console.log('Service Worker Registered!', reg);
            })
            .catch(function (err) {
                console.log('Service Worker registration failed: ', err);
            });
    }

    // Check if the browser supports the Notification API
    if ("Notification" in window) {
        // Check if the user has granted permission to receive notifications
        if (Notification.permission === "granted") {
            // Notifications are allowed, you can proceed to create notifications
            // Or do whatever you need to do with notifications
        } else if (Notification.permission !== "denied") {
            // If the user hasn't been asked yet or has previously denied permission,
            // you can request permission from the user
            Notification.requestPermission().then(function (permission) {
                // If the user grants permission, you can proceed to create notifications
                if (permission === "granted") {
                    navigator.serviceWorker.ready
                        .then(function (serviceWorkerRegistration) {
                            serviceWorkerRegistration.showNotification("Plant App",
                                {body: "Notifications are enabled!"})
                                .then(r =>
                                    console.log(r)
                                );
                        });
                }
            });
        }
    }
    if (navigator.onLine) {
        fetchAndUpdatePlants();
    } else {
        console.log("Offline mode");
    }
}

async function fetchAndUpdatePlants() {
    const db = await openSyncPlantsIDB();
    const plants = await getAllSyncPlants(db);
    let refresh = false;

    if (plants.length > 0) {
        await syncPlants(db, plants);
        console.log("Synced plants");
        refresh = true;
    }

    fetch('http://localhost:3000/plants')
        .then(function (res) {
            console.log("Fetched plants");
            return res.json();
        });

    if (refresh) {
        location.reload();
    }
}

async function syncPlants(db, plants) {
    for (const plant of plants) {
        plant.photo = base64ToFile(plant.photo);
        const formData = jsonToFormData(plant);

        try {
            const data = await postData('http://localhost:3000/add-plant', formData);
            console.log(data);
            await deleteSyncPlantFromIDB(db, plant.id);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

