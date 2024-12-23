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


#   docker build . -t yesyesprashanth/conference:21122024
# docker run --name="conference" -p="3013:3013" yesyesprashanth/conference:21122024
