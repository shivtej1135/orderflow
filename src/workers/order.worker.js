import { Worker } from "bullmq";
import { bullMQConnection } from "../config/bullmq.js";
import { updateOrderStatusService } from "../services/order.service.js";
import { publisher } from "../config/redisPubSub.js";
import metrics from "../utils/metrics.js";
// Connect Redis publisher for Pub/Sub events
if (!publisher.isOpen) {
    await publisher.connect();
}

// BullMQ worker listening to the order-processing queue
const worker = new Worker("order-processing", async (job) => {

        console.log(`Processing order ${job.data.orderId}`);
        // Publish processing status update
        await publisher.publish(
            "order:status:updated",
            JSON.stringify({
                orderId: job.data.orderId,
                userId: job.data.userId,
                status: "processing"
            })
        );

        // Simulate slow payment processing
        await new Promise((resolve) =>
            setTimeout(resolve, 5000)
        );
        console.log(
    `Attempt ${job.attemptsMade + 1} for order ${job.data.orderId}`
);

// if (job.attemptsMade < 2)
 if (job.attemptsMade < 100) 
{
    throw new Error(
        `Simulated payment failure on attempt ${job.attemptsMade + 1}`
    );
}
        // Mark order as confirmed
        await updateOrderStatusService(
            job.data.orderId,
            "confirmed"
        );
        // Publish confirmed status update
        await publisher.publish(
            "order:status:updated",
            JSON.stringify({
                orderId: job.data.orderId,
                userId: job.data.userId,
                status: "confirmed"
            })
        );
        console.log(`Order ${job.data.orderId} confirmed`);
    },
   {
    connection: bullMQConnection
}
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", async (job, err) => {
    console.log(
        `Attempt ${job?.attemptsMade} failed for order ${job?.data.orderId}`
    );

    console.log(`Reason: ${err.message}`);
    // Track every failed queue attempt
    metrics.queueFailures++;

    if (job.attemptsMade === job.opts.attempts) {
        await updateOrderStatusService(
            job.data.orderId,
            "failed"
        );
        // Track orders that permanently failed
        metrics.ordersFailed++;
        // Publish failed status update
        await publisher.publish(
            "order:status:updated",
            JSON.stringify({
                orderId: job.data.orderId,
                userId: job.data.userId,
                status: "failed"
            })
        );

        console.log(
            `Order ${job.data.orderId} marked as payment_failed`
        );
    }
});