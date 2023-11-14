#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Workout, Exercise

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting tables...")
        User.query.delete()
        Workout.query.delete()
        Exercise.query.delete()

        print("Adding users...")

        user1 = User(username="user1")
        user2 = User(username="user2")
        user3 = User(username="user3")
        user1.password_hash = "user1"
        user2.password_hash = "user2"
        user3.password_hash = "user3"

        w1 = Workout(user_id=1, name="Push Day", details="A mix of pressing angles geared toward hypertrophy")
        w2 = Workout(user_id=1, name="Posterior Chain", details="Deadlifts and accesory work.  Adding more text to see how double elipses look  Adding more text to see how double elipses look Adding more text to see how double elipses look")
        w3 = Workout(user_id=1, name="Squat Fest", details="All the squats")
        w4 = Workout(user_id=2, name="Weight Sled and Farmer Carry", details="Impress the neighbors. Also checking to see how much text is too much here. Also checking to see how much text is too much here. Also checking to see how much text is too much here. Also checking to see how much text is too much here. Also checking to see how much text is too much here. Also checking to see how much text is too much here.")
        w5 = Workout(user_id=2, name="Pull Day", details="A Back day focused on strength and work capacity. Superset the second and third sets.")
        

        e1 = Exercise(name="Bench Press", sets=3, reps=10, order_number=1, workout_id=1)
        e2 = Exercise(name="Dips", sets=3, reps=12, order_number=2, workout_id=1)
        e3 = Exercise(name="Deadlifts", sets=3, reps=5, order_number=1, workout_id=2)
        e4 = Exercise(name="RDL", sets=3, reps=8, order_number=2, workout_id=2)
        e5 = Exercise(name="Lunges", sets=3, reps=12, order_number=3, workout_id=2)
        e6 = Exercise(name="Good Mornings", sets=3, reps=10, order_number=4, workout_id=2)
        e7 = Exercise(name="Box Jumps", sets=3, reps=10, order_number=5, workout_id=2)

        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)

        db.session.add(w1)
        db.session.add(w2)
        db.session.add(w3)
        db.session.add(w4)
        db.session.add(w5)

        db.session.add(e1)
        db.session.add(e2)
        db.session.add(e3)
        db.session.add(e4)
        db.session.add(e5)
        db.session.add(e6)
        db.session.add(e7)

        db.session.commit()
