# Stage 1: Build React App
FROM node:16 AS build

WORKDIR /app

# Install dependencies first, using Docker cache if package files haven't changed
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code and build the project
COPY . .
RUN npm run build

# Stage 2: Serve with a lightweight web server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
