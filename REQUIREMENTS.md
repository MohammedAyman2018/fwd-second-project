# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstname
- lastname
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## API Routes

#### Product

- index GET /products
- show GET /products/:id
- create POST /products

#### User

- index GET /users
- show GET /users/:id
- create POST /users
- authenticate POST /users/login/:id

#### Orders

- show GET /orders/:userId
- create POST /orders

## DB setup

1. **Download and install Postgres**
   https://www.postgresql.org/download/

2. **Create user**
   CREATE DATABASE frontstore;
   CREATE DATABASE frontstore_test;

3. **Grant all db privileges to user in both dbs**
   GRANT ALL PRIVILEGES ON DATABASE frontstore TO postgres;
   GRANT ALL PRIVILEGES ON DATABASE frontstore_test TO postgres;

4. **Database port**
   The default port for postgres (5432)

## DB Types

### users table

    id SERIAL PRIMARY KEY
    firstname VARCHAR(100)
    lastname VARCHAR(100)
    password VARCHAR

### products table

    name VARCHAR(100)
    price INTEGER
    id SERIAL PRIMARY KEY

### orders table

    id SERIAL PRIMARY KEY
    user_id INT
    status_of_order VARCHAR(20)

### order_products table

    id SERIAL PRIMARY KEY
    order_id INT
    product_id INT
    quantity INTEGER

## Server setup

1. **Download and Install nodejs**
   https://nodejs.org/en/

2. **Install yarn globaly**
   npm i yarn -g

3. **Install db-migrate globaly**
   npm i db-migrate -g

4. **Run application**
   yarn start
   Server will run on port 3000
