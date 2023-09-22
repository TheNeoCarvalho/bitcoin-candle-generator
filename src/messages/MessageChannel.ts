import { Channel, connect } from "amqplib";
import * as dotenv from "dotenv";
dotenv.config();

export const createMessageChannel = async (): Promise<Channel> => {
  try {
    const connection = await connect(process.env.AMQP_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(process.env.QUEUE_NAME);
    console.log("Connected to rabbitMQ");

    return channel;
  } catch (error) {
    console.log("Error while tryng to connect to RabbitMQ");
    console.error(error);
    return null;
  }
};
