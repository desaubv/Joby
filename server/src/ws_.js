const { WebSocket } = require("@desaubv/quik/ws");

const ws = WebSocket();

// Client connected
ws.onConnect((client) => {
    console.log("Client connected");
});

// Message received
ws.onMessage((client, message) => {
    const data = message.toString();

    console.log("Message received:", data);
    ws.send(client, "Hello from Quik!");
    
    if(data == "all"){
        ws.broadcast("Helo world everybody!");
    }
});

// Client disconnected
ws.onDisconnect((client) => {
    console.log("Client disconnected:", client);
});


// WebSocket error
ws.onError((client, error) => {
    console.error("WebSocket error:", error);
});


module.exports = ws;