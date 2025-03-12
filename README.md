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

bash
Copy
Edit
git clone https://github.com/CarlosHdez02/moviesSequelize.git
cd moviesSequelize
Install Dependencies
Install the required dependencies using npm:

bash
Copy
Edit
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

Create a new movie.
Body:
json
Copy
Edit
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
Response: Success message if deleted.
Running the Project
Local Development
To run the project locally in development mode, use the following command:

bash
Copy
Edit
npm run dev
This will start the server and watch for changes in the src folder.

Production Build
To create a production build and run the server:

Compile TypeScript files:

bash
Copy
Edit
npm run build
Start the server with:

bash
Copy
Edit
npm start
The production server will run on the configured port (default: 3000).

Environment Variables
You need to configure environment variables to connect to your database. Create a .env file at the root of your project and add the following:

ini
Copy
Edit
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

bash
Copy
Edit
npx sequelize-cli db:migrate
(Optional) To seed the database with some sample data:

bash
Copy
Edit
npx sequelize-cli db:seed:all