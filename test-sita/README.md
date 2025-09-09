# SOFIFA'S DB VISUALIZER

## Introduction

This entire project was made using primarily _Express_, _SQLite_ and _React_, while the parsing of the CSV was done via _Python_. Even though the original README specifies 3 main steps, this repository is split into _two_ main folders: **Frontend** (website) and **Backend** (API and CSV parser).

## Requirements

- **Node** and **Python**
- Or **Docker**

## How to run

There are two possible ways to run it: Manually setting up the commands in your own machine, or using Docker.

### Manually, in your terminal of choice

```
# First step - Parse the CSV
cd ./backend/csv2db
python main.py

# Second step - Turn on the server
cd ../
npm install
npm start

# Third step - Turn on the frontend (requires another instance of a terminal)
cd ./frontend
npm install
npm start

DONE! - You can access http://localhost:3001/ to see the project
```
