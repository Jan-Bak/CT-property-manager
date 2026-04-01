# Recruitment task to Cover Tree

### Stack

- NestJS
- GraphQL
- MongoDB
- Docker

### How to run the project

Create `.env` file with the following content:

```
  PORT=3000
  MONGODB_URI=your_mongodb_uri # e.g. mongodb://admin:password@localhost:27017/property-manager?authSource=admin
  WEATHERSTACK_API_KEY=your_weatherstack_api_key
```

Then run the following command to install dependencies and start the server:

```bash
  docker-compose up -d
  npm install
  npm run start:dev
```

### Example queries related with user stories:

##### Creating new data

```graphql
mutation {
  createProperty(
    input: {
      city: "Naples"
      state: "FL"
      street: "66 Lemans Dr"
      zipCode: "34112"
    }
  ) {
    id
    state
    street
    zipCode
    weatherData {
      temperature
    }
  }
}
```

##### Fetching all properties

```graphql
query {
  properties {
    id
    state
    street
    zipCode
    city
    weatherData {
      temperature
    }
    createdAt
  }
}
```

##### Fetching properties with filters and sorting

```graphql
query {
  properties(state: "AZ", sortBy: DESC) {
    id
    state
    street
    zipCode
    city
    weatherData {
      temperature
    }
    createdAt
  }
}
```

#### Fetching a single property by ID

```graphql
query {
  property(id: "69cd524662a6393efbf2e091") {
    id
    state
    street
    zipCode
    city
    weatherData {
      temperature
    }
    createdAt
  }
}
```

##### Delete a property

```graphql
mutation {
  deleteProperty(id: "69cd524662a6393efbf2e091")
}
```
