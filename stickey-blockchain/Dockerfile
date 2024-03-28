# node:alpine will be our base image to create this image
FROM node:alpine as build-stage
# Set the /app directory as working directory
WORKDIR /app

USER root
# Install ganache-cli globally
RUN npm install -g ganache-cli
# Set the default command for the image
CMD ["ganache-cli", "-h", "0.0.0.0"]