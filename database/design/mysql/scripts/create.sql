CREATE TABLE app_users(
   id VARCHAR(36) ,
   email VARCHAR(100)  NOT NULL,
   password VARCHAR(100)  NOT NULL,
   user_name VARCHAR(20)  NOT NULL,
   user_firstname VARCHAR(20)  NOT NULL,
   birthdate DATE,
   phonenumber VARCHAR(25) ,
   profile_picture VARCHAR(50) ,
   created_at DATETIME NOT NULL,
   gender TINYINT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(email)
);

CREATE TABLE places(
   id VARCHAR(36) ,
   location_getter JSON NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE social_profile(
   id VARCHAR(36) ,
   crated_at DATETIME NOT NULL,
   user_id VARCHAR(36)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES app_users(id)
);

CREATE TABLE travel_routes(
   id VARCHAR(36) ,
   route_name VARCHAR(50)  NOT NULL,
   start_date DATE NOT NULL,
   end_date DATE NOT NULL,
   budget DECIMAL(15,2)   NOT NULL,
   proposals JSON NOT NULL,
   user_id VARCHAR(36)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES app_users(id)
);

CREATE TABLE categories(
   id VARCHAR(36) ,
   category_name VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(category_name)
);

CREATE TABLE places_comments(
   user_id VARCHAR(36) ,
   place_id VARCHAR(36) ,
   commented_at DATETIME NOT NULL,
   PRIMARY KEY(user_id, place_id),
   FOREIGN KEY(user_id) REFERENCES app_users(id),
   FOREIGN KEY(place_id) REFERENCES places(id)
);

CREATE TABLE visited_places(
   user_id VARCHAR(36) ,
   place_id VARCHAR(36) ,
   PRIMARY KEY(user_id, place_id),
   FOREIGN KEY(user_id) REFERENCES app_users(id),
   FOREIGN KEY(place_id) REFERENCES places(id)
);

CREATE TABLE wish_lists(
   user_id VARCHAR(36) ,
   place_id VARCHAR(36) ,
   PRIMARY KEY(user_id, place_id),
   FOREIGN KEY(user_id) REFERENCES app_users(id),
   FOREIGN KEY(place_id) REFERENCES places(id)
);

CREATE TABLE liked_categories(
   social_profile_id VARCHAR(36) ,
   place_category_id VARCHAR(36) ,
   search_frequency INT NOT NULL,
   PRIMARY KEY(social_profile_id, place_category_id),
   FOREIGN KEY(social_profile_id) REFERENCES social_profile(id),
   FOREIGN KEY(place_category_id) REFERENCES categories(id)
);

CREATE TABLE potential_unliked_categories(
   social_profile_id VARCHAR(36) ,
   place_category_id VARCHAR(36) ,
   dislike_count INT NOT NULL,
   PRIMARY KEY(social_profile_id, place_category_id),
   FOREIGN KEY(social_profile_id) REFERENCES social_profile(id),
   FOREIGN KEY(place_category_id) REFERENCES categories(id)
);

CREATE TABLE place_categories(
   registered_place_id VARCHAR(36) ,
   place_category_id VARCHAR(36) ,
   PRIMARY KEY(registered_place_id, place_category_id),
   FOREIGN KEY(registered_place_id) REFERENCES places(id),
   FOREIGN KEY(place_category_id) REFERENCES categories(id)
);
