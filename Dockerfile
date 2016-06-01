FROM node:argon

# Create the application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app
RUN rm -rf node_modules
RUN rm -rf public/img/uploads
RUN rm -rf public/tmp

# Install app dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

CMD [ "npm", "start" ]