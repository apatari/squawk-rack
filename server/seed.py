#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Workout, Exercise, Favorite, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting tables...")
        User.query.delete()
        Workout.query.delete()
        Exercise.query.delete()
        Favorite.query.delete()
        Review.query.delete()

        print("Adding users...")

        user1 = User(username="user1")
        user2 = User(username="user2")
        user3 = User(username="user3")
        user1.password_hash = "user1"
        user2.password_hash = "user2"
        user3.password_hash = "user3"

        w1 = Workout(user_id=1, name="Push Day", details="A mix of pressing angles geared toward hypertrophy. Suggested rest time between bench sets is two and a half minutes, with a minute and a half for the others.  If you have shoulder mobility issues, skullcrushers can be substituted for dips, and incline bench press and lateral raises take the place of overhead press.")
        w2 = Workout(user_id=1, name="Posterior Chain", details="Deadlifts and accesory work.  Consider performing the accesory work in two compound sets of RDL/lunges and then good mornnings/box jumps.  Can be performed as the DL day of a 5-3-1 program.")
        w3 = Workout(user_id=1, name="Squat Fest", details="All the squats")
        w4 = Workout(user_id=2, name="Weight Sled and Farmer Carry", details="Impress the neighbors. Also checking to see how much text is too much here. Also checking to see how much text is too much here. Also checking to see how much text is too much here. Also checking to see how much text is too much here. Also checking to see how much text is too much here. Also checking to see how much text is too much here.")
        w5 = Workout(user_id=2, name="Pull Day", details="A Back day focused on strength and work capacity. Superset the second and third sets.")
        

        
        e9 = Exercise(name="Cable Fly", sets=3, reps=12, order_number=4, workout_id=1)
        e8 = Exercise(name="Overhead Press", sets=3, reps=10, order_number=2, workout_id=1)
        e1 = Exercise(name="Bench Press", sets=3, reps=10, order_number=1, workout_id=1)
        e2 = Exercise(name="Dips", sets=3, reps=12, order_number=3, workout_id=1)
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

        db.session.add(e9)
        db.session.add(e8)
        db.session.add(e1)
        db.session.add(e2)
        db.session.add(e3)
        db.session.add(e4)
        db.session.add(e5)
        db.session.add(e6)
        db.session.add(e7)

        db.session.commit()

        f1 = Favorite(user_id=1, workout_id=2)
        f2 = Favorite(user_id=1, workout_id=4)
        f3 = Favorite(user_id=1, workout_id=5)
        f4 = Favorite(user_id=2, workout_id=1)
        f5 = Favorite(user_id=2, workout_id=2)

        db.session.add(f1)
        db.session.add(f2)
        db.session.add(f3)
        db.session.add(f4)
        db.session.add(f5)

        db.session.commit()

        revs = [
            Review(user_id=1, workout_id=1, rating=5, comment="Wow, great workout!"),
            Review(user_id=1, workout_id=2, rating=4, comment="Pretty decent"),
            Review(user_id=2, workout_id=1, rating=3, comment="About 400 chars: I have a lot to say about this workout. I have a lot to say about this workout. I have a lot to say about this workout. I have a lot to say about this workout. I have a lot to say about this workout. I have a lot to say about this workout. I have a lot to say about this workout. I have a lot to say about this workout. I have a lot to say about this workout. I have a lot to say about this workout. "),
            Review(user_id=3, workout_id=1, rating=5, comment="I agree with the first reviewer!"),
            Review(user_id=2, workout_id=2, rating=1, comment="Absolute trash"),
    
        ]
        for review in revs:
            db.session.add(review)
        db.session.commit()
