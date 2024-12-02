#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Removing current docker image"
docker rmi -f jimuel30/spotify-ui:v1.0.0
docker rmi -f spotify-ui:latest

# Build the Docker image
echo "Building Docker image..."
docker build -t spotify-ui .

# Tag the Docker image
echo "Tagging Docker image..."
docker tag spotify-ui jimuel30/spotify-ui:v1.0.0

# Push the Docker image to the repository
echo "Pushing Docker image..."
docker push jimuel30/spotify-ui:v1.0.0

echo "Docker image build and push completed successfully."