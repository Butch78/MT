# Master's Thesis Project

This repository contains the code for my Master's Thesis Project. The project is a FastAPI application that will allow users to upload files, it will then process the files and load the data into a PostgresDB, S3 and return the data to the user. The application is built using the FastAPI framework and uses SQLModel to create the database models. The application is built using a Dev Container which will allow the application to be run locally and in Github Codespaces.

Project Organization
------------

    ├── LICENSE
    ├── README.md          <- The top-level README for developers using this project.
    ├── assets             <- Images used in the README.md file
    |
    ├── .devcontainer               <- Folder for the devcontainer configuration files and Dockerfile & Docker Compose files
    │   ├── Dockerfile              <- Dockerfile for the devcontainer
    │   ├── devcontainer.json       <- Devcontainer configuration file
    │   └── docker-compose.yml      <- Docker Compose file for the devcontainer
    │
    ├── data
    │   ├── external       <- Data from third party sources.
    │   ├── interim        <- Intermediate data that has been transformed.
    │   ├── processed      <- The final, canonical data sets for modeling.
    │   └── raw            <- The original, immutable data dump.
    │
    ├── notebooks          <- Jupyter notebooks. 
    │
    ├── reports            <- Generated analysis as HTML, PDF, LaTeX, etc.
    │   └── figures        <- Generated graphics and figures to be used in reporting.
    |   └── template.tex   <- To compile the LaTeX document into a PDF report, ensure that the PDFs generated in "figures" are placed in the same directory as main .tex file. 
    │
    ├── app                <- Source code for use in this project.
    │   ├── __init__.py    <- Makes app a Python module
    |   ├── main.py        <- Main application file for FastAPI application
    │   ├── api            <- Configuration file for FastAPI application
    |   |   ├── api_v1
    |   |   |   ├── __init__.py     <- Makes api_v1 a Python module
    |   |   |   ├── upload.py       <- API endpoint for uploading data
    |   |   |   └── restaurants.py  <- API endpoint for restaurants an example endpoint if we wanted to extend the application    
    │   │   └── api.py              <- API endpoints for the application
    │   │
    │   ├── crud                        <- The CRUD (Create, Read, Update, Delete) operations folder for the application
    │   │   ├── base.py                 <- Base CRUD operations
    |   |   ├── __init__.py             <- Makes crud a Python module
    |   |   └── crud_restaurants.py     <- CRUD operations for restaurants an example object if we wanted to extend the application
    │   │
    │   ├── schema                      <- Folder for the SQLModel models for the application
    │   │   ├── restaurant.py           <- SQLModel model for restaurants an example object if we wanted to extend the application
    |   |   └── __init__.py             <- Makes schema a Python module
    |   |  
    │   │
    │   └── utils                                  <- Scripts to import data and create the database
    │       ├── config.py                          <- Configuration file for the application that loads the environment variables
    │       └── deps.py                            <- Dependency file for the application that creates the database connection
    │   
    ├── requirements.txt   <- The requirements file for reproducing the analysis environment, e.g.
    │                         generated with `pip freeze > requirements.txt`
    └── env.example        <- Environment variables for the application

--------


Using Dev Containers we were able to create a Docker container that will automatically install the requirements.txt file and create a PostgresDB instance. This will allow us to run the application locally and in Github Codespaces. You can learn more about Dev Containers here: <https://code.visualstudio.com/docs/remote/containers>

# Set Up Instructions

## Github Codespaces

If you are running the application in Github Codespaces it should Automatically build the application and install the ```requirements.txt``` file. if not run the following command in the terminal:

```bash
pip install -r requirements.txt
```

## Local Machine

1. Ensure you have Docker installed on your local machine, if not follow the instructions here: <https://docs.docker.com/get-docker/>

2. Clone the repository to your local machine
   ```git clone https://github.com/Butch78/Bank-Size-Central-Bank-Sensitivity.git```

3. After you open the project, the following pop-up should appear. Click "Reopen in Container"

![Alt text](assets/dev_containter_popup.png)

If not click the green button in the bottom left corner and then select "Reopen in Container"

This will build the Docker container and install the requirements.txt file automatically along with creating a PostgresDB instance.

# Start Application Command

rename the ```.env.example``` file to ```.env```

Then the following command will load the Data into the PostgresDB and start a FastAPI application on port 8000, You can view the API documentation at <http://localhost:8000/docs>

```bash
uvicorn app.main:app --reload
```
