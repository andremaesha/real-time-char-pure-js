// make connection
const socket = io("http://localhost:4000");

// query DOM
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

// Emit events
btn.addEventListener("click", () => {
    socket.emit("chat", {
        message: message.value,
        handle: handle.value,
    });
});

message.addEventListener("keypress", () => {
    socket.emit("typing", handle.value);
});

// listen for events
socket.on("chat", (data) => {
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}: </strong> ${data.message}</P>`;
});

socket.on("typing", (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
