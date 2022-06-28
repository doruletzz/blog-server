FROM node:16

# Create app directory
WORKDIR /src/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

EXPOSE 4000
CMD [ "sh", "wait.sh" ]