FROM node:21-alpine

WORKDIR /app


RUN apk update
RUN apk add bash

EXPOSE 8080

CMD ["sh", "-c", "yarn dev"]