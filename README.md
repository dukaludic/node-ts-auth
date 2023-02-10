# Requirements

Node v16.14.0
Docker-compose

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

# Reproducing functionality

1. Register a user

   User is added to database and set an access token while the refresh token is stored in a http-only cookie.
   He is automatically logged in. Access token lasts 30s for testing purposes. Refresh token lasts an hour.

2. Fetch a user by ID

   Grab the access token from previous request body and for 30s you will be able to fetch user(s). If you have just migrated the database current user ID will be 1.

   After 30s token expires and we get an error. This is intended for front end to catch it with interceptors and send a new request to refresh a token.

3. Refreshing a token

   This endpoint refreshes the access token and sends the new one in the body and overwrites the old refresh token in the cookie giving it a new expiry date. So here we could have added some blacklisting but that would break the app's statelessnes if we use cache or if we use a database would slightly degrade the performance. It's a tradeoff that could be discussed

4. Try fetching users again

5. Logout

   On logout we clear the refreshToken cookie. It could also be blacklisted if we want to prevent the case
   if someone stole the refresh token before it was cleared.

At any time we can use the login endpoint to get a new pair of access and refresh token

# Other

Swagger docs are on /api-docs
Postman requests are exported in postman_collection.json
