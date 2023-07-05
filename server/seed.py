#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime

# Remote library imports

# Local imports
from app import app
from models import db


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

from config import db
from models import User, Event

def seed_data():
    users = [
        {
            "id": 1,
            "username": "kitchenboys",
            "email": "kitchenboys@gmail.com",
            "birthday": "03/28/95",
            "first_name": "Simon",
            "last_name": "Melekhov",
            "location": "New York City",
            "gender": "He/Him",
            "art_form": "Musician",
            "avatar": "https://imgur.com/8Ubpgfh.jpg"
        },
        {
            "id": 2,
            "username": "montanajanel",
            "email": "montanajanel@gmail.com",
            "birthday": "08/10/98",
            "first_name": "Montana",
            "last_name": "Janel",
            "location": "New York City",
            "gender": "She/Her",
            "art_form": "Singer",
            "avatar": "https://imgur.com/DKVB3gv.jpg"
        },

           {
            "id": 3,
            "username": "sleepypharaoh",
            "email": "sleepypharaoah@gmail.com",
            "birthday": "09/18/95",
            "first_name": "Harrison",
            "last_name": "Quamily",
            "location": "New York City",
            "gender": "He/Him",
            "art_form": "Producer",
            "avatar": "https://imgur.com/Y3031kF.jpg"
        },

        {
            "id": 4,
            "username": "orson",
            "email": "orson@gmail.com",
            "birthday": "04/01/92",
            "first_name": "Orson",
            "last_name": "The DJ",
            "location": "New York City",
            "gender": "He/Him",
            "art_form": "DJ",
            "avatar": "https://imgur.com/wXzRoFI.jpg"
        },

        {
            "id": 5,
            "username": "jonryanisdead",
            "email": "jonryan@gmail.com",
            "birthday": "10/10/90",
            "first_name": "Jon",
            "last_name": "Sugimoto",
            "location": "New York City",
            "gender": "He/Him",
            "art_form": "Filmmaker",
            "avatar": "https://imgur.com/Xp1H6vc.jpg"
        },

        {
            "id": 6,
            "username": "savannahsnow",
            "email": "savannahsnow@gmail.com",
            "birthday": "02/12/95",
            "first_name": "Savannah",
            "last_name": "Snow",
            "location": "New York City",
            "gender": "She/Her",
            "art_form": "Comedian",
            "avatar": "https://imgur.com/HoKHd8h.jpg"
        },

        {
            "id": 7,
            "username": "jinxley",
            "email": "jolieschae@gmail.com",
            "birthday": "07/14/97",
            "first_name": "Jolie",
            "last_name": "Gielchinsky",
            "location": "New York City",
            "gender": "She/Her",
            "art_form": "Visual Artist",
            "avatar": "https://i.imgur.com/LQUXD1H.png"
        },

        {
            "id": 8,
            "username": "riri",
            "email": "sarina@gmail.com",
            "birthday": "06/03/98",
            "first_name": "Sarina",
            "last_name": "",
            "location": "New York City",
            "gender": "She/Her",
            "art_form": "Fashion Designer",
            "avatar": "https://imgur.com/p8ELSHG.jpg"
        },

        {
            "id": 9,
            "username": "teesndsneaks",
            "email": "deandre@gmail.com",
            "birthday": "09/19/95",
            "first_name": "DeAndre",
            "last_name": "Mitchells",
            "location": "New York City",
            "gender": "He/Him",
            "art_form": "Photographer",
            "avatar": "https://imgur.com/SXXLy1A.jpg"
        },

        {
            "id": 10,
            "username": "zummy",
            "email": "zummy@gmail.com",
            "birthday": "04/05/96",
            "first_name": "Adam",
            "last_name": "Mohammed",
            "location": "New York City",
            "gender": "He/Him",
            "art_form": "Dancer",
            "avatar": "https://imgur.com/i59ejqT.jpg"
        }
    ]

    for user_data in users:
        user = User(
            id=user_data["id"],
            username=user_data["username"],
            email=user_data["email"],
            birthday=datetime.strptime(user_data["birthday"], "%m/%d/%y"),
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            location=user_data["location"],
            gender=user_data["gender"],
            art_form=user_data["art_form"],
            avatar=user_data["avatar"]
        )
        db.session.add(user)

    events = [
        {
            "age": "21+",
            "artform": "Music Group",
            "artist": "Kitchen Boys",
            "calendar": {
                "date": "05/05/2023",
                "day": "Friday",
                "time": "10:00 PM EST"
            },
            "category": "Music",
            "collaborators": [
                "prodclink",
                "typevlad"
            ],
            "description": "Yerrrrr! Get ready to party with the Kitchen Boys...",
            "id": 1,
            "location": {
                "city": "New York City",
                "neighborhood": "Lower East Side",
                "state": "New York",
                "street": "152 Ludlow Street",
                "street 2": "",
                "zip": 10002
            },
            "price": "Free",
            "share": "share-link.com",
            "subcategory": "Groups",
            "tags": [
                "meme rap",
                "rap",
                "hip-hop",
                "party"
            ],
            "thumbnail": "https://imgur.com/8Ubpgfh.jpg",
            "title": "Kitchen Boys Live at Kind Regards",
            "user": "kitchenboys",
            "venue": "Kind Regards"
        },
        {
            "age": "18+",
            "artform": "Producer",
            "artist": "Sleepy Pharaoh",
            "calendar": {
                "date": "05/06/2023",
                "day": "Saturday",
                "time": "9:00 PM EST"
            },
            "category": "Music",
            "description": "The Ultimate MC & Producer Tournament! Pull up for some friendly competition...",
            "id": 2,
            "location": {
                "city": "Brooklyn",
                "neighborhood": "Bushwick",
                "state": "New York",
                "street": "1114 Dekalb Ave",
                "street 2": "",
                "zip": 11221
            },
            "price": "Free",
            "share": "share-link.com",
            "subcategory": "producers",
            "tags": [
                "rap",
                "hip-hop",
                "beats",
                "producers",
                "competitions"
            ],
            "thumbnail": "https://imgur.com/Y3031kF.jpg",
            "tickets": "ticket-link.com",
            "title": "MC and Producer Tournament",
            "user": "sleepypharaoh",
            "venue": "Secret Pour"
        },
        {
            "age": "21+",
            "artform": "Singer",
            "artist": "Montana Janel",
            "calendar": {
                "date": "04/28/2023",
                "day": "Friday",
                "time": "10:00 PM EST"
            },
            "category": "Music",
            "description": "Hello, lovelies! Your fairy songstress, Montana, here!...",
            "id": 3,
            "location": {
                "city": "Brooklyn",
                "neighborhood": "Greenpoint",
                "state": "New York",
                "street": "632 Manhattan Ave",
                "street 2": "",
                "zip": "11222"
            },
            "price": "$10",
            "share": "share-link.com",
            "subcategory": "Singers",
            "tags": [
                "pop",
                "dance",
                "party"
            ],
            "thumbnail": "https://imgur.com/DKVB3gv.jpg",
            "tickets": "ticket-link.com",
            "title": "Lucky Cat Record Club 1yr Anniversary Party",
            "user": "montanajanel",
            "venue": "Ponyboy"
        },
        {
            "age": "21+",
            "artform": "DJ",
            "artist": "Orson",
            "calendar": {
                "date": "04/29/2023",
                "day": "Saturday",
                "time": "10:00 PM EST"
            },
            "category": "Music",
            "collaborators": [
                "rogersanchez",
                "loveclub"
            ],
            "description": "Martinis shaken, not stirred. Disco beats by yours truly...",
            "id": 4,
            "location": {
                "city": "New York City",
                "neighborhood": "Lower East Side",
                "state": "New York",
                "street": "215 Chrystie Street",
                "street 2": "",
                "zip": 10002
            },
            "price": "$15",
            "share": "share-link.com",
            "subcategory": "DJ",
            "tags": [
                "nightlife",
                "party",
                "pop",
                "disco",
                "techno"
            ],
            "thumbnail": "https://imgur.com/wXzRoFI.jpg",
            "tickets": "ticket-link.com",
            "title": "#ARTSPACE Launch Party",
            "user": "orson",
            "venue": "PUBLIC Hotel"
        },
        {
            "age": "All Ages",
            "artform": "Director",
            "artist": "Jon Ryan Sugimoto",
            "calendar": {
                "date": "04/28/2023",
                "day": "Thursday",
                "time": "7:00 PM EST"
            },
            "category": "Film",
            "collaborators": [
                "Andrew Lutheran",
                "Iddo Goldberg",
                "Ellen Burke",
                "Brenna Webb",
                "Jolie Gielchinsky"
            ],
            "description": "All my New York City people, come check out the screening of my latest short film...",
            "id": 5,
            "images": [
                "https://imgur.com/1k3goHE.jpg",
                "https://imgur.com/KjBcOmF.jpg",
                "https://imgur.com/RBbvES9.jpg"
            ],
            "location": {
                "city": "New York City",
                "neighborhood": "Lower East Side",
                "state": "New York",
                "street": "167 Orchard Street",
                "street 2": "",
                "zip": 10002
            },
            "price": "Free",
            "share": "share-link.com",
            "subcategory": "Screening",
            "tags": [
                "short film",
                "drama"
            ],
            "thumbnail": "https://imgur.com/Xp1H6vc.jpg",
            "tickets": "ticket-link.com",
            "title": "Full Time, Pre-Film Fest Screening",
            "user": "jonryanisdead",
            "venue": "The Slipper Room"
        },
        {
            "age": "18+",
            "artform": "Comedian",
            "artist": "Savannah Snow",
            "calendar": {
                "date": "04/26/2023",
                "day": "Wednesday",
                "time": "8:30 PM EST"
            },
            "category": "Comedy",
            "description": "PULL UP on me and this ~talented~ troupe of dumbass comedians...",
            "id": 6,
            "location": {
                "city": "Brooklyn",
                "neighborhood": "East Williamsburg",
                "state": "New York",
                "street": "167 Graham Ave",
                "street 2": "",
                "zip": 11206
            },
            "price": "$10",
            "share": "share-link.com",
            "subcategory": "shows",
            "tags": [
                "comedy",
                "women in comedy",
                "improv"
            ],
            "thumbnail": "https://imgur.com/HoKHd8h.jpg",
            "tickets": "ticket-link.com",
            "title": "Pump Up: The..."
        },
        {
            "age": "21+",
            "artform": "Fashion Designer",
            "artist": "Sarina",
            "calendar": {
                "date": "05/06/2023",
                "day": "Saturday",
                "time": "8:00 PM EST"
            },
            "category": "Fashion & Textiles",
            "collaborators": [
                "Mellow Domino",
                "Remi",
                "Krysten Java",
                "Mars Bars"
            ],
            "description": "If I don't see you here tomorrow, you don't love me! Remi and I are emptying our closet! Designer, vintage,absolutely SICK finds on the racks! We'll be featuing other amazing WOMEN vendors, tattoos, drinks, and more! Live performances by DJs and Mellow Domingo! Come support your girlies!",
            "id": 8,
            "location": {
                "city": "Brooklyn",
                "neighborhood": "East Williamsburg",
                "state": "New York",
                "street": "17 Meadow Street",
                "street 2": "",
                "zip": 11206
            },
            "price": "$15",
            "share": "share-link.com",
            "subcategory": "Women's Clothing",
            "tags": [
                "womens fashion",
                "thrifting",
                "vintage"
            ],
            "thumbnail": "https://imgur.com/p8ELSHG.jpg",
            "tickets": "ticket-link.com",
            "title": "Rem&Ri's Femme Fatale Pop-Up",
            "user": "sariri",
            "venue": "The Meadows"
            },
            {
            "age": "All Ages",
            "artform": "Photographer",
            "artist": "DeAndre Mitchells",
            "calendar": {
                "date": "05/23/2023",
                "day": "Tuesday",
                "time": "2:00 PM EST"
            },
            "category": "Photography",
            "description": "My first solo show is here! Come see photos by myself + an immersive sensory experience. Drinks, music and vibes available. I'm so excited for you guys to see what I've been working on. Save the date and slide thru!",
            "id": 9,
            "location": {
                "city": "Brooklyn",
                "neighborhood": "Red Hook",
                "state": "New York",
                "street": "95 Verona Street",
                "street 2": "",
                "zip": 11231
            },
            "price": "Free",
            "share": "share-link.com",
            "subcategory": "Gallery",
            "tags": [
                "photography",
                "black & white",
                "mixed media",
                "gallery"
            ],
            "thumbnail": "https://imgur.com/SXXLy1A.jpg",
            "title": "MADE WELL Gallery",
            "user": "teesndsneaks",
            "venue": "Mat Blak"
            },
            {
            "age": "All Ages",
            "artform": "Dancer",
            "artist": "Zummy Mohammed",
            "calendar": {
                "date": "04/27/2023",
                "day": "Thursday",
                "time": "7:00 PM EST"
            },
            "category": "Performing Arts",
            "description": "Hey y'all! It's been WEEKS of working our butts off, and it's all about to pay off. I'm so excited to invite all my friends, family, and followers out to the production of Cinderella's opening weekend, which is kicking off this Thursday night. pullUP!",
            "id": 10,
            "location": {
                "city": "New York City",
                "neighborhood": "Time's Square",
                "state": "New York",
                "street": "214 W 42nd Street",
                "street 2": "",
            "zip": 110036
            },
            "price": "$82+",
            "share": "share-link.com",
            "subcategory": "Theater",
            "tags": [
                "musical",
                "singing",
                "dancing",
                "acting",
                "broadway"
            ],
            "thumbnail": "https://imgur.com/i59ejqT.jpg",
            "tickets": "ticket-link.com",
            "title": "Cinderella: The Musical",
            "user": "thezummymohammed",
            "venue": "New Amsterdam Theater"
            }
        ]

    for event_data in events:
        event = Event(
            host_id=event_data["host_id"],
            title=event_data["title"],
            thumbnail=event_data["thumbnail"],
            category=event_data["category"],
            subcategory=event_data["subcategory"],
            description=event_data["description"],
            venue=event_data.get("venue"),
            city=event_data["location"]["city"],
            state=event_data["location"]["state"],
            zip=event_data["location"]["zip"],
            address=event_data["location"].get("street"),
            date=datetime.strptime(event_data["calendar"]["date"], "%m/%d/%Y"),
            start_time=datetime.strptime(event_data["calendar"]["time"], "%I:%M %p").time(),
            end_time=datetime.strptime(event_data["calendar"]["time"], "%I:%M %p").time(),
            age_restrictions=event_data.get("age"),
            tickets=event_data.get("tickets"),
            is_active=datetime.now() < datetime.strptime(event_data["calendar"]["date"], "%m/%d/%Y")
        )

        if "collaborators" in event_data:
            event.collaborators = event_data["collaborators"]
        if "tags" in event_data:
            event.tags = event_data["tags"]
            
            db.session.add(event)
        
        db.session.commit()

