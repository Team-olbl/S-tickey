# node:alpine will be our base image to create this image
FROM node:alpine
# Set the /app directory as working directory
USER root
WORKDIR /app
# Install ganache-cli globally
EXPOSE 8545
RUN npm install -g ganache-cli
# Set the default command for the image
CMD ["ganache-cli", "-h", "0.0.0.0", "-a", "30"]