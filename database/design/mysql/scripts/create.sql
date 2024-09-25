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
   PRIMARY KEY(id)
);

CREATE TABLE places(
   id VARCHAR(36) ,
   location_getter JSON NOT NULL,
   categories JSON NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE Social_profile(
   id VARCHAR(50) ,
   crated_at DATETIME NOT NULL,
   liked_categories JSON NOT NULL,
   unliked_categories JSON NOT NULL,
   searched_categories JSON NOT NULL,
   user_id VARCHAR(36)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES app_users(id)
);

CREATE TABLE travel_routes(
   id INT AUTO_INCREMENT,
   route_name VARCHAR(50)  NOT NULL,
   start_date DATE NOT NULL,
   end_date DATE NOT NULL,
   budget DECIMAL(15,2)   NOT NULL,
   proposals JSON NOT NULL,
   user_id VARCHAR(36)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES app_users(id)
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
