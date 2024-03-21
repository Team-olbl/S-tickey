FROM node:lts-alpine as build-stage
# hompage -> app
WORKDIR /app

USER root

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage ./app/dist /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]