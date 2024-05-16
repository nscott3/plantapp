window.onload = function () {
    // Select the input field and the button
    const nicknameInput = document.getElementById('nicknameInput')
    const saveButton = document.getElementById('saveButton')

    // Check if nickname is set in local storage
    let nickname = localStorage.getItem('nickname');
    if (nickname) {
        nicknameInput.value = nickname;
    }

    // Add an event listener to the button
    saveButton.addEventListener('click', function () {
        // Get the value of the input field
        const nickname = nicknameInput.value;

        // Save the nickname to the local storage
        localStorage.setItem('nickname', nickname);

        // Redirect to the index page
        window.location.href = '/';
    });
}