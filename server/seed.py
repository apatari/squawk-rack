#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting tables...")
        User.query.delete()

        print("Adding users...")

        user1 = User(username="user1")
        user2 = User(username="user2")
        user3 = User(username="user3")
        user1.password_hash = "user1"
        user2.password_hash = "user2"
        user3.password_hash = "user3"

        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)

        db.session.commit()
