let nickname = null;
let roomNo = null;
let socket = io();

window.addEventListener('load', function() {
    // Check if nickname is set in local storage
    nickname = localStorage.getItem('nickname');
    if (!nickname) {
        // Redirect to the settings page
        window.location.href = '/settings';
    }

    init();
    connectToRoom();

    const pathArray = window.location.pathname.split('/');
    const plantId = pathArray[pathArray.length - 1];

    const chatSendButton = document.getElementById('chat_send');
    chatSendButton.addEventListener('click', function () {
        const chatText = nickname + ": "+ document.getElementById('chat_input').value;

        sendChatText(chatText);

        const chat = {
            chat: chatText,
        }

        // Make the POST request
        fetch(`/plant/${plantId}/add-chat/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chat),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});

function init() {
    // called when a message is received
    socket.on('chat', function (room, userId, chatText) {
        console.log("Chat!", room, userId, chatText);
        writeOnHistory(chatText);
    });
}

/**
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText(chatText) {
    console.log(roomNo, nickname, chatText);
    socket.emit('chat', roomNo, nickname, chatText);
}

/**
 * used to connect to a room. It gets the user name and room number from the
 * interface
 */
function connectToRoom() {
    roomNo = document.getElementById('roomNo').value;
    if (!nickname) nickname = 'Unknown-' + Math.random();
    socket.emit('create or join', roomNo, nickname);
}

/**
 * it appends the given html text to the history div
 * @param text: the text to append
 */
function writeOnHistory(text) {
    console.log("Writing!", text);
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    document.getElementById('chat_input').value = '';
}
