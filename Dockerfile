FROM node:12 AS build
WORKDIR /app
RUN yarn

FROM node:12
WORKDIR /app
CMD ["yarn", "start"]