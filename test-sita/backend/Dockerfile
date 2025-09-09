FROM nikolaik/python-nodejs:latest

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# FIRST STEP - CSV PARSING
RUN cd csv2db && python main.py

# SECOND STEP - BUILD BACKEND
RUN npm install

# THIRD STEP - TURN THEM ON

CMD ["npm", "start"]

EXPOSE 3000