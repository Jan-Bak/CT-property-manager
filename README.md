# Recruitment task to Cover Tree

### Stack

- **NestJS** - Backend framework
- **GraphQL** - API Layer
- **MongoDB** - Database
- **Docker** - Containerization
- **Node.js** - v24

### Prerequisites

- Node.js v24
- Docker & Docker Compose
- npm

### Setup & Installation

**Create a `.env` file** with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://admin:password@mongo:27017/property-manager?authSource=admin
WEATHERSTACK_API_KEY=your_weatherstack_api_key_here
```

### How to Run

#### Option 1: Using Docker (Recommended)

Start all services (NestJS app + MongoDB) in one command:

```bash
docker-compose up -d
```

The app will be available at `http://localhost:3000/graphql`

#### Option 2: Local Development

1. **Install dependencies:**

```bash
npm install
```

2. **Start the development server:**

```bash
npm run start:dev
```

Remember to change the `MONGODB_URI` in your `.env` file to point to your local MongoDB instance if you're running it outside of Docker.

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
