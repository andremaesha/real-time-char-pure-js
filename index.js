const express = require("express");
const { Server } = require("socket.io");

const app = express();

app.use(express.static("public"));

const server = app.listen(4000, () => {
    console.log("server running at 4000 port");
});

// socket setup
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("made socket connection", socket.id);

    // handle chat event
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});
