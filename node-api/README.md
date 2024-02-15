
---

# Environment Variables Setup

## `.env` File

1. Make sure you have cloned this repository to your local machine.

2. Navigate to the root directory of the project.

3. Create a new file named `.env` in the root directory.

4. Open the `.env` file using a text editor of your choice.

5. Copy the contents below and paste them into the `.env` file:

```
# .env

# JWT Secret for securing user authentication
JWT_SECRET=your_jwt_secret_here

# MongoDB URLs for Development and Production environments
MONGODB_DEV_URI=replace_with_your_dev_mongodb_url
MONGODB_PROD_URI=replace_with_your_production_mongodb_url

# Node.js environment (development or production)
NODE_ENV='prod'/'dev'
```

6. Replace the placeholders:
   - `your_jwt_secret_here` with your desired JWT secret for user authentication.
   - `mongodb://localhost:27017/dev_database` with the MongoDB URL for the development environment.
   - `replace_with_your_production_mongodb_url` with the MongoDB URL for the production environment.

7. Save the `.env` file.

## Environment Variables Usage

The application utilizes the environment variables in the following manner:

- **JWT Secret:** The `JWT_SECRET` environment variable is used to secure user authentication and generate JSON Web Tokens for user sessions.

- **MongoDB URLs:** The application uses different MongoDB URLs for the development and production environments. The `MONGODB_DEV_URI` is used when running the application in the development environment, and the `MONGODB_PROD_URI` is used for the production environment.

- **Node.js Environment:** The `NODE_ENV` environment variable determines the execution environment of the Node.js application. When `NODE_ENV` is set to `dev`, the application connects to the MongoDB using the `MONGODB_DEV_URI`. When `NODE_ENV` is set to `prod`, it connects to the MongoDB using `MONGODB_PROD_URI`.

The BASE_URL environment variable is used in the helper.js file to set the base URL for making API requests. If working locally, set the BASE_URL to your local API URL. If connecting to the deployed code, leave BASE_URL empty, as it will then use the root domain of the deployed application.

---
