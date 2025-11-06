const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

// Connect to public WebSocket echo server
const socket = new WebSocket("wss://echo.websocket.events");

// When connection opens
socket.onopen = () => {
  addMessage("Connected to server ✅", "received");
};

// When message received
socket.onmessage = (event) => {
  if (event.data && event.data !== "echo.websocket.events sponsored by Lob.com") {
    addMessage(event.data, "received");
  }
};

// Send message
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = messageInput.value.trim();
  if (msg === "") return;

  addMessage(msg, "sent");
  socket.send(msg);
  messageInput.value = "";
}

function addMessage(text, type) {
  const msgDiv = document.createElement("div");
  msgDiv.textContent = text;
  msgDiv.classList.add("message", type);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
