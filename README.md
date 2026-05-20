# OpenJob RESTful API

OpenJob RESTful API is a backend application for an employee recruitment platform. This API manages users, companies, categories, jobs, applications, bookmarks, documents, and authentication using JWT.

This project is built with Express.js, PostgreSQL, and node-pg-migrate for database migration management.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Node.js](https://img.shields.io/badge/Node.js-v24-green)
![Express.js](https://img.shields.io/badge/Express.js-API-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-purple)
![Joi](https://img.shields.io/badge/Joi-Validation-lightgrey)
![Postman](https://img.shields.io/badge/Postman-Tested-orange)

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- node-pg-migrate
- Joi
- JSON Web Token
- bcrypt
- multer
- dotenv

## Features

- User registration
- Login, refresh token, and logout
- JWT-based authentication
- Refresh token stored in the database
- Protected routes using Bearer Token
- Company CRUD
- Category CRUD
- Job CRUD
- Job application feature
- Job bookmark feature
- Document upload
- User profile
- Request validation using Joi
- Error handling middleware
- Database migration using node-pg-migrate

## Folder Structure

```txt
openjob-api-v1
├── migrations
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validators
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── node-pg-migrate.config.js
├── package.json
└── package-lock.json
```

## Installation

Clone this repository:

```bash
git clone https://github.com/nazwaauliap/openjob-api-v1.git
cd openjob-api-v1
```

Install dependencies:

```bash
npm install
```

Create a PostgreSQL database named:

```txt
openjob_api
```

Copy `.env.example` to `.env`, then configure the database and JWT secret keys.

Example `.env` configuration:

```env
HOST=localhost
PORT=3000

PGUSER=postgres
PGPASSWORD=your_postgres_password
PGDATABASE=openjob_api
PGHOST=localhost
PGPORT=5432

ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret
```

Run database migration:

```bash
npm run migrate:up
```

Run the server:

```bash
npm run start:dev
```

The server will run at:

```txt
http://localhost:3000
```

## Available Scripts

```json
{
  "start": "node src/server.js",
  "start:dev": "nodemon src/server.js",
  "migrate:create": "node-pg-migrate create",
  "migrate:up": "node-pg-migrate up",
  "migrate:down": "node-pg-migrate down"
}
```

## Environment Variables

| Variable | Description |
|---|---|
| HOST | Server host |
| PORT | Server port |
| PGUSER | PostgreSQL username |
| PGPASSWORD | PostgreSQL password |
| PGDATABASE | PostgreSQL database name |
| PGHOST | PostgreSQL host |
| PGPORT | PostgreSQL port |
| ACCESS_TOKEN_KEY | Secret key for access token |
| REFRESH_TOKEN_KEY | Secret key for refresh token |

## Authentication

Protected endpoints require the following header:

```txt
Authorization: Bearer <accessToken>
```

Access token and refresh token are generated from the login endpoint:

```txt
POST /authentications
```

Refresh token is used to generate a new access token through:

```txt
PUT /authentications
```

Logout is handled through:

```txt
DELETE /authentications
```

The logout endpoint is protected and requires a valid Bearer Token.

## API Endpoints

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users` | No | Register a new user |
| GET | `/users/:id` | No | Get user profile by ID |

### Authentications

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/authentications` | No | Login |
| PUT | `/authentications` | No | Refresh access token |
| DELETE | `/authentications` | Yes | Logout |

### Profile

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/profile` | Yes | Get logged-in user profile |
| GET | `/profile/applications` | Yes | Get logged-in user applications |
| GET | `/profile/bookmarks` | Yes | Get logged-in user bookmarks |

### Companies

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/companies` | No | Get all companies |
| GET | `/companies/:id` | No | Get company detail |
| POST | `/companies` | Yes | Create company |
| PUT | `/companies/:id` | Yes | Update company |
| DELETE | `/companies/:id` | Yes | Delete company |

### Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/categories` | No | Get all categories |
| GET | `/categories/:id` | No | Get category detail |
| POST | `/categories` | Yes | Create category |
| PUT | `/categories/:id` | Yes | Update category |
| DELETE | `/categories/:id` | Yes | Delete category |

### Jobs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/jobs` | No | Get all jobs |
| GET | `/jobs/:id` | No | Get job detail |
| GET | `/jobs/company/:companyId` | No | Get jobs by company |
| GET | `/jobs/category/:categoryId` | No | Get jobs by category |
| POST | `/jobs` | Yes | Create job |
| PUT | `/jobs/:id` | Yes | Update job |
| DELETE | `/jobs/:id` | Yes | Delete job |

Job search query parameters:

```txt
GET /jobs?title=backend
GET /jobs?company-name=digital
```

### Applications

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/applications` | Yes | Apply for a job |
| GET | `/applications` | Yes | Get all applications |
| GET | `/applications/:id` | Yes | Get application detail |
| GET | `/applications/user/:userId` | Yes | Get applications by user |
| GET | `/applications/job/:jobId` | Yes | Get applications by job |
| PUT | `/applications/:id` | Yes | Update application status |
| DELETE | `/applications/:id` | Yes | Delete application |

### Bookmarks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/jobs/:jobId/bookmark` | Yes | Create a bookmark for a job |
| GET | `/jobs/:jobId/bookmark/:id` | Yes | Get bookmark detail |
| DELETE | `/jobs/:jobId/bookmark` | Yes | Delete bookmark by user and job |
| GET | `/bookmarks` | Yes | Get all bookmarks for the logged-in user |

### Documents

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/documents` | No | Get all documents |
| GET | `/documents/:id` | No | Get document by ID |
| POST | `/documents` | Yes | Upload document |
| DELETE | `/documents/:id` | Yes | Delete document |

Document upload uses `multipart/form-data` with the field name:

```txt
document
```

## Database

This project uses PostgreSQL as the main database. Database structure is managed using `node-pg-migrate`.

Tables used in this project:

- users
- authentications
- companies
- categories
- jobs
- applications
- bookmarks
- documents

## Notes

The following files and folders are not included in the repository:

```txt
node_modules
.env
uploads
```

Use `.env.example` as a reference for environment configuration.# OpenJob RESTful API

OpenJob RESTful API is a backend application for an employee recruitment platform. This API manages users, companies, categories, jobs, applications, bookmarks, documents, and authentication using JWT.

This project is built with Express.js, PostgreSQL, and node-pg-migrate for database migration management.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- node-pg-migrate
- Joi
- JSON Web Token
- bcrypt
- multer
- dotenv

## Features

- User registration
- Login, refresh token, and logout
- JWT-based authentication
- Refresh token stored in the database
- Protected routes using Bearer Token
- Company CRUD
- Category CRUD
- Job CRUD
- Job application feature
- Job bookmark feature
- Document upload
- User profile
- Request validation using Joi
- Error handling middleware
- Database migration using node-pg-migrate

## Folder Structure

```txt
openjob-api-v1
├── migrations
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validators
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── node-pg-migrate.config.js
├── package.json
└── package-lock.json
```

## Installation

Clone this repository:

```bash
git clone https://github.com/nazwaauliap/openjob-api-v1.git
cd openjob-api-v1
```

Install dependencies:

```bash
npm install
```

Create a PostgreSQL database named:

```txt
openjob_api
```

Copy `.env.example` to `.env`, then configure the database and JWT secret keys.

Example `.env` configuration:

```env
HOST=localhost
PORT=3000

PGUSER=postgres
PGPASSWORD=your_postgres_password
PGDATABASE=openjob_api
PGHOST=localhost
PGPORT=5432

ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret
```

Run database migration:

```bash
npm run migrate:up
```

Run the server:

```bash
npm run start:dev
```

The server will run at:

```txt
http://localhost:3000
```

## Available Scripts

```json
{
  "start": "node src/server.js",
  "start:dev": "nodemon src/server.js",
  "migrate:create": "node-pg-migrate create",
  "migrate:up": "node-pg-migrate up",
  "migrate:down": "node-pg-migrate down"
}
```

## Environment Variables

| Variable | Description |
|---|---|
| HOST | Server host |
| PORT | Server port |
| PGUSER | PostgreSQL username |
| PGPASSWORD | PostgreSQL password |
| PGDATABASE | PostgreSQL database name |
| PGHOST | PostgreSQL host |
| PGPORT | PostgreSQL port |
| ACCESS_TOKEN_KEY | Secret key for access token |
| REFRESH_TOKEN_KEY | Secret key for refresh token |

## Authentication

Protected endpoints require the following header:

```txt
Authorization: Bearer <accessToken>
```

Access token and refresh token are generated from the login endpoint:

```txt
POST /authentications
```

Refresh token is used to generate a new access token through:

```txt
PUT /authentications
```

Logout is handled through:

```txt
DELETE /authentications
```

The logout endpoint is protected and requires a valid Bearer Token.

## API Endpoints

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users` | No | Register a new user |
| GET | `/users/:id` | No | Get user profile by ID |

### Authentications

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/authentications` | No | Login |
| PUT | `/authentications` | No | Refresh access token |
| DELETE | `/authentications` | Yes | Logout |

### Profile

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/profile` | Yes | Get logged-in user profile |
| GET | `/profile/applications` | Yes | Get logged-in user applications |
| GET | `/profile/bookmarks` | Yes | Get logged-in user bookmarks |

### Companies

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/companies` | No | Get all companies |
| GET | `/companies/:id` | No | Get company detail |
| POST | `/companies` | Yes | Create company |
| PUT | `/companies/:id` | Yes | Update company |
| DELETE | `/companies/:id` | Yes | Delete company |

### Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/categories` | No | Get all categories |
| GET | `/categories/:id` | No | Get category detail |
| POST | `/categories` | Yes | Create category |
| PUT | `/categories/:id` | Yes | Update category |
| DELETE | `/categories/:id` | Yes | Delete category |

### Jobs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/jobs` | No | Get all jobs |
| GET | `/jobs/:id` | No | Get job detail |
| GET | `/jobs/company/:companyId` | No | Get jobs by company |
| GET | `/jobs/category/:categoryId` | No | Get jobs by category |
| POST | `/jobs` | Yes | Create job |
| PUT | `/jobs/:id` | Yes | Update job |
| DELETE | `/jobs/:id` | Yes | Delete job |

Job search query parameters:

```txt
GET /jobs?title=backend
GET /jobs?company-name=digital
```

### Applications

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/applications` | Yes | Apply for a job |
| GET | `/applications` | Yes | Get all applications |
| GET | `/applications/:id` | Yes | Get application detail |
| GET | `/applications/user/:userId` | Yes | Get applications by user |
| GET | `/applications/job/:jobId` | Yes | Get applications by job |
| PUT | `/applications/:id` | Yes | Update application status |
| DELETE | `/applications/:id` | Yes | Delete application |

### Bookmarks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/jobs/:jobId/bookmark` | Yes | Create a bookmark for a job |
| GET | `/jobs/:jobId/bookmark/:id` | Yes | Get bookmark detail |
| DELETE | `/jobs/:jobId/bookmark` | Yes | Delete bookmark by user and job |
| GET | `/bookmarks` | Yes | Get all bookmarks for the logged-in user |

### Documents

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/documents` | No | Get all documents |
| GET | `/documents/:id` | No | Get document by ID |
| POST | `/documents` | Yes | Upload document |
| DELETE | `/documents/:id` | Yes | Delete document |

Document upload uses `multipart/form-data` with the field name:

```txt
document
```

## Database

This project uses PostgreSQL as the main database. Database structure is managed using `node-pg-migrate`.

Tables used in this project:

- users
- authentications
- companies
- categories
- jobs
- applications
- bookmarks
- documents

## Notes

The following files and folders are not included in the repository:

```txt
node_modules
.env
uploads
```

Use `.env.example` as a reference for environment configuration.
