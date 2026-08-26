import { subscriber } from "../config/redisPubSub.js";
import { getIO } from "../socket.js";

// Subscribe to order status updates published by the worker
const subscribeToOrderStatusUpdates = async () => {
    await subscriber.subscribe(
        "order:status:updated",
        (message) => {

            // Convert Redis message string back to object
            const data = JSON.parse(message);

            const io = getIO();

            // Send update only to the room of the order owner
            io.to(`user:${data.userId}`).emit(
                "ORDER_STATUS_UPDATED",
                data
            );

            console.log(
                `Order update sent to user ${data.userId}`
            );
        }
    );
};

export default subscribeToOrderStatusUpdates;