import { Queue } from "bullmq";
import { bullMQConnection } from "../config/bullmq.js";


// Queue for background order processing
const orderQueue = new Queue("order-processing",{connection: bullMQConnection});

export default orderQueue;