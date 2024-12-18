# To Run the Backend

# make sure the following is installed
* Docker desktop
* Python
* pip

# Run the docker Desktop

# To Run the Database
* move to conference folder
* docker compose build
* docker compose up -d

# Check python and pip are installed 
* python --version
* pip --version
* If not installed, install it


# To run the backend
* move inside the backend folder
* Run command "pip install -r requirements.txt"
* Run command "uvicorn main:app --reload --port 3014"
