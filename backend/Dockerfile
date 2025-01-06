# Use Python 3.9 Slim base image
FROM python:3.9-slim

WORKDIR /app

# Copy only requirements.txt first for caching
COPY requirements.txt .

# Create virtual environment and install dependencies
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set the virtual environment path
ENV PATH="/opt/venv/bin:$PATH"

# Expose the port the app runs on
EXPOSE 3014

# Set the default command to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3014"]

# docker build -t prashanthshivanna/conference-be:03012025 .
# docker push prashanthshivanna/conference-be:03012025

#To Run locally on the development server
# docker run -d --name="conference-backend" -p="3014:3014" -e "POSTGRES_USER=k3sadm" -e "POSTGRES_PASSWORD=jss1234" -e "POSTGRES_HOST=host.docker.internal" -e "POSTGRES_PORT=5432" -e "POSTGRES_DB=conference" -e "EMAIL_ID=scientificcommittee@jssish.in" -e "EMAIL_PASSWORD=jssishmys" prashanthshivanna/conference-be:03012025

# TO run on the server
# docker run -d --name=conference-backend -p="3014:3014" -e "POSTGRES_USER=k3sadm" -e "POSTGRES_PASSWORD=jss1234" -e "POSTGRES_HOST=database" -e "POSTGRES_PORT=5432" -e "POSTGRES_DB=conference" -e "VIRTUAL_HOST=conference-be.jssish.com" -e "VIRTUAL_PORT=3014" -e "LETSENCRYPT_HOST=conference-be.jssish.com" --restart unless-stopped prashanthshivanna/conference-be:03012025
# docker network connect jssish-network conference-backed

# This will not run because including network in the command will restrict the access to the container to the outside world
# docker run -d --name=conference-backend --network jssish-network -p="3014:3014" -e "POSTGRES_USER=k3sadm" -e "POSTGRES_PASSWORD=jss1234" -e "POSTGRES_HOST=database" -e "POSTGRES_PORT=5432" -e "POSTGRES_DB=conference" -e "EMAIL_ID=scientificcommittee@jssish.in" -e "EMAIL_PASSWORD=jssishmys"  -e "VIRTUAL_HOST=conference-be.jssish.com" -e "VIRTUAL_PORT=3014" -e "LETSENCRYPT_HOST=conference-be.jssish.com" --restart unless-stopped prashanthshivanna/conference-be:03012025




