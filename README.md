# Squawk Rack - Share and Review Resistance Workouts

Find your next pull day workout, or post a killer squat session for others to enjoy.  Squawk Rack provides a platform for weight training enthusiasts to share ideas.  Users can create workouts and explore those made by others.  Favorite and review so everyone can see which workouts stand out from the pack.

## Setup

This repo is currently deployed [at this address](https://squawk-uqc5.onrender.com/) using Render.  You are welcome to fork, clone, and modify it for any purpose.  In order to run it on your own local machine, you'll need to cd to the project directory and run a few commands in the terminal:
```bash
pipenv install
```
```bash
pipenv shell
```

From there, cd into the server directory and find the config.py file.  Look for the following lines of code, somewhere around line 26:

TODO: add code image

Uncomment the commented line that specifies 'sqlite:///app.db' as teh database and comment out the one that looks in the OS environment for it.  This will allow you to work with a local db rather than wherever you choose to host your Postgresql db in the event that you deploy.

Stay in the server directory and run:

```bash
flask db init
```
```bash
flask db migrate -m'create tables'
```
```bash
flask db upgrade
```
```bash
python seed.py
```
```bash
python app.py
```
From there, open a new terminal in the main directory and run:
```bash
npm install --prefix client
```
You should see a working version of Squawk Rack runnin on your machine!

## Usage

TODO: new gif for this app![](https://github.com/apatari/phase-2-Project-disc-bag/blob/main/BagGif.gif)

Start by creating a username and password.  From there you can browse the catalog of existing workouts, create your own, then favorite and review whichever workouts you choose.  All of these actions are persisted in the database.  If things ever get too messy in the database you can always re-seed to start again.  Note that this will erase all user data including usernames and passwords with the exception of the seeded users.

## Acknowledgment

This project was built with [Create React App](https://github.com/facebook/create-react-app) and [SQLAlchemy](https://www.sqlalchemy.org/) and uses [Bootstrap React](https://react-bootstrap.netlify.app/) and [Bootswatch](https://bootswatch.com/) for styling.  Thank you to the folks who created and maintain those resources.