window.onload = function () {
    // Check if nickname is set in local storage
    let nickname = localStorage.getItem('nickname');
    if (!nickname) {
        // Redirect to the settings page
        window.location.href = '/settings';
    } else {
        const acceptSuggestionButtons = document.querySelectorAll('.accept_suggestion');
        acceptSuggestionButtons.forEach(button => {
            let author = button.getAttribute('data-nickname');
            let status = button.getAttribute('data-status');

            if (status === 'completed' || author !== nickname) {
                button.style.display = 'none';
            }
        });
    }

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const pathArray = window.location.pathname.split('/');
    const plantId = pathArray[pathArray.length - 1];

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
        // Get the selected option from the datalist
        const selectedOption = Array.from(searchResults.options).find(option => option.value === searchInput.value);

        // If no option is selected, do nothing
        if (!selectedOption) return;

        const name = selectedOption.value; // The input value
        const dbpediaURI = selectedOption.text; // The option text

        // Create the suggestion object
        const suggestion = {
            userNickname: nickname,
            name: name,
            dbpediaURI: dbpediaURI
        };

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

    // add all event listeners to class="accept_suggestion"
    const acceptSuggestionButtons = document.querySelectorAll('.accept_suggestion');
    acceptSuggestionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const suggestionId = button.getAttribute('data-suggestion-id');

            // Make the POST request
            fetch(`/plant/${plantId}/accept-suggestion/${suggestionId}`, {
                method: 'POST',
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert("Suggestion accepted successfully!")
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    });
}
