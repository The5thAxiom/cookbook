# Samys-Cookbook

Making a simple app using React and Flask.

# How To Run Locally (For Development)

-   setup database
-   setup environment variables
-   build the frontend
-   run the server
-   makefile

## Database Setup

-   Setup a mysql server (I use XAMPP for development)
-   Create a database
-   Run a python shell and run the following commands:
    -   `import app.py`
    -   `db.create_all()`
-   Now, the database should be populated with tables

## Environment Variables Required

| variable name  | prod or dev | required value |
| :------------: | :---------: | :------------: |
|   FLASK_ENV    |     dev     |  development   |
| JWT_SECRET_KEY |    both     |       -        |
| MYSQL_PASSWORD |    both     |       -        |
| MYSQL_USERNAME |    both     |       -        |
|  MYSQL_SERVER  |    both     |       -        |
|    MYSQL_DB    |    both     |       -        |

-   The mysql credentials should match the db created in the previous step

## Build the frontend

-   Go into the 'frontend' folder and run the command `npm run build`.

## Run the Server

-   In the root folder of the project, run the command `flask run`.
-   This should start a development server.

## React Development Server

-   The flask server runs at `localhost:5000`. If you build the frontend, flask will serve the build at `localhost:5000/`.
-   If you are editing the frontend and want to see the changes updated automatically, run `npm start` in the 'frontend' folder.
-   This will create a react development server running at `localhost:3000`.
-   This will be rerun at every save in a react file, so you can develop easily.

## Makefile

