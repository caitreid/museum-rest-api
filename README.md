# Museum Objects API

Express Mongoose Fullstack App.

Inspired by the Open Access API at The Metropolitan Museum of Art

## Goal

Full CRUD API for a single resource

## MVP

- have one model with at least three properties
- models properties must use more than one data type(String, Number, Boolean, Date etc.)
- have a controller allowing for full CRUD functionality.
  - This includes the following routes
  - index route to view all instances of the resource
  - show route to view one single instance of the resource
  - post route to create an instance of the resource
  - patch route to update one instance of the resource
  - delete route to destroy one instance of the resource
- You must send the response as JSON(this will come into play later) as well as with an appropriate status code

## RESTful Routes

Routes
Your app should use RESTful routes:

| **URL** | **HTTP Verb** |  **Action**|
|------------|-------------|------------|
| /objects/         | GET       | index  
| /objects/new         | GET       | new   
| /objects          | POST      | create   
| /objects/:id      | GET       | show       
| /objects/:id/edit | GET       | edit       
| /objects/:id      | PATCH/PUT | update    
| /objects/:id      | DELETE    | destroy  

## Installation

Clone this repo and run `npm install` in your terminal, followed by `nodemon server.js`.

### Index Route
http://localhost:3000/objects

### Show Route
http://localhost:3000/objects/63c760ae0d4a02bf85a074d1

### Post Route