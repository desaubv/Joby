const { Socket } = require("@desaubv/quik/socket.io");

const socket = Socket();

socket.onConnect((client) => {
        console.log("Client connected:", client.id);
    }).onDisconnect((client, reason) => {
        console.log(
            "Client disconnected:",
            client.id,
            "Resason:", reason
        );
    });

socket.addEvent("ping", (client) => {
    console.log("ping");
    socket.emitTo(
        client,
        "pong",
        "Hello from Quik!"
    );
});

socket.addEvent("message", (client, message) => {
    console.log("Message:", message);
    socket.broadcast(
        client,
        "message",
        message
    );
});

module.exports = socket;