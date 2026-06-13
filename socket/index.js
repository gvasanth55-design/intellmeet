const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ User Connected:", socket.id);

  // Meeting Join
  socket.on("join-meeting", ({ meetingId, userId }) => {
    socket.join(meetingId);
    console.log(`${userId} joined meeting: ${meetingId}`);
    socket.to(meetingId).emit("user-joined", { userId });
  });

  // Meeting Leave
  socket.on("leave-meeting", ({ meetingId, userId }) => {
    socket.leave(meetingId);
    console.log(`${userId} left meeting: ${meetingId}`);
    socket.to(meetingId).emit("user-left", { userId });
  });

  // Chat Message
  socket.on("send-message", ({ meetingId, message, sender }) => {
    console.log(`Message from ${sender}: ${message}`);
    io.to(meetingId).emit("receive-message", { 
      message, 
      sender,
      time: new Date().toLocaleTimeString()
    });
  });

  // Typing Indicator
  socket.on("typing", ({ meetingId, userId }) => {
    socket.to(meetingId).emit("user-typing", { userId });
  });

  socket.on("stop-typing", ({ meetingId, userId }) => {
    socket.to(meetingId).emit("user-stop-typing", { userId });
  });

  // Mute/Unmute
  socket.on("toggle-mute", ({ meetingId, userId, isMuted }) => {
    io.to(meetingId).emit("participant-muted", { userId, isMuted });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("❌ User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ Socket Server running on port ${PORT}`);
});