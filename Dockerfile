# FROM postgres

# RUN apk update
# RUN apk add bash

# CMD ["sh", "-c", "yarn dev"]

FROM node:14-alpine 

WORKDIR /app

RUN apk update
RUN apk add bash

ENV PORT=8080

EXPOSE 8080

CMD ["sh", "-c", "yarn dev"]