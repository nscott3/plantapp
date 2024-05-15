// const addNewTodoButtonEventListener = () => {
//     const txt_val = document.getElementById("txt_in").value
//
//     openSyncTodosIDB().then((db) => {
//         const transaction = db.transaction(['sync-todos'], 'readwrite');
//         const objectStore = transaction.objectStore('sync-todos');
//         const request = objectStore.add({text: txt_val});
//
//         request.onsuccess = function (event) {
//             console.log("Todo added successfully!");
//         };
//
//         request.onerror = function (event) {
//             console.error("Error adding todo: ", event.target.error);
//         };
//     });
//
//
//     navigator.serviceWorker.ready
//         .then(function (serviceWorkerRegistration) {
//             serviceWorkerRegistration.showNotification("Todo App",
//                 {body: "Todo added! - " + txt_val})
//                 .then(r =>
//                     console.log(r)
//                 );
//         });
// }

window.onload = function () {
    // Add event listeners to buttons
    const add_form = document.getElementById("add_form")
    const url = 'http://localhost:3000/add-todo';

    add_form.addEventListener("submit", function(event) {
        event.preventDefault();
        let txt_val = document.getElementById("txt_in").value;

        postData(url, {text: txt_val}).then(data => {
            console.log(data);
            alert("Todo added successfully!");
        }).catch(error => {
            console.error('Error:', error);
            alert("Error adding todo! Must be offline!");

            openSyncTodosIDB().then((db) => {
                const transaction = db.transaction(['sync-todos'], 'readwrite');
                const objectStore = transaction.objectStore('sync-todos');
                const request = objectStore.add({text: txt_val});

                request.onsuccess = function (event) {
                    console.log("Todo added successfully!");
                };

                request.onerror = function (event) {
                    console.error("Error adding todo: ", event.target.error);
                };
            });
        });
    });
}