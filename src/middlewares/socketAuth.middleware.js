import jwt from "jsonwebtoken";

// Verify JWT token during socket handshake
const socketAuthMiddleware = (
    socket,
    next
) => {
    try {
        const token =
            socket.handshake.auth.token;

        if (!token) {
            return next(
                new Error("Authentication required")
            );
        }

        // Decode and verify access token
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );
        // Attach authenticated user data to socket
        socket.user = decoded;

        next();
    } catch (err) {
        next(
            new Error("Invalid token")
        );
    }
};

export default socketAuthMiddleware;