
#  BIN Provider Service

Typescript application for fetching issuing data for customer credit/debit cards

##  📋  Stack

* [Typescript](https://www.typescriptlang.org//)
* [Mongo DB](https://www.mongodb.com/)
* [Docker](https://www.docker.com/)

## 🔧 Prerequisites

You need to have the following tools installed on your machine:

* Docker
* Docker Compose
* API Clients (Postman, Insomnia)


### Project Setup

Git Clone this repo
```bash
git clone https://github.com/chizzydavid/bin-provider-service.git
```

Navigate into directory
```bash
cd bin-provider-service
```

Add Environment Variables
```bash
touch .env
```
Copy and paste variables below into .env
```bash
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=password
DB_HOST=mongo-database
DB_PORT=27017
PORT=9090
```

Build and run backend application and mongo database using docker-compose
```bash
docker-compose up --build
```

Access application on your api client 
```bash
http://localhost:9090/api/v1/bins/80247008
```



