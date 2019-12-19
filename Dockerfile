FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
CMD tail -f /dev/null
