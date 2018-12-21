FROM node:10.13-alpine

RUN npm i -g nodemon

WORKDIR /app


# CMD ["npm","start"]