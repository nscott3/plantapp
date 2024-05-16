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

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

window.onload = function () {
    // Check if nickname is set in local storage
    let nickname = localStorage.getItem('nickname');
    if (!nickname) {
        // Redirect to the settings page
        window.location.href = '/settings';
    } else {
        document.getElementById("userNickname").value = nickname;
    }

    // Add event listeners to buttons
    const add_form = document.getElementById("add_form")
    const url = 'http://localhost:3000/add-plant';

    add_form.addEventListener("submit", function(event) {
        event.preventDefault();
        let jsonData = {
            dateTimeSeen: document.getElementById("dateTimeSeen").value,
            location: {
                type: "Point",
                coordinates: [
                    +document.getElementById("latitude").value,
                    +document.getElementById("longitude").value
                ]
            },
            description: document.getElementById("description").value,
            plantSize: {
                height: document.getElementById("height").value,
                spread: document.getElementById("spread").value
            },
            plantCharacteristics: {
                hasFlowers: document.getElementById("hasFlowers").checked,
                hasLeaves: document.getElementById("hasLeaves").checked,
                hasFruitsOrSeeds: document.getElementById("hasFruitsOrSeeds").checked,
                sunExposure: document.getElementById("sunExposure").value,
                flowerColor: document.getElementById("flowerColor").value
            },
            identification: {
                name: document.getElementById("name").value,
                status: document.getElementById("status").value
            },
            userNickname: document.getElementById("userNickname").value,
            photo: document.getElementById("photo").files[0]
        };
        console.log(jsonData)
        let formData = jsonToFormData(jsonData);

        postData(url, formData).then(data => {
            console.log(data);
            alert("Plant added successfully!");
        }).catch(error => {
            console.error('Error:', error);
            alert("Error adding plant! Must be offline!", error);

            getBase64(jsonData.photo).then(base64 => {
                jsonData.photo = base64;
            });
            openSyncPlantsIDB().then((db) => {
                const transaction = db.transaction(['sync-plants'], 'readwrite');
                const objectStore = transaction.objectStore('sync-plants');
                const request = objectStore.add(jsonData);

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