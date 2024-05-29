# Stage 1: Build Angular application
FROM node:20 as build

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build Angular application
RUN ng build --configuration=production

# Stage 2: Setup production environment
FROM nginx:1.19-alpine

# Copy built Angular app from build stage
COPY --from=build /app/dist/angular-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
