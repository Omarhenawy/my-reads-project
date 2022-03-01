FROM node:alpine3.14 as build
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/
RUN yarn install


COPY . /app/
RUN npm run buildImage

FROM nginx:alpine
COPY --from=build /app/build  /usr/share/nginx/html
