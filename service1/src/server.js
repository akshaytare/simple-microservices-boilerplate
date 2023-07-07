const express = require('express');
const kafka = require('kafka-node');
const app = express();
const port = 3000;

// Kafka client
const client = new kafka.KafkaClient({kafkaHost: 'kafka:9092'});
const producer = new kafka.Producer(client);

app.get('/send', (req, res) => {
  const payloads = [{ topic: 'mytopic', messages: 'hello from service1', partition: 0 }];
  producer.send(payloads, function (err, data) {
    if (err) console.log(err);
    console.log(data);
  });

  res.send('Message sent');
});

app.listen(port, () => {
  console.log(`Service1 is running on port ${port}`);
});
