
// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

// Handle the beforeinstallprompt event for PWA installation
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const chatIcon = document.getElementById('chat-icon');
    const chatBox = document.getElementById('chat-box');
    const closeChat = document.getElementById('close-chat');
    const sendMessage = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');
    const loginOption = document.getElementById('login-option');
    const signInOption = document.getElementById('sign-in-option');

    // Function to show the chat box
    chatIcon.addEventListener('click', () => {
        chatBox.style.display = 'block';
    });

    // Function to hide the chat box
    closeChat.addEventListener('click', () => {
        chatBox.style.display = 'none';
    });

    // Function to send a message
    sendMessage.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            appendMessage('User', message);
            chatInput.value = '';
            handleChatInput(message);
        }
    });

    // Function to handle the 'Enter' key press
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });

    // Append a message to the chat body
    function appendMessage(sender, message) {
        const messageElement = document.createElement('p');
        const timestamp = new Date().toLocaleTimeString();
        messageElement.innerHTML = `<strong>${sender} (${timestamp})</strong>: ${message}`;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Handle chat input based on the user's selection
    function handleChatInput(input) {
        if (input.toLowerCase().includes('login')) {
            chatBody.innerHTML += `<p>Do you have Doubt on   <button id="login-name">Name</button> or <button id="login-usn">USN</button>?</p>`;
            document.getElementById('login-name').addEventListener('click', () => {
                appendMessage('System', 'Please enter a proper name.');
            });
            document.getElementById('login-usn').addEventListener('click', () => {
                appendMessage('System', 'Please enter your USN in the format NNM23XXXXX.');
            });
        } else if (input.toLowerCase().includes('sign in')) {
            chatBody.innerHTML += `<p>Do you want to sign in with <button id="google-signin">Google</button> or <button id="github-signin">GitHub</button>?</p>`;
            document.getElementById('google-signin').addEventListener('click', () => {
                appendMessage('System', 'Please select your Google account.');
            });
            document.getElementById('github-signin').addEventListener('click', () => {
                appendMessage('System', 'Please authorize with Clerk Development.');
            });
        } else {
            appendMessage('System', 'Sorry, I did not understand that. Please choose an option from the above.');
        }
    }

    // Initial welcome message
    appendMessage('System', 'Welcome to Academic Pal! Have any doubts about login?');
    appendMessage('System', 'You can type "Login" or "Sign In" to proceed.');
});
