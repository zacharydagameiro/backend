// const WebSocket = require("ws");
// const admin = require("firebase-admin");

// const chatRoom = (req, res) => {
//   // Create a new WebSocket server
//   const ws = new WebSocket.Server({ noServer: true });

//   // Set up an event listener for new connections
//   ws.on("connection", (ws) => {
//     // Set up an event listener for messages from clients
//     ws.on("message", (message) => {
//       // Parse the message
//       const data = JSON.parse(message);
//       // Get a reference to the Realtime Database
//       const db = admin.database();
//       // Store the message in the Realtime Database
//       db.ref("/messages").push({
//         username: data.username,
//         message: data.message,
//         timestamp: Date.now(),
//       });
//       // Send the message to all connected clients
//       ws.clients.forEach((client) => {
//         if (client !== ws && client.readyState === WebSocket.OPEN) {
//           client.send(message);
//         }
//       });
//     });
//   });

//   ws.handleUpgrade(req, res, (ws) => {
//     ws.emit("connection", ws, req);
//   });
// };

// module.exports = chatRoom;
