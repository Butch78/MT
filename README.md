# Master's Thesis Project

This repository contains the code for my Master's Thesis Project. The project is a FastAPI application that allows users to upload files, processes the files, and loads the data into a PostgresDB and S3. The application is built using the FastAPI framework and utilizes SQLModel to create the database models. It is designed to be run locally and in Github Codespaces using Dev Containers.

## Project Organization

I used the Microsoft devcontainer FastAPI & NodeJS + Typescript template for this project. You can read more about it (here)[https://code.visualstudio.com/remote/advancedcontainers/connect-multiple-containers]. The template is organized as follows:

## Setup Instructions

### Github Codespaces

If you are running the application in Github Codespaces, it will automatically build the application and install the `requirements.txt` file. If not, run the following command in the terminal:

```bash
pip install -r requirements.txt
```

### Local Machine

1. Ensure you have Docker installed on your local machine. If not, follow the instructions here: [Docker Documentation](https://docs.docker.com/get-docker/).

2. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Butch78/Bank-Size-Central-Bank-Sensitivity.git
   ```

3. After opening the project, a pop-up should appear. Click "Reopen in Container". If the pop-up doesn't appear, click the green button in the bottom left corner and select "Reopen in Container". This will build the Docker container, install the `requirements.txt` file, and create a PostgresDB instance.

## Starting the Application

To load the data into the PostgresDB and start the FastAPI application on port 8000, run the following command:

```bash
uvicorn app.main:app --reload
```

You can view the API documentation at [http://localhost:8000/docs](http://localhost:8000/docs).

## Recommended IDE Setup

For the best development experience, it is recommended to use the following IDE setup:

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## Customize Configuration

For customizing the application configuration, refer to the [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Commands

- `npm install`: Install project dependencies.
- `npm run dev`: Compile and hot-reload for development.
- `npm run build`: Type-check, compile, and minify for production.
- `npm run test:unit`: Run unit tests with Vitest.
- `npm run lint`: Lint with ESLint.
- `docker buildx build . -t vitesse:latest`: Docker production build.

For more details, refer to the project's documentation.
