FROM node:16.2.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Add source files to filesystem of container
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies (all modules listed in package.json)
RUN npm install

# Bundle app source
COPY . .

CMD ["node", "app.js"]