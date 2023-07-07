
# Microservices Application with Node.js, Kubernetes, and Kafka

This is a sample microservices application built using Node.js, Kubernetes, and Kafka. The application consists of two services that communicate with each other using Kafka for message exchange.

## Folder Structure

The application has the following folder structure:

\`\`\`
.
├── kubernetes
│   ├── service1
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── service2
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   └── kafka
│       ├── zookeeper.yaml
│       └── kafka.yaml
├── service1
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       └── server.js
├── service2
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       └── server.js
├── docker-compose.yaml
└── .env
\`\`\`

- The \`kubernetes\` directory contains the Kubernetes deployment and service files for each service and the Kafka cluster.
- The \`service1\` and \`service2\` directories contain the Dockerfiles, package.json files, and source code for each service.
- The \`docker-compose.yaml\` file is used for local development and testing.
- The \`.env\` file contains environment variables used by the application.

## Prerequisites

Before running the application, make sure you have the following dependencies installed:

- Docker
- Kubernetes
- Node.js

## Getting Started

1. Clone this repository:

\`\`\`shell
git clone <repository-url>
cd <repository-directory>
\`\`\`

2. Update the \`.env\` file with the necessary configuration details, such as Kafka broker URL and topic name.

3. Build the Docker images and start the containers:

\`\`\`shell
docker-compose up --build
\`\`\`

This command will build the Docker images for service1 and service2, along with the Kafka container. The containers will be started, and you can access the services using the defined ports.

4. Verify that the services are running:

- Service1: Open http://localhost:3000 in your browser. You should see a message indicating that the service is running.
- Service2: Open http://localhost:3001/messages in your browser. You should see an empty array initially, and it will populate with messages sent by Service1.

5. Test the communication between the services:

- Send a message from Service1 to Service2: Make a POST request to http://localhost:3000/send with a JSON payload \`{ "message": "Hello, Service2!" }\`. This will send the message to the Kafka topic.
- Verify that the message is received by Service2: Refresh http://localhost:3001/messages, and you should see the received message in the JSON response.

## Kubernetes Deployment

To deploy the application in a Kubernetes cluster, follow these steps:

1. Make sure you have a running Kubernetes cluster.

2. Navigate to the \`kubernetes\` directory:

\`\`\`shell
cd kubernetes
\`\`\`

3. Deploy the Kafka cluster:

\`\`\`shell
kubectl apply -f kafka/zookeeper.yaml
kubectl apply -f kafka/kafka.yaml
\`\`\`

4. Deploy Service1 and Service2:

\`\`\`shell
kubectl apply -f service1/deployment.yaml
kubectl apply -f service1/service.yaml
kubectl apply -f service2/deployment.yaml
kubectl apply -f service2/service.yaml
\`\`\`

5. Verify that the pods and services are running:

\`\`\`shell
kubectl get pods
kubectl get services
\`\`\`

6. Access the services using the defined NodePort or LoadBalancer IP.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
EOF
