// Initialize the socket.io for client access using io() function
const clientIo = io()


const logsDiv = document.getElementById('event-log');

const logEvent = (message) => {
    const logEntry = document.createElement('p');
    logEntry.classList.add('log-entry');
    logEntry.textContent = message;
    logsDiv.appendChild(logEntry);
    logsDiv.scrollTop = logsDiv.scrollHeight; 
};

const sendPing = () => {
    logEvent(`Ping button clicked`);

    // trigger 'ping' event from client to server
    // emit() function send event
    // emit(event_name, (optinal) additional_data)
    const message = "hello from client"
    clientIo.emit('ping', message)
    logEvent(`Sent: ping event emitted with message: ${message}`)
};

const sendChatMessage = () => {
    logEvent('Chat button clicked');

    const message = document.getElementById('message-input').value

    if (message.trim()) {
        clientIo.emit('chat-message', message)
        logEvent(`Send ${message}`)
    } else {
        logEvent(`Message is empty. Cant't send.`)
    }
};

const sendFeedback = () =>{
    const category = document.getElementById('feedback-category').value;
    const userInput = document.getElementById('feedback-message').value;

    const feedback = {
        date: new Date(),
        user: clientIo.id,
        category: category,
        message: userInput
    }

    clientIo.emit('send-feedback', feedback)

    logEvent(`Feedback sent: ${JSON.stringify(feedback)}`);
};


clientIo.on('hello', (response) => {
    logEvent(`ping was scucessful. Server responded with: ${response}`)
})

clientIo.on('chat-acknowledgement', () => {
    alert("Message delivered")
})

clientIo.on('feedback-acknowledgement', (data) => {
    alert(`Feedback Delivered, ${data.message}`)
})