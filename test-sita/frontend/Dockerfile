FROM node:14.17.5

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# SECOND STEP - BUILD BACKEND
RUN npm install

# THIRD STEP - TURN THEM ON

CMD ["npm", "start"]

EXPOSE 3000
EXPOSE 3001