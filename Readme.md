
# Tech Stack Winter 2025
# Art Gallery Management System
## Project Overview

This project aims to develop a gallery management application with both frontend and backend components. The goal is to provide a seamless interface for managing art pieces, including viewing, adding, and deleting artwork entries.

## Table of Contents

- [Frontend Part](#frontend-part)
    - [Technologies](#technologies)
    - [Task Requirements](#task-requirements)
    - [User Features](#user-features)
    - [Gallery State Persistence](#gallery-state-persistence)
- [Backend Part](#backend-part)
    - [Technologies](#technologies-1)
    - [Task Requirements](#task-requirements-1)
    - [Endpoints](#endpoints)
    - [Example Requests](#example-requests)

## Frontend Part

### Technologies

- **Language:** TypeScript
- **Framework/Library:** React
- **Data Storage:** LocalStorage (or real API if both backend and frontend are implemented)

### Task Requirements

Develop a single-page application (SPA) to serve as the gallery management interface. The app should allow users to:

- View a list of available art pieces.
- Sort and filter art by price and artist.
- Add new artwork entries.
- Remove existing artwork.

### User Features

- **View Art Listings:** Users can browse a list of available artwork with details such as title, artist, type, price, and availability.
- **Sorting and Filtering Options:**
    - Sort by price (lowest to highest, highest to lowest).
    - Filter by artist and type.
- **Add New Artwork:** A form for adding new artwork entries with fields:
    - Title: Cannot be empty, max 99 characters.
    - Artist: Cannot be empty.
    - Type: Select from predefined types.
    - Price: Numeric only, must be positive.
    - Availability: Boolean, indicates if the piece is for sale or exhibition only.
- **Delete Artwork:** Each listing has a delete button for removal from the gallery.

### Gallery State Persistence

The first 4 artworks should be presented when the application launches. The gallery listing retains state, so updates are preserved after the page reloads (using LocalStorage or API if the backend is available).

## Backend Part

### Technologies

- **Language:** TypeScript
- **Framework:** NestJS / Express
- **Database:** SQLite
- **ORM (optional):** Prizma

### Task Requirements

Develop a Web API for managing art listings in a gallery. This API should provide basic CRUD functionality for artwork records.

### Endpoints

- **GET /artworks:** Retrieve a list of artwork entries. Support sorting (by price) and filtering (by artist or type).
- **GET /artworks/{id}:** Retrieve details of a specific artwork by its ID.
- **POST /artworks:** Add a new artwork entry with the following validation:
    - Title: Required, max length of 99 characters.
    - Artist: Required, max length of 50 characters.
    - Type: Required, predefined values (e.g., painting, sculpture).
    - Price: Required, must be a number greater than 0.
    - Availability: Boolean, optional.
- **DELETE /artworks/{id}:** Remove a specific artwork entry by ID.
- **(Optional) PUT /artworks/{id}:** Update an existing artwork entry with the same validation rules as in the POST endpoint.

### Example Requests

- **Retrieve All Artworks:** `GET /artworks?price=asc&artist=Picasso&type=painting`
- **Retrieve a Specific Artwork:** `GET /artworks/3`
- **Delete an Artwork:** `DELETE /artworks/{id}`
- **Add New Artwork:** `POST /artworks` with body:
    ```json
    {
        "title": "Sunset Over the Ocean",
        "artist": "Claude Monet",
        "type": "painting",
        "price": 4500,
        "availability": true
    }
    ```
The application consists of two primary parts: a backend (Web API) and a frontend (SPA). Completing either part is sufficient for a successful project, though completing both is encouraged.

Frontend Part

Technologies:

Language: TypeScript

Framework/Library: React 

Data Storage: LocalStorage (or real API if both backend and frontend are implemented)

Task Requirements:

Develop a single-page application (SPA) to serve as the gallery management interface. The app should allow users to:

View a list of available art pieces.

Sort and filter art by price and artist.

Add new artwork entries.

Remove existing artwork.

Artwork Model:
```
{
  "id": "string",
  "title": "string",
  "artist": "string",
  "type": "string", // (e.g., painting, sculpture)
  "price": "number",
  "availability": "boolean"
}
```
User Features:

View Art Listings: Users can browse a list of available artwork with details such as title, artist, type, price, and availability.

Sorting and Filtering Options:

Sort by price (lowest to highest, highest to lowest).

Filter by artist and type.

Add New Artwork: A form for adding new artwork entries with fields:

Title: Cannot be empty, max 99 characters.

Artist: Cannot be empty.

Type: Select from predefined types.

Price: Numeric only, must be positive.

Availability: Boolean, indicates if the piece is for sale or exhibition only.

Delete Artwork: Each listing has a delete button for removal from the gallery.

Gallery State Persistence:

The first 4 artworks should be presented when the application launches. The gallery listing retains state, so updates are preserved after the page reloads (using LocalStorage or API if the backend is available).

Backend Part

Technologies:

Language: TypeScript

Framework: NestJS / Express

Database:  SQLite

ORM (optional): Prizma

Task Requirements:

Develop a Web API for managing art listings in a gallery. This API should provide basic CRUD functionality for artwork records.

Endpoints:

GET /artworks

Retrieve a list of artwork entries.

Support sorting (by price) and filtering (by artist or type).

GET /artworks/{id}

Retrieve details of a specific artwork by its ID.

POST /artworks

Add a new artwork entry with the following validation:

Title: Required, max length of 99 characters.

Artist: Required, max length of 50 characters.

Type: Required, predefined values (e.g., painting, sculpture).

Price: Required, must be a number greater than 0.

Availability: Boolean, optional.

DELETE /artworks/{id}

Remove a specific artwork entry by ID.

(Optional) PUT /artworks/{id}

Update an existing artwork entry with the same validation rules as in the POST endpoint.

Example Requests:

Retrieve All Artworks: GET /artworks?price=asc&artist=Picasso&type=painting

Retrieve a Specific Artwork: GET /artworks/3

Delete an Artwork: DELETE /artworks/{id}

Add New Artwork: POST /artworks with body:

```
{
  "title": "Sunset Over the Ocean",
  "artist": "Claude Monet",
  "type": "painting",
  "price": 4500,
  "availability": true
}
```