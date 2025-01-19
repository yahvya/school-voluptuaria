import 'package:flutter/material.dart';
import 'package:voluptuaria_front/components/application-navbar.dart';
import 'package:voluptuaria_front/components/button.dart';
import 'package:voluptuaria_front/components/comment.dart';
import 'package:voluptuaria_front/components/custom_text_field.dart';
import 'package:voluptuaria_front/components/rating.dart';
import 'package:voluptuaria_front/components/weather_info.dart';
import 'package:voluptuaria_front/components/write_comment.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';
import 'package:voluptuaria_front/components/search_bar.dart';
import 'package:voluptuaria_front/components/gallery.dart';
import 'package:voluptuaria_front/components/blur_background.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';
import 'package:voluptuaria_front/components/write_comment.dart';

class PlaceDetailsPage extends StatelessWidget {
  const PlaceDetailsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Padding(
          padding: const EdgeInsets.all(8.0),
          child: CustomSearchBar(),
        ),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 32.0),
              child: Gallery(
                imagePaths: const [
                  'lib/resources/images/place1.jpg',
                  'lib/resources/images/place2.jpg',
                  'lib/resources/images/place3.jpg',
                ],
                onPhotoTap: (imagePath) {
                  print('Tapped on $imagePath');
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(32.0),
              child: BlurBackground(
                width: 400.0,
                height: 150.0,
                blurIntensity: 0.0,
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Musée du louvre',
                                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold')
                            ),
                            IconButton(
                              icon: const Icon(Icons.favorite_border),
                              onPressed: () {
                                print('Favorite button pressed');
                              },
                            ),
                          ],
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text('18 rue de test, Paris France',
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w400, fontFamily: 'OpenSans-SemiBold')
                          ),
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text('Ouvert',
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w400, fontFamily: 'OpenSans-SemiBold', color: specialColor)
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(32.0),
              child: CustomButton(text: "M'y rendre", onPressed: () {
                print('Favorite button pressed');
              },)
            ),
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: BlurBackground(
                width: 400.0,
                height: 150.0,
                blurIntensity: 0.0,
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Column(
                    children: [
                      Padding(
                        padding: EdgeInsets.all(16.0),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            'Tarifs',
                            style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold'),
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            'Lundi - Vendredi 10€',
                            style: TextStyle(fontSize: 20, fontWeight: FontWeight.normal, fontFamily: 'OpenSans-SemiBold'),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Prévisions méteo',
                  style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold'),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(8.0),
              child: WeatherInfo(
                  dayOfWeek: 'Lundi',
                  temperature: '17 °C',
                  pressure: 567,
                  inf: 10,
                  inf2: 10,
                  weatherIcon: Icons.air)
            ),
            Padding(
                padding: EdgeInsets.all(8.0),
                child: WeatherInfo(
                    dayOfWeek: 'Mardi',
                    temperature: '17 °C',
                    pressure: 567,
                    inf: 10,
                    inf2: 10,
                    weatherIcon: Icons.air)
            ),
            Padding(
                padding: EdgeInsets.all(8.0),
                child: WeatherInfo(
                    dayOfWeek: 'Mercredi',
                    temperature: '17 °C',
                    pressure: 567,
                    inf: 10,
                    inf2: 10,
                    weatherIcon: Icons.air)
            ),
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Commentaires des utilisateurs',
                  style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500, fontFamily: 'OpenSans-SemiBold'),
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Comment(
                    profileImagePath: 'lib/resources/images/profileImage.jpg',
                    profileName: 'Svel',
                    commentText: "L'endroit est vraiment nul",
                    rating: Rating(
                      isStatic: true,
                      staticRating: 1,
                    )
                )
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: Align(
                  alignment: Alignment.centerLeft,
                  child: Comment(
                      profileImagePath: 'lib/resources/images/profileImage1.jpg',
                      profileName: 'Vaprez',
                      commentText: "L'endroit est vraiment bien",
                      rating: Rating(
                        isStatic: true,
                        staticRating: 4,
                      )
                  )
              ),
            ),
            Padding(
              padding: EdgeInsets.all(16.0),
              child: WriteComment(
                onSubmit: (comment, rating) {
                  print("Comment: $comment, Rating: $rating");
                },
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ApplicationNavbar(),
      ),
    );
  }
}