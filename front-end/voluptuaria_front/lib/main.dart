import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:voluptuaria_front/resources/themes/colors.dart';
import 'components/button.dart';
import 'components/search_bar.dart';
import 'components/weather_info.dart';
import 'components/review.dart';
import 'components/blur_background.dart';
import 'components/navigation_bar.dart';
import 'components/gallery.dart';
import 'components/icon_button.dart';
import 'components/category_gallery.dart';
import 'components/custom_text_field.dart';
import 'components/profile_picture.dart';
import 'components/select_box.dart';
import 'components/path_card.dart';
import 'components/lottie_animation.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  int _selectedIndex = 2; // Par défaut, la page d'accueil est sélectionnée
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Test',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Test'),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: CustomSearchBar(),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: CustomTextField(
                    placeholder: 'email@gmail.com'
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: SelectBox(
                    placeholder: 'Parcours en cours',
                    items: ['Parcours 1', 'Parcours 2', 'Parcours 3'],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: WeatherInfo(
                  dayOfWeek: 'Lundi',
                  temperature: '17°C',
                  pressure: 567,
                  inf: 10,
                  inf2: 10,
                  weatherIcon: FontAwesomeIcons.wind,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Review(
                  profileName: 'svel',
                  profileImage: const AssetImage('lib/resources/images/profileImage.jpg'),
                  commentText: "L'endroit est vraiment bien",
                  rating: 1,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: CustomButton(
                  text: 'Click me please',
                  onPressed: () {
                    print('Button pressed');
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Gallery(
                  imagePaths: [
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
                padding: const EdgeInsets.all(16.0),
                child: CustomIconButton(
                  icon: Icons.bookmark_border,
                  backgroundColor: upperBackgroundColor,
                  onPressed: () {
                    print('Icon button pressed');
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: CategoryGallery(
                  items: [
                    CategoryItem(imagePath: 'lib/resources/images/restaurant.jpg', categoryName: 'Restaurants'),
                    CategoryItem(imagePath: 'lib/resources/images/hotel.jpeg', categoryName: 'Hotels'),
                    CategoryItem(imagePath: 'lib/resources/images/shop.jpg', categoryName: 'Shop'),
                    CategoryItem(imagePath: 'lib/resources/images/museum.jpg', categoryName: 'Musée'),
                  ],
                  onImageTap: (category) {
                    print('Tapped on $category');
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: BlurBackground(
                  height: 300,
                  child: Center(
                    child: ProfilePicture(
                      imagePath: 'lib/resources/images/profileImage.jpg',
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: PathCard(
                    title: 'Parcours',
                    startDate: '17/10/24',
                    endDate: '27/10/24',
                    buttonWidget: CustomButton(
                        width: 120,
                        height: 40,
                        fontSize: 16,
                        text: 'Détails',
                        onPressed: () {
                          print('button pressed');
                        },
                    )
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: LottieAnimation(
                  lottiePath: 'lib/resources/animations/travel.json',
                  width: 200,
                  height: 200,
                ),
              ),
            ],
          ),
        ),
        bottomNavigationBar: Padding(
          padding: const EdgeInsets.all(16.0),
          child: CustomNavigationBar(
            backgroundColor: upperBorderColor,
            borderRadius: 30.0,
            icons: [
              Icons.search,
              Icons.bookmark_border,
              Icons.home_outlined,
              Icons.place_outlined,
              Icons.person_outline,
            ],
            onIconTap: (index) {
              print('Icon $index tapped');
              _selectedIndex = index;
            },
            currentIndex: _selectedIndex, // Fournir le paramètre requis
          ),
        ),
      ),
    );
  }
}
