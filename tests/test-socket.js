import { io } from "socket.io-client";

// JWT access token from login API
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzg3Nzc2MzcxLCJleHAiOjE3ODc3NzcyNzF9.b643rwgSz01nrINGc-V8CySCMeBtovutSDj2WC37rYc";

const socket = io("http://localhost:5000", {
    auth: {
        token
    }
});

socket.on("connect", () => {
    console.log(
        `Connected: ${socket.id}`
    );
});

// Listen for real-time order status updates
socket.on(
    "ORDER_STATUS_UPDATED",
    (data) => {
        console.log(
            "Order Update:",
            data
        );
    }
);

socket.on("disconnect", () => {
    console.log("Disconnected");
});