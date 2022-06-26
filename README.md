# Storefront Backend API

## Getting Started

This repo contains a simple storefront backend RESTful API which has endpoints for products, users and orders.  
For requirements, database schema data shapes and endpoints mapping: refer to [REQUIREMENTS](REQUIREMENTS.md)

## Used Technologies
This application uses the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- bcrypt from npm for encrypting users passwords
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## How to setup

### 1. Get a local copy of this repo
### 2. Open application directory in terminal and install all application dependencies
- "bcrypt": "^4.0.0",
- "body-parser": "^1.19.0",
- "cors": "^2.8.5",
- "db-migrate": "^0.11.12",
- "db-migrate-pg": "^1.2.2",
- "dotenv": "^8.2.0",
- "express": "^4.17.1",
- "jsonwebtoken": "^8.5.1",
- "node": "^12.22.12",
- "pg": "^8.5.1"

by using this command:  
`npm i bcrypt@4.0.0 body-parser@1.19.0 cors@2.8.5 db-migrate@0.11.12 db-migrate-pg@1.2.2 dotenv@8.2.0 express@4.17.1 jsonwebtoken@8.5.1 node@12.22.12 pg@8.5.1`  

**Note**: I have faced a lot of compatibility issues between Node and Postgres. So I recommend using the very specific packages versions mentioned above, otherwise the application is not guaranteed to work.

### 3. Install dev dependencies for testing using jasmine/supertest
Like production dependencies, install these libraries adding --save-dev before library name (e.g., `npm i --save-dev @types/bcrypt@5.0.0`)  
- "@types/bcrypt": "^5.0.0",  
- "@types/cors": "^2.8.10",  
- "@types/db-migrate-pg": "^0.0.10",  
- "@types/dotenv": "^8.2.0",  
- "@types/express": "^4.17.9",  
- "@types/jasmine": "^4.0.3",  
- "@types/jsonwebtoken": "^8.5.0",  
- "@types/node": "^14.14.28",  
- "@types/pg": "^7.14.9",  
- "@types/supertest": "^2.0.12",  
- "@types/tsc-watch": "^4.2.0",  
- "@typescript-eslint/eslint-plugin": "^5.29.0",  
- "@typescript-eslint/parser": "^5.29.0",  
- "cross-env": "^6.0.3",  
- "eslint": "^8.18.0",  
- "eslint-config-prettier": "^8.5.0",  
- "eslint-config-standard": "^17.0.0",  
- "eslint-plugin-import": "^2.26.0",  
- "eslint-plugin-n": "^15.2.3",  
- "eslint-plugin-prettier": "^4.0.0",  
- "eslint-plugin-promise": "^6.0.0",  
- "jasmine": "^4.2.1",  
- "jasmine-spec-reporter": "^7.0.0",  
- "prettier": "^2.7.1",  
- "supertest": "^6.2.3",  
- "ts-node": "^9.1.1",  
- "tsc-watch": "^4.2.9",  
- "typescript": "^4.1.3"  

### 4. Create psql production database called *store* and another one for testing called *store_test*
- create user using this command:  
`create user a13r1 with password 'mcgyver20#F';`  
- create production database using this command:  
`create database store;`  
- create test database using this command:  
`create database store_test;`  
- grant all privileges to user using these commands:  
`grant all privileges on database store to a13r1;`  
`grant all privileges on database store_test to a13r1;`  

### 5. Add `.env` file that should look like the following:
```
POSTGRES_USER=a13r1  
POSTGRES_HOST=localhost  
POSTGRES_DB=store  
POSTGRES_TEST_DB=store_test  
POSTGRES_PASSWORD=mcgyver20#F  
POSTGRES_PORT=5432  
BCRYPT_PASSWORD=password123  
SALT_ROUNDS=10  
TOKEN_SECRET=token123  
ENV=production  
```
### 6. Modify `database.json` to contain your psql username and password
```
{
    "production": {
      "driver": "pg",
      "host": "localhost",
      "database": "store",
      "user": "a13r1",
      "password": "mcgyver20#F"
    },
    "test": {
      "driver": "pg",
      "host": "localhost",
      "database": "store_test",
      "user": "a13r1",
      "password": "mcgyver20#F"
    }
}
```
### 7. Backend runs on port: 3000, Database runs on port: 5432

### 8. For doing db migrations separately use these commands:  
For production:  
`db-migrate --env production up`  
`db-migrate --env production down --count 3`  
For testing:  
`db-migrate --env test up`  
`db-migrate --env test down --count 3`  


## How to run
After you setup the project correctly, open the project directory in terminal and simply enter `npm run start`  
this script will take care of compiling typescript files, migrate database tables, and running compiled javascript server

## How to run jasmine/supertest test suites
Open the project directory in terminal and simply enter `npm run test`  
this script will take care of compiling typescript files, changing environment variable ENV in `.env` file to *test*, migrate database tables, and running jasmine/supertest test suites

## How to test the API endpoints
I used Postman to test the endpoints as follows:

### Users endpoints
### 1. create a user
This requires a json object  
use POST method with `http://localhost:3000/users` endpoint to create a user  
provide new user information as a JSON object in the *body*  

![create a user in postman](postman/create_user.png)  

this will return a jwt that you can use for authorization  

![jwt in postman](postman/create_user_jwt.png)  

**Note**: you can visit [jwt.io](https://jwt.io/#debugger-io) to verify the jwt  

### 2. index all users
This requires authorization  
use GET method with `http://localhost:3000/users` endpoint to index all users  
add `Authorization` KEY to *Headers* with VALUE = '`Bearer <jwt>`' where jwt is a token returned by creating a user in step 1

![index users in postman](postman/index_users.png)  

this will return an array of all users in database  

### 3. show one user
This requires authorization  
use GET method with `http://localhost:3000/users/:id` endpoint to show a user with id provided  
add `Authorization` KEY to *Headers* with VALUE = '`Bearer <jwt>`' where jwt is a token returned by creating a user in step 1

![show a user in postman](postman/show_user.png)  

this will return a json object of the user in database  


### Products endpoints
### 1. create a product
This requires a json object and authorization   
use POST method with `http://localhost:3000/products` endpoint to create a product  
provide new product information as a JSON object in the *body*  
add `Authorization` KEY to *Headers* with VALUE = '`Bearer <jwt>`' where jwt is a token returned by creating a user  

![create a product in postman](postman/create_product.png)  

this will return the created product from database   

### 2. index all products
This requires nothing  
use GET method with `http://localhost:3000/products` endpoint to index all products  

![index products in postman](postman/index_products.png)  

this will return an array of all products in database  

### 3. show one product
This requires nothing   
use GET method with `http://localhost:3000/products/:id` endpoint to show a product with id provided  

![show a product in postman](postman/show_product.png)  

this will return a json object of the product in database  

### Orders endpoints
### 1. index current/active orders for a user
This requires authorization   
use GET method with `http://localhost:3000/users/:id/orders/active` endpoint to index all active orders for user with id provided  
add `Authorization` KEY to *Headers* with VALUE = '`Bearer <jwt>`' where jwt is a token returned by creating a user  

![index current orders for a user in postman](postman/index_current_orders_for_user.png)  

this will return the current orders for the user from database (always an empty array as creating orders is not currently supported in this version)  
