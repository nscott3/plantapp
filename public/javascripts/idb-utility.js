// Function to get the todo list from the IndexedDB
const getAllSyncTodos = (syncTodoIDB) => {
    return new Promise((resolve, reject) => {
        const transaction = syncTodoIDB.transaction(["sync-todos"]);
        const todoStore = transaction.objectStore("sync-todos");
        const getAllRequest = todoStore.getAll();

        getAllRequest.addEventListener("success", () => {
            resolve(getAllRequest.result);
        });

        getAllRequest.addEventListener("error", (event) => {
            reject(event.target.error);
        });
    });
}

// Function to delete a syn
const deleteSyncTodoFromIDB = (syncTodoIDB, id) => {
    const transaction = syncTodoIDB.transaction(["sync-todos"], "readwrite")
    const todoStore = transaction.objectStore("sync-todos")
    const deleteRequest = todoStore.delete(id)
    deleteRequest.addEventListener("success", () => {
        console.log("Deleted " + id)
    })
}

function openSyncTodosIDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("sync-todos", 1);

        request.onerror = function (event) {
            reject(new Error(`Database error: ${event.target}`));
        };

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore('sync-todos', {keyPath: 'id', autoIncrement: true});
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            resolve(db);
        };
    });
}


// Function to get all todos from IndexedDB
function getAllTodos() {
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