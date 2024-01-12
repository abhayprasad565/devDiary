# devDiary - MERN Stack Project

## Overview
devDiary - blogging , article sharing website for geeks and every other community , made with ❤️ by Abhay Kumar Prasad
This project is a full-stack web application built with the MERN (MongoDB, Express.js, React, Node.js) stack. It utilizes MongoDB as the database, Passport.js with JWT for authentication, and is deployed with the frontend hosted on Netlify and the backend on Render. The database is hosted on MongoDB Atlas. Cross-Origin Resource Sharing (CORS) is configured with defined allowed origins to facilitate communication between the frontend and backend.

## Project Structure

### Backend

The backend is built with Node.js and Express.js. and authentication is done using passport and jwt, where as database connection is handled by mongoose and schema validation using JOI,
It has three main routes:

1. **User Route**: Handles user-related operations such as user registration and retrieval.
   - Endpoint: `/devDiary/users`

2. **Authentication Route**: Manages user authentication using Passport.js with JWT (JSON Web Tokens).
   - Endpoint: `/devDiary/auth`

3. **Posts Route**: Manages operations related to posts.
   - Endpoint: `/devDiary/posts`

### Frontend

The frontend is built with React and tailwind and uses Context Api for props and  is hosted on Netlify. It communicates with the backend using the defined CORS configuration.

### Database
I have used MongoDB as a database and mongoose as my node.js database connection where the server database is hosted as a free instance on MONGOATLAS.
Three Schemas are predominatly defined which are Posts , Users ad Sessions. 
 More on the schemas on the backend readme

## Technologies Used

- **Frontend:**
  - React
  - Tailwind
  - HTML
  - JS
  - Netlify

- **Backend:**
  - Node.js
  - Express.js
  - Passport.js
  - Data testing and population using Faker js
  - JWT (JSON Web Tokens)
  - MongoDB Atlas

## Setup

1. **Backend Setup:**
   - Clone the repository.
   - Navigate to the `backend` directory.
   - Install dependencies using `npm install`.
   - Set up a MongoDB Atlas database and configure the connection string in the `.env` file.
   - Run the server using `node index.js`.

2. **Frontend Setup:**
   - Navigate to the `frontend` directory.
   - Install dependencies using `npm install`.
   - Update the backend API URL in the `config.js` file.
   - Run the development server using `npm run dev`.

## CORS Configuration

CORS is configured to allow specific origins for communication between the frontend and backend. The allowed origins are defined in the backend.

```javascript
// backend/server.js

const corsOptions = {
  origin: ['Your url'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
```

Make sure to replace `'Your url'` with the actual URL of your hosted frontend.

## ENV
Ensure you have a .env file in the project root with the following variables:
### Environment Variables
```plaintext
PORT=8080

# MongoDB Atlas Database
DB_CONNECTION_STRING="your_mongodb_atlas_connection_string"
MONGODB_PASS="your_mongodb_password"

# Authentication Secrets
SESSION_SECRETS="your_session_secrets"

# CORS Configuration
ALLOWED_ORIGINS="your origin"
```

## Deployment

- **Frontend:**
  - The frontend is automatically deployed to Netlify on pushes to the main branch using github.

- **Backend:**
  - The backend is hosted on Render with github, with environment variables set up for MongoDB Atlas connection.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests.
Also please give a star id you liked 

Happy coding!

## Connect with Me 🌐

- Instagram: [abhayprasad565](https://www.instagram.com/abhayprasad565/)
- LinkedIn: [abhayprasad565](https://www.linkedin.com/in/abhayprasad565/)
