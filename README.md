# Worker-Pool-Design
[![language](https://img.shields.io/badge/language-Go-00ADD8?labelColor=2F2F2F)](https://go.dev/doc/)
[![version](https://img.shields.io/badge/version-1.25-9C27B0?labelColor=2F2F2F)](https://go.dev/doc/install)

## Why This Project Exists
This repository aims to create a worker pool model for any Message Broker, having a monorepo structure and using docker-compose to create and configure both RabbitMQ and Kafka. Future plans includes SQS and Redis with some proper configuration.

I create this just play a little with `Kotlin/Quarkus`, had to practice my frontend... And what better to do them to build a whole application from it hahaha...

---

## Table of contents

- [Tech Stack](#tech-stack)
- [Overview](#high-level-overview)
- [Architecture](#architecture-flow)
- [UI Concept](#ui-concept-nextjs)
- [Project Structure](#backend-structure)
- [License](#license)
- [Contact](#contact)

---

## Tech Stack

-   Golang
-   Kotlin + Quarkus 
-   Next.js
-   RabbitMQ / Kafka 
-   Docker & Docker Compose

---

## High-Level Overview

The system is composed of three main parts:

1.  **Frontend - Next.js**
2.  **Producer - Kotlin + Quarkus**
3.  **Worker Pool - Golang**

Communication is asynchronous and mediated by a **Message Broker**, RabbitMQ and/or Apache Kafka.

---

## Architecture Flow

1.  The user interacts with the **Next.js UI**
2.  The UI sends an HTTP request to the **Kotlin/Quarkus Producer**
3.  The Producer:
    -   Parses the request
    -   Generates `N` User CRUD messages (based on user input)
    -   Publishes messages to the selected broker (RabbitMQ or Kafka)
4.  The **Golang Worker Pool**:
    -   Consumes messages from the broker
    -   Processes them concurrently
    -   Enforces a strict concurrency limit via `GOMAXPROCS`

---

## UI Concept (Next.js)

The frontend is intentionally minimal.

**Components:** 
- Two buttons:
    - `RabbitMQ`
    - `Apache Kafka`
- An input field to define how many messages should be produced
- And three buttons to define what action should be done:
    - DELETE x `Users`
    - CREATE x `Users`
    - UPDATE x `Users` 

- Details Screen:
    - A minimal box with all the user data with `offset pagination`.

**Behavior:** 
- Clicking a button sends a request to the Producer API
- The selected broker is inferred from the URL
- No direct communication with the Go workers

---

## Backend Structure

    backend/
    ├── producer/
    │   ├── quarkus-app/
    │   │   ├── src/
    │   │   └── ...
    │   └── README.md
    │
    ├── worker/
    │   ├── cmd/
    │   ├── internal/
    │   │   ├── worker/
    │   │   ├── broker/
    │   │   │   ├── kafka/
    │   │   │   └── rabbitmq/
    │   │   └── config/
    │   ├── go.mod
    │   └── README.md

---

## Frontend (Next.js)

    frontend/
    ├── app/
    ├── components/
    ├── services/
    └── README.md

-   Simple UI
-   No business logic
-   Acts only as a trigger layer

## License

[Click here](LICENSE)

## Contact

For questions or help, contact: `rafael.cr.carneiro@gmail.com`