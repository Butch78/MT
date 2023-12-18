```
├── .devcontainer                         <- Folder for the devcontainer configuration files and Dockerfile & Docker Compose files
|       ├── node-container                <- Folder for the NodeJS + Typescript devcontainer configuration files and Dockerfile & Docker Compose files
│       |    └─── .devcontainer.json      <- Devcontainer configuration file for the NodeJS + Typescript devcontainer
│       └─── python-container             <- Dockerfile for the devcontainer
|            └─── .devcontainer.json      <- Devcontainer configuration file for the Python devcontainer
│
├── data                        <- Data directory
│   ├── external                <- Data from third-party sources
│   ├── interim                 <- Intermediate transformed data
│   ├── processed               <- Final, canonical data sets for modeling
│   └── raw                     <- Original, immutable data dump
│
├── notebooks                   <- Jupyter notebooks
│
├── reports                     <- Generated analysis as HTML, PDF, LaTeX, etc.
│   └── figures                 <- Generated graphics and figures for reporting

├── node-src                    <- Source code for the NodeJS application
│   ├── public                  <- Static files for the application
│
├── python-src                  <- Source code for the python application
│   ├── __init__.py             <- Makes app a Python module
│   ├── main.py                 <- Main application file for FastAPI
│   ├── api                     <- Configuration file for FastAPI
│   │   ├── api_v1              <- API version 1
│   │   │   ├── __init__.py     <- Makes api_v1 a Python module
│   │   │   ├── upload.py       <- API endpoint for uploading data
│   │   │   └── restaurants.py  <- Example API endpoint for restaurants (if extending the application)
│   │   └── api.py              <- API endpoints for the application
│   │
│   ├── crud                    <- CRUD (Create, Read, Update, Delete) operations folder
|   |   ├── __init__.py         <- Makes crud a Python module
│   │   ├── base.py             <- Base CRUD operations
│   │   └── crud_restaurants.py <- CRUD operations for restaurants (if extending the application)
│   │
│   ├── schema                  <- SQLModel models for the application
│   │   ├── __init__.py         <- Makes schema a Python module
│   │   ├── deck.py             <- SQLModel model for decks
│   │   └── card.py             <- SQLModel model for cards
│   │
│   ├─── utils                   <- Scripts for importing data and creating the database
│   |    ├── config.py           <- Configuration file for the application that loads environment variables
│   |    └── deps.py             <- Dependency file for the application that creates the database connection
│   |
|   └─── requirements.txt            <- Requirements file for reproducing the analysis environment
|
├── env.example                 <- Environment variables for the application
└── docker-compose.yml          <- Docker Compose file for the Project
```