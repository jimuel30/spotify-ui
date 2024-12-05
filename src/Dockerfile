## Use a specific version of Node.js
#FROM node:18.15.0-alpine
#
## Set the working directory
#WORKDIR /usr/src/app
#
## Copy package.json and package-lock.json if available
#COPY package*.json ./
#
## Install the specific version of Angular CLI
#RUN npm install -g @angular/cli@17.3.8
#
## Install project dependencies
#RUN npm install
#
## Copy the rest of your application code
#COPY . .
#
## Expose the port Angular serves on
#EXPOSE 4200
#
## Start the Angular application
#CMD ["ng", "serve", "--host", "0.0.0.0"]

# Use a specific version of Node.js
FROM node:18.15.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install the specific version of Angular CLI
RUN npm install -g @angular/cli@17.3.8

# Install project dependencies
RUN npm install

# Copy the rest of your application code
COPY .. .

# Copy the docker-entrypoint.sh script
COPY ../docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose the port Angular serves on
EXPOSE 4200

# Set the entry point to run the script
ENTRYPOINT ["/docker-entrypoint.sh"]

# Start the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0"]
