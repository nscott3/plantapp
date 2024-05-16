
window.onload = function () {
    // Add event listeners to buttons
    const search_btn = document.getElementById("search_button")
    const url = 'http://localhost:3000/';

    search_btn.addEventListener("click", function(event) {
        // Capture the search options
        const searchInput = document.querySelector('.search_input').value;
        const identificationCompleted = document.querySelector('#identificationCompleted').checked;
        const identificationNotCompleted = document.querySelector('#identificationNotCompleted').checked;
        const hasFlowers = document.querySelector('#hasFlowers').checked;
        const noFlowers = document.querySelector('#noFlowers').checked;
        const hasLeaves = document.querySelector('#hasLeaves').checked;
        const noLeaves = document.querySelector('#noLeaves').checked;
        const hasFruitsOrSeeds = document.querySelector('#hasFruitsOrSeeds').checked;
        const noFruitsOrSeeds = document.querySelector('#noFruitsOrSeeds').checked;
        const sortOption = document.querySelector('input[name="sort"]:checked').value;

        // Create the query parameters
        const params = new URLSearchParams({
            searchInput,
            identificationCompleted,
            identificationNotCompleted,
            hasFlowers,
            noFlowers,
            hasLeaves,
            noLeaves,
            hasFruitsOrSeeds,
            noFruitsOrSeeds,
            sortOption
        });

        // Make the GET request
        fetch(`${url}?${params}`)
            .then(function (res) {
                console.log("Fetched plants");
                return res.json();
            });
    });
}