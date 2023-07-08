const kafka = require('kafka-node');

class KafkaProducer {
  constructor() {
    this.client = new kafka.KafkaClient({kafkaHost: 'kafka:9092'});
    this.producer = new kafka.Producer(this.client);
    this.topic = 'mytopic';

    this.producer.on('ready', () => {
      console.log('Kafka producer is ready');
    });

    this.producer.on('error', (error) => {
      console.error('Error initializing Kafka producer:', error);
    });
  }

  sendMessage(message) {
    return new Promise((resolve, reject) => {
      const payloads = [
        {
          topic: this.topic,
          messages: message,
        },
      ];

      this.producer.send(payloads, (error, data) => {
        if (error) {
          console.error('Error sending message to Kafka:', error);
          reject(error);
        } else {
          console.log('Message sent to Kafka:', data);
          resolve();
        }
      });
    });
  }
}

module.exports = KafkaProducer;
