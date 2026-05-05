import amqp from "amqplib";
let connection = null;
let channel = null;
const QUEUE_NAME = "analytics_recommendation.queue";
async function getChannel() {
    if (channel)
        return channel;
    const conn = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost:5672");
    const ch = await conn.createChannel();
    //  Direct queue instead of exchange
    await ch.assertQueue(QUEUE_NAME, { durable: true });
    connection = conn;
    channel = ch;
    return ch;
}
export async function publishRecommendationEvent(payload) {
    const ch = await getChannel();
    console.log(`Publishing recommendation event: ${JSON.stringify(payload)}`);
    ch.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)), {
        persistent: true,
        contentType: "application/json",
    });
    console.log("Recommendation event published successfully");
}
export async function closeRecommendationPublisher() {
    await channel?.close();
    await connection?.close();
    channel = null;
    connection = null;
}
