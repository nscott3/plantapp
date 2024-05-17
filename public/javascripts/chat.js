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
});

function init() {
    // called when someone joins the room. If it is someone else it notifies the joining of the room
    socket.on('joined', function (room, userId) {
        if (userId === nickname) {
            // it enters the chat
            hideLoginInterface(room, userId);
        } else {
            // notifies that someone has joined the room
            writeOnHistory('<b>'+userId+'</b>' + ' joined room ' + room);
        }
    });
    // called when a message is received
    socket.on('chat', function (room, userId, chatText) {
        let who = userId
        if (userId === nickname) who = 'Me';
        console.log("Chat!", room, userId, chatText);
        writeOnHistory('<b>' + who + ':</b> ' + chatText);
    });

}

/**
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    console.log(roomNo, nickname, chatText);
    socket.emit('chat', roomNo, nickname, chatText);
}

/**
 * used to connect to a room. It gets the user name and room number from the
 * interface
 */
function connectToRoom() {
    roomNo = document.getElementById('roomNo').value;
    console.log("RoomNo", roomNo);
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

/**
 * it hides the initial form and shows the chat
 * @param room the selected room
 * @param userId the user name
 */
function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML= userId;
    document.getElementById('in_room').innerHTML= ' '+room;
}
