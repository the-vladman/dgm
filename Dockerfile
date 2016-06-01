FROM node:argon

# Create the application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app
ADD commands/start.sh  /usr/src/app/start.sh
RUN rm config/db.js
RUN rm -rf node_modules
RUN rm -rf public/img/uploads
RUN rm -rf public/tmp
RUN chmod +x /usr/src/app/start.sh
RUN chmod +x /usr/src/app/commands/replace_env.sh

# Install app dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

CMD [ "bash", "-c", "/usr/src/app/start.sh;bash" ]