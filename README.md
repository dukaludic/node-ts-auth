# Requirements

Node v16.14.0
Docker

# Running locally

```shell
# Install dependencies
npm ci

# Start the database
docker-compose up -d

# Run the migrations
node migration.js up

# Start the server
npm run start:dev
```
