import { Server } from "socket.io";
import socketAuthMiddleware from "./middlewares/socketAuth.middleware.js";
let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });
    // Authenticate every socket connection using JWT
    io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {
        // Join a private room for this authenticated user
        socket.join(`user:${socket.user.id}`);

        console.log(`User ${socket.user.id} connected: ${socket.id}`);

        socket.on("disconnect", () => {
        console.log(
            `User ${socket.user.id} disconnected: ${socket.id}`
        );
    });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error(
            "Socket.IO has not been initialized"
        );
    }

    return io;
};

export {
    initializeSocket,
    getIO
};