# Restaurant API

[![Build Status](https://img.shields.io/github/actions/workflow/status/[your-username]/RestaurantAPI/ci.yml?branch=main&style=flat-square)](https://github.com/[your-username]/RestaurantAPI/actions)
[![Coverage Status](https://img.shields.io/coveralls/github/[your-username]/RestaurantAPI.svg?style=flat-square)](https://coveralls.io/github/[your-username]/RestaurantAPI?branch=main)
[![Version](https://img.shields.io/github/v/release/[your-username]/RestaurantAPI.svg?style=flat-square)](https://github.com/[your-username]/RestaurantAPI/releases)
[![License](https://img.shields.io/github/license/[your-username]/RestaurantAPI.svg?style=flat-square)](LICENSE)

> A RESTful API for managing restaurant data, including menus, orders, and reservations.

This project was created as a learning resource for anyone interested in building a RESTful API with Node.js. It demonstrates common practices for creating a backend service, including routing, middleware, database integration, and user authentication.

While functional, the primary goal of this API is educational. It provides a complete backend service for a restaurant application, allowing for creating, reading, updating, and deleting (CRUD) information about menu items, customer orders, and reservations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Seeding the Database](#seeding-the-database)


## Installation

Follow these instructions to get the project set up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your system:

```bash
# Node.js (v18.x or later recommended)
# npm (comes with Node.js)
# A database, e.g., MongoDB or PostgreSQL
# Hosting platform: Supabase
```

### Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/[your-username]/RestaurantAPI.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd RestaurantAPI
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Set up your environment variables. Create a `.env` file in the root of the project and add your configuration details:
    ```.env
    PORT=3000
    DATABASE_URL="your_database_connection_string"
    JWT_SECRET="your_jwt_secret_key"
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```
The API should now be running on `http://localhost:3000`.

## Usage

You can interact with the API using any HTTP client like `curl`, Postman, or by integrating it with a front-end application.

### Example: Get all menu items

Here is an example of how to fetch all menu items using `curl`:

```bash
curl -X GET http://localhost:3000/api/menu
```
