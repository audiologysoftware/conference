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
