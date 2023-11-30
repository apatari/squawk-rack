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

![Config lines](https://github.com/apatari/squawk-rack/assets/108021977/0ee909b7-a2af-484e-ae00-d80e7b63a902)

Uncomment the commented line that specifies 'sqlite:///app.db' as the database and comment out the one that looks in the OS environment for it.  This will allow you to work with a local db rather than wherever you choose to host your Postgresql db in the event that you deploy.

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
You should see a working version of Squawk Rack running on your machine!

## Usage

![Squawk](https://github.com/apatari/squawk-rack/assets/108021977/e9f66eb2-2aec-4594-99f5-18096d297265)

Start by creating a username and password.  From there you can browse the catalog of existing workouts, create your own, then favorite and review whichever workouts you choose.  All of these actions are persisted in the database.  If things ever get too messy in the database you can always re-seed to start again.  Note that this will erase all user data including usernames and passwords with the exception of the seeded users.

## Acknowledgment

This project was built with [Create React App](https://github.com/facebook/create-react-app) and [SQLAlchemy](https://www.sqlalchemy.org/) and uses [Bootstrap React](https://react-bootstrap.netlify.app/) and [Bootswatch](https://bootswatch.com/) for styling.  Deployed on [Render](https://render.com/).  Thank you to the folks who created and maintain those resources.
