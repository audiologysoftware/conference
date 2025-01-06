# Build Stage
FROM node:18-slim AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy application files
COPY . .

# Production Image
FROM node:18-alpine
WORKDIR /app

# Copy dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY --from=builder /app .

# Expose the application port
EXPOSE 3013

# Run the application
CMD ["npm", "start"]


# docker build . -t prashanthshivanna/conference:03012025
# docker run --name conference -e "REACT_APP_BASE_URL=https://conference-be.jssish.com/api/v1" "REACT_APP_LOGGING_LEVEL=DEBUG" -p "3013:3013" prashanthshivanna/conference:03012025# 
# docker push prashanthshivanna/conference:03012025
# docker run  -d --name conference -e="REACT_APP_BASE_URL=https://conference-be.jssish.com/api/v1" -e "REACT_APP_LOGGING_LEVEL=DEBUG" -e "VIRTUAL_HOST=conference.jssish.com" -e "VIRTUAL_PORT=3013" -e "LETSENCRYPT_HOST=conference.jssish.com" -p 3013:3013 --restart unless-stopped prashanthshivanna/conference:03012025
