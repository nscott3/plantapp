window.onload = function () {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', function () {
        fetch(`/dbpedia?searchInput=${searchInput.value}`)
            .then(response => response.json())
            .then(data => {
                // Clear the current options
                searchResults.innerHTML = '';

                // Populate the combobox with the results
                data.forEach(item => {
                    console.log(item);
                    const option = document.createElement('option');
                    option.value = item.label.value;
                    option.text = item.root.value;
                    searchResults.appendChild(option);
                });
            });
    });

    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', function () {
        // Get the necessary data
        const userNickname = "nathan";

        // Get the selected option from the datalist
        const selectedOption = Array.from(searchResults.options).find(option => option.value === searchInput.value);

        // If no option is selected, do nothing
        if (!selectedOption) return;

        const name = selectedOption.value; // The input value
        const dbpediaURI = selectedOption.text; // The option text

        // Create the suggestion object
        const suggestion = {
            userNickname: userNickname,
            name: name,
            dbpediaURI: dbpediaURI
        };

        const pathArray = window.location.pathname.split('/');
        const plantId = pathArray[pathArray.length - 1];

        // Make the POST request
        fetch(`/plant/${plantId}/add-suggestion/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(suggestion),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("Suggestion added successfully!")
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}
