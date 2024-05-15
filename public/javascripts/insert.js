// const addNewPlantButtonEventListener = () => {
//     const txt_val = document.getElementById("txt_in").value
//
//     openSyncPlantsIDB().then((db) => {
//         const transaction = db.transaction(['sync-plants'], 'readwrite');
//         const objectStore = transaction.objectStore('sync-plants');
//         const request = objectStore.add({text: txt_val});
//
//         request.onsuccess = function (event) {
//             console.log("Plant added successfully!");
//         };
//
//         request.onerror = function (event) {
//             console.error("Error adding plant: ", event.target.error);
//         };
//     });
//
//
//     navigator.serviceWorker.ready
//         .then(function (serviceWorkerRegistration) {
//             serviceWorkerRegistration.showNotification("Plant App",
//                 {body: "Plant added! - " + txt_val})
//                 .then(r =>
//                     console.log(r)
//                 );
//         });
// }

window.onload = function () {
    // Add event listeners to buttons
    const add_form = document.getElementById("add_form")
    const url = 'http://localhost:3000/add-plant';

    add_form.addEventListener("submit", function(event) {
        event.preventDefault();
        let desc_val = document.getElementById("description").value;

        postData(url, {description: desc_val}).then(data => {
            console.log(data);
            alert("Plant added successfully!");
        }).catch(error => {
            console.error('Error:', error);
            alert("Error adding plant! Must be offline!", error);

            openSyncPlantsIDB().then((db) => {
                const transaction = db.transaction(['sync-plants'], 'readwrite');
                const objectStore = transaction.objectStore('sync-plants');
                const request = objectStore.add({description: desc_val});

                request.onsuccess = function (event) {
                    console.log("Plant added successfully!");
                };

                request.onerror = function (event) {
                    console.error("Error adding plant: ", event.target.error);
                };
            });
        });
    });
}