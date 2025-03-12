# moviesSequelize

MoviesSequelize API
A RESTful API for managing movies with Sequelize ORM, Express, and TypeScript. This project provides basic CRUD operations for movie data, including movie names, descriptions, genres, and categories. It is designed to be easily extendable for additional features.

Table of Contents
Project Setup
Technologies Used
API Endpoints
Running the Project
Environment Variables
Database Setup
Contributing
License
Project Setup
Clone the Repository
First, clone the repository to your local machine:


git clone https://github.com/CarlosHdez02/moviesSequelize.git
cd moviesSequelize
Install Dependencies
Install the required dependencies using npm:


npm install
This will install both production and development dependencies.

Technologies Used
Node.js: JavaScript runtime for building the server.
Express: Web framework for handling HTTP requests and routing.
Sequelize: Promise-based Node.js ORM for SQL databases.
PostgreSQL: The SQL database used for storing movie data.
TypeScript: A superset of JavaScript for adding type safety to the application.
sequelize-typescript: TypeScript support for Sequelize ORM.
dotenv: For managing environment variables.
API Endpoints
The following are the key API endpoints available in the project:

Movies
GET /movies

Fetch all movies.
Response: A list of all movie records.
GET /movies/:id

Fetch a movie by its id.
Response: A single movie object.
POST /movies

Fetch with filetrs
Response:A list of filtered movies
http://localhost:3000/api/movies?category=Action&page=1&limit=1
Create a new movie.
Body:
json
{
  "movieName": "Inception",
  "description": "A mind-bending thriller",
  "genre": "Action",
  "category": ["Sci-Fi", "Thriller"]
}
PUT /movies/:id

Update an existing movie.
Body: Same as the POST request.
Response: The updated movie object.
DELETE /movies/:id

Delete a movie by its id.
Response: 204 status with nothing

Fetching categories
GET http://localhost:3000/api/categories
Response: A list of categories

POST http://localhost:3000/api/categories
body: {
      "name":"comedy"
}

PUT http://localhost:3000/api/categories/:id
body:{
    "name":"action"
}
Response: The updated category

DELETE http://localhost:3000/api/categories/:id

Response: 204 status with nothing

Running the Project
Local Development
To run the project locally in development mode, use the following command:


npm run dev
This will start the server and watch for changes in the src folder.


The production server will run on the configured port (default: 3000).

Environment Variables
You need to configure environment variables to connect to your database. Create a .env file at the root of your project and add the following:

DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=movies_database
DB_HOST=localhost
DB_PORT=5432
PORT=3000
Ensure that you replace your_db_user, your_db_password, and other placeholder values with actual values for your environment.

Database Setup
Make sure you have PostgreSQL installed and running on your local machine or remote server.

Run the migrations to create the necessary database tables:

npx sequelize-cli db:migrate
(Optional) To seed the database with some sample data:

npx sequelize-cli db:seed:all