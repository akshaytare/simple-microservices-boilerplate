const express = require('express');
const { Kafka, logLevel } = require('kafkajs');
const app = express();
const port = 3001;

let messages = [];

const kafka = new Kafka({
  clientId: 'service2',
  brokers: [process.env.KAFKA_BROKER],
  logLevel: logLevel.ERROR,
});

const admin = kafka.admin();

// Create the topic if it doesn't exist
async function createTopicIfNotExists() {
  try {
    await admin.connect();
    const topicMetadata = await admin.fetchTopicMetadata({ topics: ['mytopic'] });

    if (topicMetadata.topics.length === 0) {
      await admin.createTopics({
        topics: [
          {
            topic: 'mytopic',
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });
      console.log('Topic created');
    } else {
      console.log('Topic already exists');
    }
  } catch (error) {
    console.error('Failed to create topic:', error);
  } finally {
    await admin.disconnect();
  }
}

// Kafka consumer
const consumer = kafka.consumer({ groupId: 'mygroup' });

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'mytopic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received message:', message.value.toString());
      messages.push(message.value.toString());
    },
  });
}

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.listen(port, () => {
  console.log(`Service2 is running on port ${port}`);
});

createTopicIfNotExists().then(startConsumer);
