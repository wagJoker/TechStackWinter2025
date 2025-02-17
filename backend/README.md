# Art Gallery API

## Overview
The Art Gallery API is a RESTful API built with NestJS that allows users to manage galleries and artists. It provides endpoints for creating, retrieving, updating, and deleting galleries and artists.

## Features
- Create, read, update, and delete galleries
- Create, read, update, and delete artists
- Data validation using DTOs
- Swagger API documentation for easy exploration of endpoints

## Technologies Used
- NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
- TypeScript: A superset of JavaScript that compiles to plain JavaScript.
- Swagger: A tool for documenting and testing APIs.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd art-gallery-api
   ```
3. Install the dependencies:
   ```
   npm install --legacy-peer-deps
   ```
4. Run the application:
   ```
   npm run start
   ```
5. Access the API documentation at `http://localhost:3000/api`.

## API Endpoints
### Galleries
- `POST /galleries`: Create a new gallery
- `GET /galleries`: Retrieve all galleries
- `GET /galleries/:id`: Retrieve a specific gallery by ID
- `PUT /galleries/:id`: Update a specific gallery by ID
- `DELETE /galleries/:id`: Delete a specific gallery by ID

### Artists
- `POST /artists`: Create a new artist
- `GET /artists`: Retrieve all artists
- `GET /artists/:id`: Retrieve a specific artist by ID
- `PUT /artists/:id`: Update a specific artist by ID
- `DELETE /artists/:id`: Delete a specific artist by ID

## License
This project is licensed under the MIT License.