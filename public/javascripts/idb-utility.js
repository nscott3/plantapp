// Function to get the plant list from the IndexedDB
const getAllSyncItems = (IDB, db_name) => {
    return new Promise((resolve, reject) => {
        const transaction = IDB.transaction([db_name]);
        const itemStore = transaction.objectStore(db_name);
        const getAllRequest = itemStore.getAll();

        getAllRequest.addEventListener("success", () => {
            resolve(getAllRequest.result);
        });

        getAllRequest.addEventListener("error", (event) => {
            reject(event.target.error);
        });
    });
}

// Function to delete a syn
const deleteSyncItemFromIDB = (IDB, db_name, id) => {
    const transaction = IDB.transaction([db_name], "readwrite")
    const itemStore = transaction.objectStore(db_name)
    const deleteRequest = itemStore.delete(id)
    deleteRequest.addEventListener("success", () => {
        console.log("Deleted " + id)
    })
}

function openIDB(db_name) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(db_name, 1);

        request.onerror = function (event) {
            reject(new Error(`Database error: ${event.target}`));
        };

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore(db_name, {keyPath: 'id', autoIncrement: true});
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            resolve(db);
        };
    });
}


// Function to get all plants from IndexedDB
function getAllPlants() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}